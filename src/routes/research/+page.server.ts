import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/api';

export const load: PageServerLoad = async () => {
    // Fetch featured research article
    const featuredRes = await getPosts({
        sections: ['research'],
        limit: 1,
    });
    
    const featuredPost = featuredRes.data?.data?.items?.[0] || null;
    
    let posts = [];
    let meta = { currentPage: 1, totalPages: 1 };
    
    if (featuredPost) {
        // Fetch remaining articles using exclude
        const postsRes = await getPosts({
            sections: ['research'],
            limit: 6,
            exclude: [featuredPost.slug]
        });
        
        posts = postsRes.data?.data?.items ?? [];
        meta = postsRes.data?.data?.meta ?? meta;
    }

    return {
        featuredPost,
        posts,
        meta,
    };
};
