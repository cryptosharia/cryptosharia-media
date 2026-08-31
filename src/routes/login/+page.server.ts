import { fail, redirect } from '@sveltejs/kit';
import { requestOtp, verifyOtp } from '$lib/api';
import { dev } from '$app/environment';
import type { Actions } from './$types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
    requestOtp: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');

        if (typeof email !== 'string' || !email.trim()) {
            return fail(400, { email: typeof email === 'string' ? email : '', error: 'Email wajib diisi.' });
        }

        const normalizedEmail = email.trim();
        if (normalizedEmail.length > 255 || !EMAIL_PATTERN.test(normalizedEmail)) {
            return fail(400, { email: normalizedEmail, error: 'Masukkan alamat email yang valid.' });
        }

        const result = await requestOtp(normalizedEmail);
        if (result.error) {
            return fail(result.response.status || 503, { email: normalizedEmail, error: result.error.message });
        }
        return { email: normalizedEmail, otpRequested: true };
    },

    verifyOtp: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const code = data.get('code');

        const normalizedEmail = typeof email === 'string' ? email.trim() : '';
        const normalizedCode = typeof code === 'string' ? code.trim() : '';

        if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail) || !/^[0-9]{6}$/.test(normalizedCode)) {
            return fail(400, { email: typeof email === 'string' ? email : '', otpRequested: true, error: 'Masukkan kode OTP 6 digit.' });
        }

        try {
            const result = await verifyOtp({ email: normalizedEmail, code: normalizedCode });
            if (result.error || !result.data?.data) {
                return fail(result.response.status || 401, { email: normalizedEmail, otpRequested: true, error: result.error?.message || 'Kode OTP tidak valid atau kedaluwarsa.' });
            }

            const { accessToken, refreshToken } = result.data.data;

            if (!accessToken || !refreshToken) {
                return fail(502, { email: normalizedEmail, otpRequested: true, error: 'Sesi login tidak diterima dari server.' });
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
            return fail(500, { email: normalizedEmail, otpRequested: true, error: 'Terjadi kesalahan sistem.' });
        }

        // Redirect on successful login
        throw redirect(303, '/profile');
    }
};
