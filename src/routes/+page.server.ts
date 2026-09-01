import { getPosts, getTokens } from '$lib/api';
import { compareTokensByPopularity } from '$lib/token-ranking';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
    const [newsResult, educationResult, tokenResult] = await Promise.all([
        getPosts({ sections: ['news'], statuses: ['published'], limit: 6, page: 1 }),
        getPosts({ sections: ['education'], statuses: ['published'], limit: 3, page: 1 }),
        getTokens({ statuses: ['published'], limit: 100, page: 1, quote: true })
    ]);

    const news = newsResult.data?.data.items ?? [];
    const tokens = [...(tokenResult.data?.data.items ?? [])]
        .sort(compareTokensByPopularity)
        .slice(0, 8);
    const tokenQuotes = tokens.flatMap((token) => (token.quote ? [token.quote] : []));
    const hasUpstreamError = Boolean(newsResult.error || educationResult.error || tokenResult.error);
    setHeaders({
        'cache-control': hasUpstreamError
            ? 'no-store'
            : 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
    });

    return {
        news: [...news].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured)),
        education: educationResult.data?.data.items ?? [],
        tokens,
        tokenQuotes,
        unavailable: {
            news: newsResult.error?.message ?? null,
            education: educationResult.error?.message ?? null,
            tokens: tokenResult.error?.message ?? null
        }
    };
};
