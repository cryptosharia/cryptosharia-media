import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAcademyVisibility } from '$lib/api';

export const GET: RequestHandler = async () => {
    const { isStale: _isStale, ...publicSettings } = await getAcademyVisibility();
    return json(publicSettings, {
        headers: {
            'cache-control': 'public, max-age=0, s-maxage=5, stale-while-revalidate=5'
        }
    });
};
