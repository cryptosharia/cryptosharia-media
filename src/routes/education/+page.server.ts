import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
    const target = new URL('/edukasi', url);
    for (const [key, value] of url.searchParams) target.searchParams.append(key, value);
    throw redirect(308, `${target.pathname}${target.search}`);
};
