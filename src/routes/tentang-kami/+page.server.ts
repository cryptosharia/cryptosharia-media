import { fail, redirect } from '@sveltejs/kit';
import { getPosts, sendMessage } from '$lib/api';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const activities = await getPosts({
        sections: ['activity'],
        statuses: ['published'],
        limit: 6,
        page: 1
    });

    return {
        activities: activities.data?.data.items ?? [],
        activityError: activities.error?.message ?? null,
        messageSent: url.searchParams.get('pesan') === 'terkirim'
    };
};

function readField(form: FormData, key: string) {
    const value = form.get(key);
    return typeof value === 'string' ? value.trim() : '';
}

export const actions: Actions = {
    sendMessage: async ({ request }) => {
        const form = await request.formData();
        const name = readField(form, 'name');
        const email = readField(form, 'email');
        const message = readField(form, 'message');
        const fields = { name, email, message };

        if (name.length < 2 || name.length > 120) {
            return fail(400, { fields, error: 'Nama harus berisi 2–120 karakter.' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return fail(400, { fields, error: 'Alamat email belum valid.' });
        }
        if (email.length > 255) return fail(400, { fields, error: 'Alamat email terlalu panjang.' });
        if (message.length < 10 || message.length > 5000) {
            return fail(400, { fields, error: 'Pesan harus berisi 10–5.000 karakter.' });
        }

        const result = await sendMessage(fields);
        if (result.error) {
            return fail(result.response.status || 500, {
                fields,
                error: 'Pesan belum berhasil dikirim. Silakan coba lagi atau hubungi kami melalui WhatsApp.'
            });
        }

        throw redirect(303, '/tentang-kami?pesan=terkirim#hubungi-kami');
    }
};
