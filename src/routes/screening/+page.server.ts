import type { PageServerLoad } from './$types';
import { getTokens } from '$lib/api';

export const load: PageServerLoad = async ({ url }) => {
    // Get query params
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('q');
    const page = parseInt(url.searchParams.get('page') ?? '1', 10) || 1;
    const limit = 12;

    const params: any = {
        limit,
        page,
    };

    if (status && status !== 'all') {
        params.shariaStatuses = [status];
    }

    if (search) {
        params.search = search;
    }

    const response = await getTokens(params);
    const data = response.data?.data;

    return {
        tokens: data?.items ?? [],
        pagination: data?.pagination ?? { total: 0, page: 1, limit, totalPages: 1 },
        params: {
            status: status ?? 'all',
            search: search ?? '',
            page,
        }
    };
};
