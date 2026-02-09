import type { PageServerLoad } from './$types';
import { getPost, getPosts } from '$lib/api';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;

    // Fetch the article
    const postResponse = await getPost(slug);
    const post = postResponse.data?.data ?? null;

    // Fetch related posts (same section)
    let relatedPosts: typeof post extends null ? [] : NonNullable<typeof post>[] = [];
    if (post) {
        const relatedResponse = await getPosts({
            sections: [post.section as 'news' | 'education' | 'research' | 'activity'],
            limit: 3,
        });
        relatedPosts = (relatedResponse.data?.data ?? []).filter((p) => p.slug !== slug);
    }

    return {
        post,
        relatedPosts,
    };
};
