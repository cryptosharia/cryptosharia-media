import { error } from '@sveltejs/kit';
import { getPost } from '$lib/api';
import { renderMarkdown } from '$lib/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
    const result = await getPost(params.slug);
    const post = result.data?.data;
    if (!post) {
        throw error(result.response.status === 404 ? 404 : 503, result.error?.message || 'Aktivitas tidak ditemukan.');
    }
    if (post.status !== 'published' || post.section !== 'activity') {
        throw error(404, 'Aktivitas tidak ditemukan.');
    }
    setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=600, stale-while-revalidate=1200' });
    return { post: { ...post, content: '' }, html: renderMarkdown(post.content) };
};
