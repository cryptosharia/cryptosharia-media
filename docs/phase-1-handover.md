# CryptoSharia Phase 1 — Implementation & Handover

Tanggal implementasi: 11 Agustus 2026

Frontend: Naufal Nabila

Backend existing: Daffa Ilhami

## Scope yang dikerjakan

- Seluruh pengalaman publik disusun di domain utama.
- Menu final: Beranda, Berita, Edukasi, Screening Coin, Tentang Kami, dan Komunitas.
- Artikel dan screening memakai API/admin existing.
- Form kontak memakai endpoint `POST /messages` existing.
- Academy tidak ditampilkan dan tidak dikembangkan pada Phase 1.
- Admin existing tidak dipindahkan dan tidak ditampilkan di navigasi publik.
- Komunitas Premium hanya berupa informasi dan CTA menuju sistem existing.

## Struktur konten

Subkategori tidak menambah enum atau tabel baru. Semuanya memakai tag post existing:

| Menu | Section API | Tag slug |
|---|---|---|
| Crypto News | `news` | `crypto-news` |
| Teknologi & AI | `news` | `teknologi-ai` |
| Ekonomi | `news` | `ekonomi` |
| Geopolitik | `news` | `geopolitik` |
| Crypto Edu | `education` | `crypto-edu` |
| Financial Edu | `education` | `financial-edu` |
| Syariah Edu | `education` | `syariah-edu` |

Checklist admin sebelum rilis konten:

- Buat tujuh tag di atas apabila belum tersedia.
- Pilih section `news` atau `education` sesuai menu.
- Tempelkan tepat satu tag subkategori utama pada setiap artikel agar filter tidak ambigu.
- Pastikan status `published`, slug unik, cover image, excerpt, dan tanggal publikasi sudah benar.
- Jangan memasukkan konten produksi berlabel dummy.

> **Release gate per 11 Agustus 2026:** audit 28 post published menemukan `0` assignment yang cocok untuk empat subkategori Berita dan `0` assignment yang cocok untuk tiga subkategori Edukasi. Lima post Edukasi memiliki tag legacy `ekonomi`, tetapi tag itu pada struktur final berada di bawah Berita sehingga tidak boleh dipetakan otomatis. Daffa/tim konten perlu membuat atau memverifikasi tujuh tag final lalu mengklasifikasikan post existing sebelum filter submenu dapat diterima.

## Kontrak API yang dipakai

- `GET /posts`
- `GET /posts/{id}` — `{id}` menerima UUID atau slug
- `GET /tokens`
- `GET /tokens/{id}` — `{id}` menerima UUID atau slug
- `GET /tokens/quotes`
- `POST /messages`

Semua request berjalan dari server SvelteKit dengan `Api-Key`. API key tidak pernah diteruskan ke browser. Field audit internal `createdBy` dan `updatedBy` dinetralkan sebelum data halaman diserialisasi, sehingga email editor tidak dikirim ke browser. Konten detail hanya mengirim HTML yang sudah disanitasi; Markdown mentah tidak ikut ke payload. Embed hanya diizinkan untuk URL HTTPS YouTube/YouTube No-Cookie pada path `/embed/`.

## Redirect kompatibilitas

| URL lama | Target canonical | Status |
|---|---|---:|
| `/education` | `/edukasi` | 308 |
| `/research` | `/riset` | 308 |
| `/community` | `/komunitas` | 308 |
| `/article/[slug]` | `/artikel/[slug]` | 308 |
| `/webinar/[slug]` | `/artikel/[slug]` | 308 |
| `/tokens/[slug]` | `/screening/[slug]` | 308 |
| `/discord` | `/komunitas#gabung` | 308 |
| `/consultant` | `/tentang-kami#hubungi-kami` | 308 |
| `portal.cryptosharia.id` | `/komunitas` | 308 setelah DNS diarahkan |
| `profile.cryptosharia.id` | `/tentang-kami` atau route aktivitas terkait | 308 setelah DNS diarahkan |
| `media.cryptosharia.id` | domain utama; root menuju `/berita` | 308 setelah DNS diarahkan |

Host-level redirect sudah disiapkan di `src/hooks.server.ts`, tetapi baru aktif setelah subdomain diarahkan ke deployment ini. `admin.cryptosharia.id` tidak boleh diarahkan karena tetap memakai sistem existing.

## SEO dasar

