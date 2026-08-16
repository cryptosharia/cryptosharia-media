import { getPosts, getTokenQuotes, getTokens } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
    const [newsResult, educationResult, tokenResult] = await Promise.all([
        getPosts({ sections: ['news'], statuses: ['published'], limit: 6, page: 1 }),
        getPosts({ sections: ['education'], statuses: ['published'], limit: 3, page: 1 }),
        getTokens({ statuses: ['published'], limit: 6, page: 1 })
    ]);

    const news = newsResult.data?.data.items ?? [];
    const snapshotToken = tokenResult.data?.data.items[0];
    const snapshotQuoteResult = snapshotToken ? await getTokenQuotes(snapshotToken.slug) : null;
    const snapshotQuote = snapshotQuoteResult?.data?.data.find((item) => item.slug === snapshotToken?.slug) ?? null;
    const hasUpstreamError = Boolean(newsResult.error || educationResult.error || tokenResult.error || snapshotQuoteResult?.error);
    setHeaders({
        'cache-control': hasUpstreamError
            ? 'no-store'
            : 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
    });

    return {
        news: [...news].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured)),
        education: educationResult.data?.data.items ?? [],
        tokens: tokenResult.data?.data.items ?? [],
        snapshotQuote,
        unavailable: {
            news: newsResult.error?.message ?? null,
            education: educationResult.error?.message ?? null,
            tokens: tokenResult.error?.message ?? null
        }
    };
};
