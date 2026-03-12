import { fail } from '@sveltejs/kit';
import { sendMessage } from '$lib/api';
import type { Actions } from './$types';

export const actions: Actions = {
    contact: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const message = data.get('message');

        if (!name || !email || !message) {
            return fail(400, {
                error: 'Semua field (Nama, Email, Pesan) wajib diisi.',
                values: { name, email, message }
            });
        }

        try {
            const result = await sendMessage({
                name: name.toString(),
                email: email.toString(),
                message: message.toString(),
            });

            if (result.error) {
                console.error('API Error sending message:', result.error);
                return fail(500, {
                    error: 'Gagal mengirim pesan. Silakan coba lagi nanti.',
                    values: { name, email, message }
                });
            }

            return { success: true };
        } catch (err) {
            console.error('Error in contact action:', err);
            return fail(500, {
                error: 'Terjadi kesalahan sistem. Silakan coba lagi nanti.',
                values: { name, email, message }
            });
        }
    }
};
