import type { PageServerLoad } from './$types';
// Using mock client while real API is under maintenance
// TODO: Switch back to '$lib/api/client' when API is available
import { getPosts, getTokens } from '$lib/api/mock';

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
