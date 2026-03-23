import type { Handle } from '@sveltejs/kit';
import { getMe } from '$lib/api';

export const handle: Handle = async ({ event, resolve }) => {
    // Read the access token from cookies
    const token = event.cookies.get('access_token');

    // Default locals to null
    event.locals.user = null;
    event.locals.token = null;

    if (token) {
        try {
            // Verify token and get user profile
            const { data, error } = await getMe(token);

            if (!error && data?.data) {
                // Token is valid, set user in locals
                event.locals.user = data.data;
                event.locals.token = token;
            } else {
                // Token is invalid or expired, clear it
                event.cookies.delete('access_token', { path: '/' });
            }
        } catch (err) {
            console.error('Error validating session token:', err);
            // In case of network errors during SSR, we might not want to log the user out immediately,
            // but for simplicity, we clear it here.
            event.cookies.delete('access_token', { path: '/' });
        }
    }

    // Process the request
    const response = await resolve(event);

    // Add client-side caching (browser only) for GET requests to improve UX during navigation
    // Excluding paths that contains sensitive/frequently changing user data
    if (event.request.method === 'GET' && !response.headers.has('cache-control')) {
        const path = event.url.pathname;
        if (!path.startsWith('/profile') && !path.startsWith('/login')) {
            // Cache in the browser for 60 seconds
            response.headers.set('cache-control', 'private, max-age=60');
        }
    }

    return response;
};
