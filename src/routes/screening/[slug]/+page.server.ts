import { SCREENING_DATA } from '$lib/data/screening';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const slug = params.slug;
    const token = SCREENING_DATA.find((t) => t.slug === slug);

    if (!token) {
        throw error(404, 'Token not found');
    }

    return {
        token
    };
};
