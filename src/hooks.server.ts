import type { Handle } from '@sveltejs/kit';
import { getMe, refreshSession } from '$lib/api';

function legacyTarget(url: URL) {
    const hostname = url.hostname.toLowerCase();
    const query = url.search;

    if (hostname === 'cryptosharia.id') return `https://www.cryptosharia.id${url.pathname}${query}`;

    if (hostname === 'portal.cryptosharia.id') {
        return `https://www.cryptosharia.id/komunitas${query}`;
    }

    if (hostname === 'profile.cryptosharia.id') {
        const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : '/';
        const route = pathname.toLowerCase();

        if (route.startsWith('/aktivitas/')) {
            const slug = pathname.slice('/aktivitas/'.length);
            return `https://www.cryptosharia.id/aktivitas/${slug}${query}`;
        }

        if (route === '/komunitas' || route === '/community') {
            return `https://www.cryptosharia.id/komunitas${query}`;
        }

        if (route === '/aktivitas') {
            return `https://www.cryptosharia.id/tentang-kami${query}#aktivitas`;
        }

        if (route === '/pengurus' || route === '/tim') {
            return `https://www.cryptosharia.id/tentang-kami${query}#tim`;
        }

        if (['/visi-misi', '/visi', '/misi', '/tujuan'].includes(route)) {
            return `https://www.cryptosharia.id/tentang-kami${query}#visi-misi`;
        }

        if (['/hubungi-kami', '/kontak', '/contact'].includes(route)) {
            return `https://www.cryptosharia.id/tentang-kami${query}#hubungi-kami`;
        }

        return `https://www.cryptosharia.id/tentang-kami${query}`;
    }

    if (hostname === 'media.cryptosharia.id') {
        const pathname = url.pathname === '/' ? '/berita' : url.pathname;
        return `https://www.cryptosharia.id${pathname}${query}`;
    }

    return null;
}

export const handle: Handle = async ({ event, resolve }) => {
    const target = legacyTarget(event.url);
    if (target) return new Response(null, { status: 308, headers: { location: target } });

    const token = event.cookies.get('access_token');
    const refreshToken = event.cookies.get('refresh_token');
    event.locals.user = null;
    event.locals.token = null;

    const clearSession = () => {
        event.cookies.delete('access_token', { path: '/' });
        event.cookies.delete('refresh_token', { path: '/' });
    };

    const restoreSession = async () => {
        if (!refreshToken) return false;
        const refreshed = await refreshSession(refreshToken);
        const session = refreshed.data?.data;
        if (!session?.accessToken || !session.refreshToken) {
            if (refreshed.response.status === 400 || refreshed.response.status === 401) clearSession();
            return false;
        }

        const secure = event.url.protocol === 'https:';
        event.cookies.set('access_token', session.accessToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure,
            maxAge: 60 * 15
        });
        event.cookies.set('refresh_token', session.refreshToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure,
            maxAge: 60 * 60 * 24 * 30
        });
        event.locals.user = session.user;
        event.locals.token = session.accessToken;
        return true;
    };

    if (token) {
        const result = await getMe(token);
        if (result.data?.data) {
            event.locals.user = result.data.data;
            event.locals.token = token;
        } else if (result.response.status === 401) {
            const restored = await restoreSession();
            if (!restored && !refreshToken) clearSession();
        }
    } else if (refreshToken) {
        await restoreSession();
    }

    const response = await resolve(event);
    response.headers.set('x-content-type-options', 'nosniff');
    response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
    response.headers.set('permissions-policy', 'camera=(), microphone=(), geolocation=()');
    return response;
};
