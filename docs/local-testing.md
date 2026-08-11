# Local testing CryptoSharia Phase 1

Mode ini menjalankan frontend dan API fixture lokal sekaligus. Tidak memerlukan API key production dan tidak menulis ke database, admin, email, atau layanan production.

## Menjalankan

```bash
npm install
npm run dev:local
```

Buka `http://127.0.0.1:5173`. Hentikan server dengan `Ctrl+C`.

Seluruh konten fixture diberi label `[LOCAL TEST]`. Pengiriman form Kontak hanya dicatat di terminal dan tidak benar-benar dikirim.

## Checklist manual

- Beranda tampil pada desktop dan mobile.
- Header desktop dan menu mobile memuat seluruh menu final.
- Empat filter Berita dan tiga filter Edukasi masing-masing menampilkan satu artikel lokal.
- Pencarian Berita/Edukasi dapat menemukan dan mengosongkan hasil.
- Detail artikel dapat dibuka dan Markdown tampil rapi.
- Screening dapat difilter menjadi Halal, Syubhat, dan Haram.
- Detail screening menampilkan status, metric lokal, dan disclaimer.
- Tentang Kami menampilkan visi, misi, tujuan, tim, aktivitas, dan form kontak.
- Form kontak berakhir pada pesan sukses tanpa mengirim ke production.
- Redirect lama seperti `/education`, `/article/[slug]`, dan `/tokens/[slug]` menuju route baru.
- `/robots.txt` serta `/sitemap.xml` dapat dibuka.
- Light mode, dark mode, keyboard focus, dan navigasi mobile dapat digunakan.

## Menguji API production nanti

Buat `.env` lokal yang tidak dikomit:

```env
PUBLIC_APP_URL=http://127.0.0.1:5173
PUBLIC_CS_API_URL=https://api.cryptosharia.id
CS_API_KEY=<server-only-api-key>
```

Kemudian jalankan `npm run dev`. Jangan memasukkan API key ke variable berawalan `PUBLIC_`, screenshot, chat, atau Git.
