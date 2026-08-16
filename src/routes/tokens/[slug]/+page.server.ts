import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params, url }) => {
    throw redirect(308, `/screening/${encodeURIComponent(params.slug)}${url.search}`);
};
