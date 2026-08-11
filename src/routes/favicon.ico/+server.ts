import type { RequestHandler } from './$types';

export const GET: RequestHandler = () =>
    new Response(null, {
        status: 308,
        headers: {
            location: '/logo.png',
            'cache-control': 'public, max-age=86400'
        }
    });
