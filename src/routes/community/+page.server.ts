import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // Redirect Premium to external payment page as requested
    throw redirect(303, 'https://berbagi.link/cryptosharia/');
};
