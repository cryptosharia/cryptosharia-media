import { error } from '@sveltejs/kit';
import { getToken } from '$lib/api/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;

    try {
        const { data, error: apiError } = await getToken(slug);

        if (apiError || !data) {
            console.error('Error fetching token:', apiError);
            throw error(404, 'Token not found');
        }

        return {
            token: data.data,
        };
    } catch (err) {
        console.error('Error loading token:', err);
        throw error(500, 'Internal Server Error');
    }
};
