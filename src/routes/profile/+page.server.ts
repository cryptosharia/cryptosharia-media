import { redirect } from '@sveltejs/kit';
import { signOut } from '$lib/api';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    // Prevent unauthenticated users from viewing the profile page
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    return {
        user: locals.user
    };
};

export const actions: Actions = {
    logout: async ({ cookies }) => {
        const refreshToken = cookies.get('refresh_token');
        if (refreshToken) {
            await signOut(refreshToken).catch(() => {
                // Ignore API signout errors, the local session must be destroyed anyway
            });
        }

        // Clear the cookies
        cookies.delete('access_token', { path: '/' });
        cookies.delete('refresh_token', { path: '/' });

        // Redirect to login page
        throw redirect(303, '/login');
    }
};
