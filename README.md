# CryptoSharia Web

Frontend publik utama CryptoSharia untuk `https://www.cryptosharia.id`.

Phase 1 menyatukan halaman publik Beranda, Berita, Edukasi, Screening Coin, Tentang Kami, dan Komunitas. Admin serta API tetap berjalan sebagai layanan terpisah. Academy belum termasuk dalam fase ini.

## Menjalankan project

Persyaratan: Node.js 20 atau lebih baru.

```bash
npm install
cp .env.example .env
npm run dev
```

Environment yang diperlukan:

```env
PUBLIC_APP_URL=https://www.cryptosharia.id
PUBLIC_CS_API_URL=https://api.cryptosharia.id
CS_API_KEY=<server-only-api-key>
```

`CS_API_KEY` tidak boleh diberi prefix `PUBLIC_`, disimpan di browser, atau dikirim ke client.

## Pemeriksaan sebelum rilis

```bash
npm run check
npm run build
npm audit --omit=dev
```

## Local testing tanpa API key production

```bash
npm run dev:local
```

Perintah ini menjalankan frontend beserta data fixture yang jelas berlabel `[LOCAL TEST]` dan tidak menyentuh layanan production. Checklist pengujian tersedia di [docs/local-testing.md](docs/local-testing.md).

## Route utama

- `/` — Beranda
- `/berita` — Berita dan filter subkategori
- `/edukasi` — Edukasi dan filter subkategori
- `/artikel/[slug]` — Detail berita/edukasi/riset
- `/screening` — Daftar Screening Coin
- `/screening/[slug]` — Detail screening
- `/tentang-kami` — Visi, misi, tujuan, tim, aktivitas, dan kontak
- `/aktivitas/[slug]` — Detail aktivitas
- `/komunitas` — Komunitas umum, sosial media, dan CTA Premium
- `/riset` — Arsip kompatibilitas untuk konten riset lama; tidak tampil di menu utama
- `/sitemap.xml` — Sitemap dinamis

Detail cutover, taxonomy, redirect, dan handover tersedia di [docs/phase-1-handover.md](docs/phase-1-handover.md).
