import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    throw error(404, 'Halaman tidak ditemukan.');
};
