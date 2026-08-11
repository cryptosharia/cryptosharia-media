import { fail, redirect } from '@sveltejs/kit';
import { signIn } from '$lib/api';
import { dev } from '$app/environment';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
            return fail(400, { email: typeof email === 'string' ? email : '', error: 'Email dan password wajib diisi.' });
        }
        if (email.length > 255 || password.length < 8) {
            return fail(400, { email, error: 'Email atau password belum valid.' });
        }

        try {
            const result = await signIn({
                email,
                password,
            });

            if (result.error || !result.data?.data) {
                return fail(401, {
                    email,
                    error: result.error?.message || 'Login gagal. Periksa kembali email dan password Anda.'
                });
            }

            const { accessToken, refreshToken } = result.data.data;

            if (!accessToken || !refreshToken) {
                return fail(502, { email, error: 'Sesi login tidak diterima dari server.' });
            }

            // Set secure HTTP-only cookies
            cookies.set('access_token', accessToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev,
                maxAge: 60 * 15
            });

            cookies.set('refresh_token', refreshToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev,
                maxAge: 60 * 60 * 24 * 30
            });

        } catch (err) {
            console.error('Login action error:', err);
            return fail(500, { email, error: 'Terjadi kesalahan sistem.' });
        }

        // Redirect on successful login
        throw redirect(303, '/profile');
    }
};
