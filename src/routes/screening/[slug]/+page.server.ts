import { error } from '@sveltejs/kit';
import { getToken } from '$lib/api';
import { renderMarkdown } from '$lib/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
    const tokenResult = await getToken(params.slug, { quote: true });
    const token = tokenResult.data?.data;

    if (!token) {
        throw error(tokenResult.response.status === 404 ? 404 : 503, tokenResult.error?.message || 'Data coin tidak ditemukan.');
    }
    if (token.status !== 'published') {
        throw error(404, 'Data coin tidak ditemukan.');
    }

    setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' });

    return {
        token: { ...token, content: '' },
        quote: token.quote ?? null,
        html: renderMarkdown(token.content)
    };
};
