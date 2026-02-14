import type { PageServerLoad } from './$types';
import { getTokens } from '$lib/api';

export const load: PageServerLoad = async ({ url }) => {
    // Get query params
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('q');

    const params: any = {
        limit: 100 // Get all for now, or paginate
    };

    if (status && status !== 'all') {
        params.shariaStatuses = [status];
    }

    if (search) {
        params.search = search;
    }

    const response = await getTokens(params);

    return {
        tokens: response.data?.data?.items ?? [],
        params: {
            status: status ?? 'all',
            search: search ?? ''
        }
    };
};
