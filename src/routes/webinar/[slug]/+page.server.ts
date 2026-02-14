import type { PageServerLoad } from './$types';
import { getPost } from '$lib/api';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;

    // Fetch the webinar
    const webinarResponse = await getPost(slug);

    return {
        webinar: webinarResponse.data?.data ?? null,
    };
};