Sudah tersedia:

- Title dan description per halaman.
- Canonical URL ke `https://www.cryptosharia.id`.
- Open Graph dan Twitter metadata.
- Bahasa dokumen `id`.
- `robots.txt` yang mengizinkan crawl.
- Sitemap dinamis untuk halaman statis, artikel, aktivitas, dan detail screening.
- Redirect permanen untuk URL lama.
- Halaman error dengan `noindex`.
- Sitemap membalas `503 no-store` saat API gagal, sehingga crawler tidak menyimpan sitemap parsial sebagai keadaan final.

Setelah production live:

1. Buka `https://www.cryptosharia.id/robots.txt` dan `/sitemap.xml`.
2. Pastikan keduanya merespons `200` dan canonical tidak menunjuk subdomain lama.
3. Tambahkan/validasi property domain di Google Search Console.
4. Submit `https://www.cryptosharia.id/sitemap.xml`.
5. Gunakan URL Inspection untuk Beranda, Berita, Edukasi, Screening, dan satu artikel.
6. Pantau Page Indexing dan 404 setelah Google melakukan crawl ulang.

Tanggal muncul di hasil Google dan peringkat pencarian mengikuti proses Google dan tidak dapat dijamin.

## Checklist deployment

- Set `PUBLIC_APP_URL=https://www.cryptosharia.id`.
- Set `PUBLIC_CS_API_URL=https://api.cryptosharia.id`.
- Set server-only `CS_API_KEY` dengan key publik milik frontend.
- Pastikan production branch project Vercel sudah dikonfirmasi.
- Deploy ke preview dan uji artikel, screening, serta pesan kontak dengan data production.
- Konfirmasi copy Visi/Misi/Tujuan, 11 nama dan jabatan tim, nomor/alamat/email kontak, seluruh link sosial, dan CTA Premium kepada pemilik konten.
- Konfirmasi seluruh status Halal/Haram/Syubhat kepada pemilik kajian/syariah; frontend hanya menampilkan record published dari API.
- Minta satu tahap review dari stakeholder.
- Catat deployment terakhir yang stabil sebagai rollback target.
- Deploy production.
- Arahkan subdomain publik lama secara bertahap; jangan ubah admin.
- Pantau 401/403/404/5xx dan link redirect minimal selama 24 jam pertama.

## Acceptance checklist

- [ ] Semua menu dan submenu berfungsi pada desktop dan mobile.
- [ ] Tujuh filter subkategori menghasilkan konten yang sesuai.
- [ ] Copy Tujuan, tim, kontak, sosial, Premium, dan data screening sudah disetujui pemilik konten.
- [ ] Daftar dan detail artikel menampilkan data admin existing.
- [ ] Pencarian, filter status, pagination, list, dan detail screening berfungsi.
- [ ] Markdown artikel dan screening tersanitasi.
- [ ] Form kontak masuk ke database dan notifikasi email diterima.
- [ ] Tidak ada label `[DUMMY]` pada konten production.
- [ ] Redirect lama tidak menghasilkan loop.
- [ ] Sitemap memuat seluruh slug production.
- [ ] Canonical, title, description, dan Open Graph benar.
- [ ] Keyboard focus, mobile menu, light/dark mode, empty state, dan error state dapat digunakan.
- [ ] `npm run check`, `npm run build`, dan `npm audit --omit=dev` lulus.

## Garansi dan batasan

Garansi bug berlaku tujuh hari setelah production release untuk perilaku yang termasuk scope di atas. Perubahan API/database, fitur Academy, membership/payment, pemindahan admin, redesign tambahan, input atau migrasi konten massal, serta fitur baru berada di luar garansi Phase 1.

Route akun legacy `/login`, `/profile`, dan BFF `/api/posts` dipertahankan untuk kompatibilitas, tidak ditampilkan di navigasi, serta bukan fitur baru Phase 1. Perubahan alur membership/akun tetap masuk fase berikutnya.

## Rollback

Jika setelah cutover terjadi kegagalan API, error render mayor, atau redirect loop:

1. Alihkan domain utama kembali ke deployment production sebelumnya.
2. Pertahankan database dan admin tanpa perubahan.
3. Kembalikan subdomain publik lama ke target sebelumnya bila sudah dipindahkan.
4. Simpan log URL/error, perbaiki di preview, lalu ulangi smoke test sebelum cutover berikutnya.
