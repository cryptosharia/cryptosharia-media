import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/api';

export const load: PageServerLoad = async () => {
    // Fetch all research articles
    const postsResponse = await getPosts({
        sections: ['research'],
        limit: 30,
    });

    const posts = postsResponse.data?.data ?? [];

    // Categorize posts (in real API this would be done via tags/categories)
    // For mock, we'll split evenly
    const third = Math.ceil(posts.length / 3);

    return {
        fatwa: posts.slice(0, third),
        teknologi: posts.slice(third, third * 2),
        studiKasus: posts.slice(third * 2),
    };
};
