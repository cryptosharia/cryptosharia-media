import { fail, redirect } from '@sveltejs/kit';
import { signIn } from '$lib/api';
import { dev } from '$app/environment';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            return fail(400, { email, error: 'Email dan password wajib diisi.' });
        }

        try {
            const result = await signIn({
                email: email.toString(),
                password: password.toString(),
            });

            if (result.error || !result.data?.data) {
                return fail(401, {
                    email,
                    error: result.error?.message || 'Login gagal. Periksa kembali email dan password Anda.'
                });
            }

            const { access_token, refresh_token } = result.data.data;

            // Set secure HTTP-only cookies
            cookies.set('access_token', access_token, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev,
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });

            if (refresh_token) {
                cookies.set('refresh_token', refresh_token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: !dev,
                    maxAge: 60 * 60 * 24 * 30 // 30 days
                });
            }

        } catch (err) {
            console.error('Login action error:', err);
            return fail(500, { email, error: 'Terjadi kesalahan sistem.' });
        }

        // Redirect on successful login
        throw redirect(303, '/profile');
    }
};
