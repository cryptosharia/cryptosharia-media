import type { PageServerLoad } from './$types';
// Import from unified API - automatically switches between mock/real based on env
import { getPosts, getTokens } from '$lib/api';


export const load: PageServerLoad = async () => {
    // Fetch posts excluding 'activity' section
    const postsResponse = await getPosts({
        sections: ['news', 'education', 'research'],
        limit: 9,
    });

    // Fetch tokens for screening
    const tokensResponse = await getTokens({
        limit: 20,
    });

    return {
        posts: postsResponse.data?.data ?? [],
        tokens: tokensResponse.data?.data ?? [],
    };
};
