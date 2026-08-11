import { getPosts, getTokens } from '$lib/api';
import { SITE_URL } from '$lib/config';
import type { Post, Token } from '$types/api';
import type { RequestHandler } from './$types';

function escapeXml(value: string) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

export const GET: RequestHandler = async () => {
    const [firstPosts, firstTokens] = await Promise.all([
        getPosts({ statuses: ['published'], limit: 100, page: 1 }),
        getTokens({ statuses: ['published'], limit: 100, page: 1 })
    ]);

    if (firstPosts.error || firstTokens.error) {
        return new Response('Sitemap belum tersedia.', {
            status: 503,
            headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' }
        });
    }

    const postPages = Math.max(1, firstPosts.data?.data.pagination.totalPages ?? 1);
    const tokenPages = Math.max(1, firstTokens.data?.data.pagination.totalPages ?? 1);
    const [remainingPosts, remainingTokens] = await Promise.all([
        Promise.all(
            Array.from({ length: postPages - 1 }, (_, index) =>
                getPosts({ statuses: ['published'], limit: 100, page: index + 2 })
            )
        ),
        Promise.all(
            Array.from({ length: tokenPages - 1 }, (_, index) =>
                getTokens({ statuses: ['published'], limit: 100, page: index + 2 })
            )
        )
    ]);

    if ([...remainingPosts, ...remainingTokens].some((result) => result.error)) {
        return new Response('Sitemap belum tersedia.', {
            status: 503,
            headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' }
        });
    }

    const posts: Post[] = [
        ...(firstPosts.data?.data.items ?? []),
        ...remainingPosts.flatMap((result) => result.data?.data.items ?? [])
    ];
    const tokens: Token[] = [
        ...(firstTokens.data?.data.items ?? []),
        ...remainingTokens.flatMap((result) => result.data?.data.items ?? [])
    ];

    const staticPaths = ['/', '/berita', '/edukasi', '/screening', '/tentang-kami', '/komunitas', '/riset'];
    const entries: Array<{ path: string; lastmod?: string | null }> = staticPaths.map((path) => ({ path }));

    for (const post of posts) {
        entries.push({
            path: post.section === 'activity' ? `/aktivitas/${post.slug}` : `/artikel/${post.slug}`,
            lastmod: post.updatedAt ?? post.publishedAt
        });
    }

    for (const token of tokens) {
        entries.push({ path: `/screening/${token.slug}`, lastmod: token.updatedAt ?? token.publishedAt });
    }

    const urls = Array.from(new Map(entries.map((entry) => [entry.path, entry])).values())
        .map(({ path, lastmod }) => {
            const loc = `<loc>${escapeXml(`${SITE_URL}${path}`)}</loc>`;
            const timestamp = lastmod ? Date.parse(lastmod) : Number.NaN;
            const modified = Number.isNaN(timestamp)
                ? ''
                : `<lastmod>${escapeXml(new Date(timestamp).toISOString())}</lastmod>`;
            return `<url>${loc}${modified}</url>`;
        })
        .join('');

    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
        headers: {
            'content-type': 'application/xml; charset=utf-8',
            'cache-control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
        }
    });
};
