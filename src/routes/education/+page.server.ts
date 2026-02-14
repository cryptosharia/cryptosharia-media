import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/api';

export const load: PageServerLoad = async () => {
    // Fetch education articles
    const postsResponse = await getPosts({
        sections: ['education'],
        types: ['article'],
        limit: 12,
    });

    // Fetch webinars
    const webinarsResponse = await getPosts({
        sections: ['education'],
        types: ['webinar'],
        limit: 20,
    });

    const now = new Date();
    const webinars = webinarsResponse.data?.data?.items ?? [];

    // Split webinars into upcoming and past
    const upcomingWebinars = webinars.filter(
        (w) => w.eventDate && new Date(w.eventDate) >= now
    );
    const pastWebinars = webinars.filter(
        (w) => !w.eventDate || new Date(w.eventDate) < now
    );

    return {
        posts: postsResponse.data?.data?.items ?? [],
        upcomingWebinars,
        pastWebinars,
    };
};
