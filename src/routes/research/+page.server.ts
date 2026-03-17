import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/api';

export const load: PageServerLoad = async () => {
    // Fetch all research articles
    const postsResponse = await getPosts({
        sections: ['research'],
        limit: 30,
    });

    const posts = postsResponse.data?.data?.items ?? [];

    return {
        posts,
    };
};
