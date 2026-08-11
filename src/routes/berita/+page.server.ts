import { NEWS_CATEGORIES, EMPTY_PAGINATION } from '$lib/config';
import { getPosts } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
    const requestedCategory = url.searchParams.get('kategori') ?? '';
    const category = NEWS_CATEGORIES.find((item) => item.slug === requestedCategory) ?? null;
    const search = url.searchParams.get('q')?.trim() ?? '';
    const page = Math.max(1, Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1);
    const limit = 12;

    const result = await getPosts({
        sections: ['news'],
        statuses: ['published'],
        tags: category ? [category.slug] : undefined,
        search: search || undefined,
        page,
        limit
    });

    if (result.error) throw error(503, result.error.message);

    const pagination = result.data?.data.pagination ?? { ...EMPTY_PAGINATION, page, limit };
    if (page > 1 && (pagination.totalPages === 0 || page > pagination.totalPages)) {
        throw error(404, 'Halaman berita tidak ditemukan.');
    }

    setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' });

    return {
        posts: result.data?.data.items ?? [],
        pagination,
        category,
        search,
        error: null
    };
};
