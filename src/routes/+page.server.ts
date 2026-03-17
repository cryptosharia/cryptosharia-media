import type { PageServerLoad } from './$types';
// Import from unified API - automatically switches between mock/real based on env
import { getPosts, getTokens } from '$lib/api';


export const load: PageServerLoad = async () => {
    // Fetch ONLY 'news' section for the homepage
    const postsResponse = await getPosts({
        sections: ['news'],
        limit: 15,
    });

    // Fetch tokens for screening
    const tokensResponse = await getTokens({
        limit: 20,
    });

    return {
        posts: postsResponse.data?.data?.items ?? [],
        tokens: tokensResponse.data?.data?.items ?? [],
    };
};
