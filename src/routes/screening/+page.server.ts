import { EMPTY_PAGINATION } from '$lib/config';
import { getTokens } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { ShariaStatus } from '$types/api';
import type { PageServerLoad } from './$types';

const VALID_STATUSES = new Set<ShariaStatus>(['halal', 'haram', 'syubhat']);

export const load: PageServerLoad = async ({ url, setHeaders }) => {
    const requestedStatus = url.searchParams.get('status');
    const status = requestedStatus && VALID_STATUSES.has(requestedStatus as ShariaStatus)
        ? (requestedStatus as ShariaStatus)
        : '';
    const search = url.searchParams.get('q')?.trim() ?? '';
    const page = Math.max(1, Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1);
    const limit = 15;

    const result = await getTokens({
        statuses: ['published'],
        shariaStatuses: status ? [status] : undefined,
        search: search || undefined,
        page,
        limit
    });

    if (result.error) throw error(503, result.error.message);

    const pagination = result.data?.data.pagination ?? { ...EMPTY_PAGINATION, page, limit };
    if (page > 1 && (pagination.totalPages === 0 || page > pagination.totalPages)) {
        throw error(404, 'Halaman screening tidak ditemukan.');
    }

    setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' });

    return {
        tokens: result.data?.data.items ?? [],
        pagination,
        status,
        search,
        error: null
    };
};
