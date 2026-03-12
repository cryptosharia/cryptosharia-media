import type { PageServerLoad } from './$types';
import { getPost, getPosts } from '$lib/api';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;

    // Fetch the article
    const postResponse = await getPost(slug);
    const post = postResponse.data?.data ?? null;

    // Fetch related posts (same section)
    let relatedPosts: import('$types/api').Post[] = [];
    if (post) {
        const relatedResponse = await getPosts({
            sections: [post.section as 'news' | 'education' | 'research' | 'activity'],
            limit: 3,
        });
        relatedPosts = (relatedResponse.data?.data?.items ?? []).filter((p: any) => p.slug !== slug);
    }

    return {
        post,
        relatedPosts,
    };
};
