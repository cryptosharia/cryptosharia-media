import { error } from '@sveltejs/kit';
import { getToken } from '$lib/api';
import { renderMarkdown } from '$lib/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
    let tokenResult = await getToken(params.slug, { quote: true });

    // Selective fallback: if quote request failed due to an upstream gateway/service issue (e.g. 502/503),
    // retry retrieving the token without quote to ensure Sharia screening content remains accessible.
    if (!tokenResult.data?.data && (tokenResult.response.status === 502 || tokenResult.response.status === 503)) {
        console.warn(`[screening/[slug]] Quote service failed for "${params.slug}" (status ${tokenResult.response.status}). Retrying without quote.`);
        tokenResult = await getToken(params.slug, { quote: false });
    }

    const token = tokenResult.data?.data;

    if (!token) {
        const status = tokenResult.response.status;
        if (status === 404) throw error(404, 'Data coin tidak ditemukan.');
        if (status === 401 || status === 403) throw error(status, tokenResult.error?.message || 'Akses ditolak.');
        throw error(503, tokenResult.error?.message || 'Data coin tidak dapat dimuat saat ini.');
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
