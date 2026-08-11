import { EMPTY_PAGINATION } from '$lib/config';
import { getPosts } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
    const page = Math.max(1, Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1);
    const result = await getPosts({ sections: ['research'], statuses: ['published'], page, limit: 12 });
    if (result.error) throw error(503, result.error.message);

    const pagination = result.data?.data.pagination ?? { ...EMPTY_PAGINATION, page, limit: 12 };
    if (page > 1 && (pagination.totalPages === 0 || page > pagination.totalPages)) {
        throw error(404, 'Halaman riset tidak ditemukan.');
    }
    setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' });
    return {
        posts: result.data?.data.items ?? [],
        pagination,
        error: null
    };
};
