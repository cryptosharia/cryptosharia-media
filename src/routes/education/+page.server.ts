import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/api';

export const load: PageServerLoad = ({ setHeaders }) => {
    // Set cache for 2 minutes to prevent repeated API calls on client-side navigation
    setHeaders({
        'cache-control': 'public, max-age=120'
    });

    // Return nested promises so SvelteKit 2 streams them without blocking navigation
    return {
        streamed: {
            posts: getPosts({
                sections: ['education'],
                types: ['article'],
                limit: 6,
            }).then((res: any) => {
                const data = res.data?.data;
                return {
                    items: data?.items ?? [],
                    meta: data?.meta ?? { currentPage: 1, totalPages: 1 }
                };
            }),

            heroVideo: getPosts({
                types: ['video'],
                limit: 1,
            }).then((res: any) => res.data?.data?.items?.[0] || null),

            webinars: getPosts({
                sections: ['education'],
                types: ['webinar'],
                limit: 20,
            }).then((res: any) => {
                const now = new Date();
                const webinars = res.data?.data?.items ?? [];
                
                return {
                    upcoming: webinars.filter((w: any) => w.eventDate && new Date(w.eventDate) >= now),
                    past: webinars.filter((w: any) => !w.eventDate || new Date(w.eventDate) < now)
                };
            })
        }
    };
};
