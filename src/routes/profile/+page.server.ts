import { fail, redirect } from '@sveltejs/kit';
import { signOut, uploadAvatar } from '$lib/api';
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
    uploadAvatar: async ({ request, locals }) => {
        if (!locals.token) return fail(401, { error: 'Unauthorized' });

        const data = await request.formData();
        const avatarImage = data.get('avatar') as File | null;

        if (!avatarImage || avatarImage.size === 0) {
            return fail(400, { error: 'Silakan pilih gambar terlebih dahulu.' });
        }

        try {
            const result = await uploadAvatar(locals.token, avatarImage);

            if (result.error || !result.data?.data) {
                console.error('Upload Error:', result.error);
                return fail(500, { error: 'Gagal mengupload avatar.' });
            }

            // Successfully uploaded, optionally update user locally
            // Note: If you implement a real backend, they might sync this via /auth/me next time.
            return { uploadSuccess: true, avatarUrl: result.data.data.url };
        } catch (err) {
            console.error('Upload action error:', err);
            return fail(500, { error: 'Terjadi kesalahan sistem saat upload.' });
        }
    },
    logout: async ({ locals, cookies }) => {
        if (locals.token) {
            // Tell the backend to invalidate the token
            await signOut(locals.token).catch(() => {
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
