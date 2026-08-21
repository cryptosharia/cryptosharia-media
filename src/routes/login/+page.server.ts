import { fail, redirect } from '@sveltejs/kit';
import { requestOtp, verifyOtp } from '$lib/api';
import { dev } from '$app/environment';
import type { Actions } from './$types';

export const actions: Actions = {
    requestOtp: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');

        if (typeof email !== 'string' || !email) {
            return fail(400, { email: typeof email === 'string' ? email : '', error: 'Email wajib diisi.' });
        }
        if (email.length > 255) {
            return fail(400, { email, error: 'Email belum valid.' });
        }

        const result = await requestOtp(email);
        if (result.error) {
            return fail(result.response.status || 503, { email, error: result.error.message });
        }
        return { email, otpRequested: true };
    },

    verifyOtp: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const code = data.get('code');

        if (typeof email !== 'string' || typeof code !== 'string' || !email || !/^\d{6}$/.test(code)) {
            return fail(400, { email: typeof email === 'string' ? email : '', otpRequested: true, error: 'Masukkan kode OTP 6 digit.' });
        }

        try {
            const result = await verifyOtp({ email, code });
            if (result.error || !result.data?.data) {
                return fail(result.response.status || 401, { email, otpRequested: true, error: result.error?.message || 'Kode OTP tidak valid atau kedaluwarsa.' });
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

        } catch {
            return fail(500, { email, error: 'Terjadi kesalahan sistem.' });
        }

        // Redirect on successful login
        throw redirect(303, '/profile');
    }
};
