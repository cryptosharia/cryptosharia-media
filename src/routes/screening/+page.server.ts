import { getTokens } from '$lib/api';
import { compareTokensByPopularity } from '$lib/token-ranking';
import { error } from '@sveltejs/kit';
import type { ShariaStatus, Token } from '$types/api';
import type { PageServerLoad } from './$types';

const VALID_STATUSES = new Set<ShariaStatus>(['halal', 'haram', 'syubhat']);
const MARKET_MAP_CACHE_MS = 60_000;
const MARKET_CANDIDATE_LIMIT = 100;

type MarketItem = Pick<Token, 'slug' | 'name' | 'ticker' | 'shariaStatus'> & {
    rank: number;
    marketCapUsd: number;
    priceUsd: number;
    percentChange24h: number;
    logoUrl: string | null;
};
type MarketDatasets = { marketMap: MarketItem[]; trendingTokens: MarketItem[] };

let marketMapCache: { expiresAt: number; data: MarketDatasets } | undefined;
let marketMapRequest: Promise<MarketDatasets> | undefined;

async function loadMarketData(): Promise<MarketDatasets> {
    const cached = marketMapCache;
    if (cached && cached.expiresAt > Date.now()) return cached.data;
    if (marketMapRequest) return marketMapRequest;

    marketMapRequest = (async () => {
        try {
            const firstPage = await getTokens({ statuses: ['published'], page: 1, limit: MARKET_CANDIDATE_LIMIT, quote: true });
            if (firstPage.error || !firstPage.data) throw new Error(firstPage.error?.message ?? 'Token listing returned no data');

            const { pagination } = firstPage.data.data;
            const remainingPages = pagination.totalPages > 1
                ? await Promise.all(Array.from({ length: pagination.totalPages - 1 }, (_, index) =>
                    getTokens({ statuses: ['published'], page: index + 2, limit: MARKET_CANDIDATE_LIMIT, quote: true })
                ))
                : [];
            const failedPage = remainingPages.find((page) => page.error || !page.data);
            if (failedPage) {
                throw new Error(failedPage.error?.message ?? 'A market map page returned no data');
            }

            const tokens = [
                ...firstPage.data.data.items,
                ...remainingPages.flatMap((page) => page.data?.data.items ?? [])
            ];
            const marketMap = tokens.flatMap((token): MarketItem[] => {
                const quote = token.quote;
                if (!token.slug || !VALID_STATUSES.has(token.shariaStatus)) return [];
                if (!quote || !Number.isFinite(quote.marketCapUsd) || quote.marketCapUsd <= 0) return [];
                return [{
                    slug: token.slug,
                    name: token.name,
                    ticker: token.ticker,
                    shariaStatus: token.shariaStatus,
                    rank: quote.rank,
                    marketCapUsd: quote.marketCapUsd,
                    priceUsd: quote.priceUsd,
                    percentChange24h: quote.percentChange24h,
                    logoUrl: token.logo?.url ?? null
                }];
            });
            // CryptoSharia has no trending endpoint; use quoted 24h market movement, then rank and market cap as stable tie-breakers.
            const trendingTokens = [...marketMap]
                .filter((item) => Number.isFinite(item.percentChange24h))
                .sort((a, b) => Math.abs(b.percentChange24h) - Math.abs(a.percentChange24h) || a.rank - b.rank || b.marketCapUsd - a.marketCapUsd)
                .slice(0, 10);
            const data = { marketMap, trendingTokens };
            marketMapCache = { data, expiresAt: Date.now() + MARKET_MAP_CACHE_MS };
            return data;
        } catch (cause) {
            console.error('[screening] Market map data unavailable:', cause);
            const data = { marketMap: [], trendingTokens: [] };
            marketMapCache = { data, expiresAt: Date.now() + MARKET_MAP_CACHE_MS };
            return data;
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
    const tokenParams = {
        statuses: ['published'] as ['published'],
        shariaStatuses: status ? [status] : undefined,
        search: search || undefined
    };
    const [marketData, result] = await Promise.all([
        loadMarketData(),
        getTokens({ ...tokenParams, page: sort === 'popular' ? page : 1, limit: sort === 'popular' ? limit : 100 })
    ]);

    if (result.error) throw error(503, result.error.message);

    let sortedTokens = [...(result.data?.data.items ?? [])].sort((a, b) => {
        if (sort === 'popular') return compareTokensByPopularity(a, b);
        if (sort === 'az') return a.name.localeCompare(b.name, 'id');
        const aDate = Date.parse(a.updatedAt ?? a.publishedAt ?? a.createdAt);
        const bDate = Date.parse(b.updatedAt ?? b.publishedAt ?? b.createdAt);
        return bDate - aDate;
    });
    let pagination = result.data?.data.pagination ?? { total: 0, page, limit, totalPages: 0 };
    if (sort !== 'popular' && result.data) {
        const firstPage = result.data.data;
        if (firstPage.pagination.totalPages > 1) {
            const pages = await Promise.all(Array.from({ length: firstPage.pagination.totalPages - 1 }, (_, index) =>
                getTokens({ ...tokenParams, page: index + 2, limit: 100 })
            ));
            for (const pageResult of pages) {
                if (pageResult.error || !pageResult.data) throw error(503, 'Daftar screening belum dapat dimuat. Silakan coba lagi nanti.');
                sortedTokens.push(...pageResult.data.data.items);
            }
            sortedTokens.sort((a, b) => sort === 'az'
                ? a.name.localeCompare(b.name, 'id')
                : Date.parse(b.updatedAt ?? b.publishedAt ?? b.createdAt) - Date.parse(a.updatedAt ?? a.publishedAt ?? a.createdAt));
        }
        const total = firstPage.pagination.total;
        pagination = { total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    if (page > 1 && (pagination.totalPages === 0 || page > pagination.totalPages)) {
        throw error(404, 'Halaman screening tidak ditemukan.');
    }

    setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' });

    const tokens = sort === 'popular' ? sortedTokens : sortedTokens.slice((page - 1) * limit, page * limit);
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
        marketMap: marketData.marketMap,
        trendingTokens: marketData.trendingTokens,
        error: null
    };
};
