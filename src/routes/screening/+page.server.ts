import { getTokenQuotes, getTokens } from '$lib/api';
import { compareTokensByPopularity } from '$lib/token-ranking';
import { error } from '@sveltejs/kit';
import type { ShariaStatus, Token, TokenQuote } from '$types/api';
import type { PageServerLoad } from './$types';

const VALID_STATUSES = new Set<ShariaStatus>(['halal', 'haram', 'syubhat']);
const MARKET_MAP_CACHE_MS = 60_000;

type MarketMapItem = Pick<Token, 'slug' | 'name' | 'ticker' | 'shariaStatus'> & {
    marketCapUsd: number;
    priceUsd: number;
    percentChange24h: number;
    logoUrl: string | null;
};

let marketMapCache: { expiresAt: number; items: MarketMapItem[] } | undefined;
let marketMapRequest: Promise<MarketMapItem[]> | undefined;

async function loadMarketMap(): Promise<MarketMapItem[]> {
    const cached = marketMapCache;
    if (cached && cached.expiresAt > Date.now()) return cached.items;
    if (marketMapRequest) return marketMapRequest;

    marketMapRequest = (async () => {
        try {
            const firstPage = await getTokens({ statuses: ['published'], page: 1, limit: 100 });
            if (firstPage.error || !firstPage.data) throw new Error(firstPage.error?.message ?? 'Token listing returned no data');

            const { items: firstItems, pagination } = firstPage.data.data;
            const pages = await Promise.all(Array.from({ length: Math.max(0, pagination.totalPages - 1) }, (_, index) =>
                getTokens({ statuses: ['published'], page: index + 2, limit: 100 })
            ));
            const tokens = [...firstItems];
            for (const page of pages) {
                if (page.error || !page.data) throw new Error(page.error?.message ?? 'Token page returned no data');
                tokens.push(...page.data.data.items);
            }

            const validTokens = tokens.filter((token) => token.slug && VALID_STATUSES.has(token.shariaStatus));
            if (!validTokens.length) {
                marketMapCache = { items: [], expiresAt: Date.now() + MARKET_MAP_CACHE_MS };
                return [];
            }

            const quoteResult = await getTokenQuotes(validTokens.map((token) => token.slug));
            if (quoteResult.error || !quoteResult.data) {
                console.error('[screening] Market map quotes unavailable:', quoteResult.error?.message ?? 'No quote data returned');
                marketMapCache = { items: [], expiresAt: Date.now() + MARKET_MAP_CACHE_MS };
                return [];
            }

            const quotes = new Map<string, TokenQuote>(quoteResult.data.data.map((quote) => [quote.slug, quote]));
            const items = validTokens.flatMap((token): MarketMapItem[] => {
                const quote = quotes.get(token.slug);
                if (!quote || !Number.isFinite(quote.marketCapUsd) || quote.marketCapUsd <= 0) return [];
                return [{
                    slug: token.slug,
                    name: token.name,
                    ticker: token.ticker,
                    shariaStatus: token.shariaStatus,
                    marketCapUsd: quote.marketCapUsd,
                    priceUsd: quote.priceUsd,
                    percentChange24h: quote.percentChange24h,
                    logoUrl: token.logo?.url ?? null
                }];
            });
            marketMapCache = { items, expiresAt: Date.now() + MARKET_MAP_CACHE_MS };
            return items;
        } catch (cause) {
            console.error('[screening] Market map data unavailable:', cause);
            marketMapCache = { items: [], expiresAt: Date.now() + MARKET_MAP_CACHE_MS };
            return [];
        } finally {
            marketMapRequest = undefined;
        }
    })();
    return marketMapRequest;
}

export const load: PageServerLoad = async ({ url, setHeaders }) => {
    const requestedStatus = url.searchParams.get('status');
    const status = requestedStatus && VALID_STATUSES.has(requestedStatus as ShariaStatus)
        ? (requestedStatus as ShariaStatus)
        : '';
    const search = url.searchParams.get('q')?.trim() ?? '';
    const requestedSort = url.searchParams.get('sort');
    const sort = requestedSort === 'az' || requestedSort === 'latest' ? requestedSort : 'popular';
    const page = Math.max(1, Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1);
    const limit = 24;

    const [result, marketMap] = await Promise.all([
        getTokens({
            statuses: ['published'],
            shariaStatuses: status ? [status] : undefined,
            search: search || undefined,
            page: 1,
            limit: 100,
            quote: true
        }),
        loadMarketMap()
    ]);

    if (result.error) throw error(503, result.error.message);

    const sortedTokens = [...(result.data?.data.items ?? [])].sort((a, b) => {
        if (sort === 'popular') return compareTokensByPopularity(a, b);
        if (sort === 'az') return a.name.localeCompare(b.name, 'id');
        const aDate = Date.parse(a.updatedAt ?? a.publishedAt ?? a.createdAt);
        const bDate = Date.parse(b.updatedAt ?? b.publishedAt ?? b.createdAt);
        return bDate - aDate;
    });
    const total = sortedTokens.length;
    const pagination = { total, page, limit, totalPages: Math.ceil(total / limit) };
    if (page > 1 && (pagination.totalPages === 0 || page > pagination.totalPages)) {
        throw error(404, 'Halaman screening tidak ditemukan.');
    }

    setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' });

    const tokens = sortedTokens.slice((page - 1) * limit, page * limit);
    const latestUpdatedAt = sortedTokens.reduce<string | null>((latest, token) => {
        const date = token.updatedAt ?? token.publishedAt ?? token.createdAt;
        return !latest || Date.parse(date) > Date.parse(latest) ? date : latest;
    }, null);

    return {
        tokens,
        pagination,
        status,
        search,
        sort,
        latestUpdatedAt,
        marketMap,
        error: null
    };
};
