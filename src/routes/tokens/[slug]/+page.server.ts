import { error } from '@sveltejs/kit';
import { getToken, getTokenQuotes } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;

    try {
        const [tokenRes, quotesRes] = await Promise.all([
            getToken(slug),
            getTokenQuotes(slug)
        ]);

        if (tokenRes.error || !tokenRes.data) {
            console.error('Error fetching token:', tokenRes.error);
            throw error(404, 'Token not found');
        }
        
        // Find the quote for this specific slug
        const quote = quotesRes.data?.data?.find((q: any) => q.slug === slug);

        return {
            token: tokenRes.data.data,
            quote: quote || null,
        };
    } catch (err) {
        console.error('Error loading token:', err);
        throw error(500, 'Internal Server Error');
    }
};
