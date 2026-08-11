import http from 'node:http';

const HOST = '127.0.0.1';
const PORT = 8787;
const FRONTEND_URL = 'http://127.0.0.1:5173';

const auditUser = { id: 'local-editor', name: 'Editor Lokal', email: 'editor@local.test' };
const coverImage = {
    id: 'local-cover',
    url: `${FRONTEND_URL}/logo.png`,
    filename: 'logo.png',
    size: 1,
    mimeType: 'image/png',
    width: 500,
    height: 500
};

const taxonomy = {
    'crypto-news': 'Crypto News',
    'teknologi-ai': 'Teknologi & AI',
    ekonomi: 'Ekonomi',
    geopolitik: 'Geopolitik',
    'crypto-edu': 'Crypto Edu',
    'financial-edu': 'Financial Edu',
    'syariah-edu': 'Syariah Edu'
};

function makePost({ slug, title, section, tag, excerpt, content, status = 'published' }) {
    return {
        id: `local-${slug}`,
        title: `[LOCAL TEST] ${title}`,
        slug,
        excerpt,
        content,
        section,
        type: 'article',
        status,
        isFeatured: slug === 'perkembangan-pasar-kripto',
        eventDate: null,
        externalLink: null,
        publishedAt: status === 'published' ? '2026-08-11T08:00:00.000Z' : null,
        createdAt: '2026-08-10T08:00:00.000Z',
        updatedAt: '2026-08-11T09:00:00.000Z',
        createdBy: auditUser,
        updatedBy: auditUser,
        coverImage,
        tags: tag ? [{ id: `tag-${tag}`, name: taxonomy[tag] ?? tag, slug: tag }] : []
    };
}

const articleContent = (topic) => `
## Ringkasan pengujian

Halaman ini menggunakan data fixture lokal untuk menguji tampilan **${topic}** tanpa mengubah data production.

### Hal yang dapat diperiksa

- Tipografi dan jarak antarelemen
- Heading, daftar, tautan, serta konten panjang
- Tampilan desktop dan mobile

> Data ini hanya untuk local testing dan tidak berasal dari admin production.
`;

const posts = [
    makePost({ slug: 'perkembangan-pasar-kripto', title: 'Perkembangan Pasar Kripto', section: 'news', tag: 'crypto-news', excerpt: 'Data uji untuk submenu Crypto News.', content: articleContent('Crypto News') }),
    makePost({ slug: 'ai-dan-blockchain', title: 'AI dan Blockchain', section: 'news', tag: 'teknologi-ai', excerpt: 'Data uji untuk submenu Teknologi & AI.', content: articleContent('Teknologi & AI') }),
    makePost({ slug: 'ekonomi-digital-global', title: 'Ekonomi Digital Global', section: 'news', tag: 'ekonomi', excerpt: 'Data uji untuk submenu Ekonomi.', content: articleContent('Ekonomi') }),
    makePost({ slug: 'geopolitik-aset-digital', title: 'Geopolitik dan Aset Digital', section: 'news', tag: 'geopolitik', excerpt: 'Data uji untuk submenu Geopolitik.', content: articleContent('Geopolitik') }),
    makePost({ slug: 'dasar-aset-kripto', title: 'Dasar Aset Kripto', section: 'education', tag: 'crypto-edu', excerpt: 'Data uji untuk submenu Crypto Edu.', content: articleContent('Crypto Edu') }),
    makePost({ slug: 'mengenal-perencanaan-keuangan', title: 'Mengenal Perencanaan Keuangan', section: 'education', tag: 'financial-edu', excerpt: 'Data uji untuk submenu Financial Edu.', content: articleContent('Financial Edu') }),
    makePost({ slug: 'prinsip-muamalah-digital', title: 'Prinsip Muamalah Digital', section: 'education', tag: 'syariah-edu', excerpt: 'Data uji untuk submenu Syariah Edu.', content: articleContent('Syariah Edu') }),
    makePost({ slug: 'aktivitas-literasi-lokal', title: 'Aktivitas Literasi CryptoSharia', section: 'activity', excerpt: 'Data uji untuk bagian Aktivitas Kami.', content: articleContent('Aktivitas') }),
    makePost({ slug: 'arsip-riset-lokal', title: 'Arsip Riset CryptoSharia', section: 'research', excerpt: 'Data uji untuk route kompatibilitas Riset.', content: articleContent('Riset') }),
    makePost({ slug: 'draft-rahasia', title: 'Draft yang Tidak Boleh Tampil', section: 'news', tag: 'crypto-news', excerpt: 'Draft lokal untuk menguji published-only guard.', content: '# Draft', status: 'draft' })
];

function makeToken(slug, name, ticker, rank, shariaStatus) {
    return {
        id: `local-token-${slug}`,
        slug,
        rank,
        name,
        ticker,
        shariaStatus,
        status: 'published',
        excerpt: `Data fixture lokal untuk menguji tampilan status ${shariaStatus}.`,
        content: `## Dasar screening lokal\n\nPenjelasan ini hanya data uji UI dan **bukan hasil kajian syariah**.`,
        tradingviewSymbol: null,
        website: 'https://www.cryptosharia.id',
        publishedAt: '2026-08-11T08:00:00.000Z',
        createdAt: '2026-08-10T08:00:00.000Z',
        updatedAt: '2026-08-11T09:00:00.000Z',
        createdBy: auditUser,
        updatedBy: auditUser,
        logo: coverImage,
        tags: []
    };
}

const tokens = [
    makeToken('bitcoin-local', 'Bitcoin Local', 'BTC-L', 1, 'halal'),
    makeToken('ethereum-local', 'Ethereum Local', 'ETH-L', 2, 'syubhat'),
    makeToken('samplecoin-local', 'Sample Coin Local', 'SMP-L', 3, 'haram')
];

function csv(searchParams, name) {
    return (searchParams.get(name) || '').split(',').filter(Boolean);
}

function paginate(items, searchParams) {
    const limit = Math.min(100, Math.max(1, Number.parseInt(searchParams.get('limit') || '10', 10) || 10));
    const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
    const totalPages = items.length ? Math.ceil(items.length / limit) : 0;
    const start = (page - 1) * limit;
    return {
        items: items.slice(start, start + limit),
        pagination: { total: items.length, page, limit, totalPages }
    };
}

function respond(response, status, payload) {
    response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(payload));
}

function success(response, data, status = 200) {
    respond(response, status, { success: true, message: 'Local fixture', data });
}

function failure(response, status, message) {
    respond(response, status, { success: false, message });
}

async function readJson(request) {
    let body = '';
    for await (const chunk of request) body += chunk;
    return body ? JSON.parse(body) : {};
}

const server = http.createServer(async (request, response) => {
    const url = new URL(request.url || '/', `http://${HOST}:${PORT}`);

    if (request.headers['api-key'] !== 'local-fixture-key') {
        return failure(response, 401, 'API key fixture lokal tidak valid.');
    }

    if (request.method === 'GET' && url.pathname === '/posts') {
        const statuses = csv(url.searchParams, 'statuses');
        const sections = csv(url.searchParams, 'sections');
        const tags = csv(url.searchParams, 'tags');
        const slugs = csv(url.searchParams, 'slugs');
        const excluded = csv(url.searchParams, 'exclude');
        const search = (url.searchParams.get('search') || '').toLowerCase();

        const filtered = posts.filter((post) =>
            (statuses.length ? statuses.includes(post.status) : post.status === 'published') &&
            (!sections.length || sections.includes(post.section)) &&
            (!tags.length || post.tags.some((tag) => tags.includes(tag.slug))) &&
            (!slugs.length || slugs.includes(post.slug)) &&
            !excluded.includes(post.slug) &&
            (!search || `${post.title} ${post.excerpt}`.toLowerCase().includes(search))
        );
        return success(response, paginate(filtered, url.searchParams));
    }

    if (request.method === 'GET' && url.pathname.startsWith('/posts/')) {
        const key = decodeURIComponent(url.pathname.slice('/posts/'.length));
        const post = posts.find((item) => item.slug === key || item.id === key);
        return post ? success(response, post) : failure(response, 404, 'Post lokal tidak ditemukan.');
    }

    if (request.method === 'GET' && url.pathname === '/tokens/quotes') {
        const requestedSlugs = csv(url.searchParams, 'slugs');
        const quotes = tokens
            .filter((token) => requestedSlugs.includes(token.slug))
            .map((token) => ({ slug: token.slug, rank: token.rank, infiniteSupply: false, maxSupply: 21000000, circulatingSupply: 19000000, priceUsd: 1000 / token.rank, marketCapUsd: 1000000000 / token.rank, marketCapDominance: 10 / token.rank, percentChange24h: token.rank - 2 }));
        return success(response, quotes);
    }

    if (request.method === 'GET' && url.pathname === '/tokens') {
        const statuses = csv(url.searchParams, 'statuses');
        const shariaStatuses = csv(url.searchParams, 'shariaStatuses');
        const search = (url.searchParams.get('search') || '').toLowerCase();
        const filtered = tokens.filter((token) =>
            (statuses.length ? statuses.includes(token.status) : token.status === 'published') &&
            (!shariaStatuses.length || shariaStatuses.includes(token.shariaStatus)) &&
            (!search || `${token.name} ${token.ticker}`.toLowerCase().includes(search))
        );
        return success(response, paginate(filtered, url.searchParams));
    }

    if (request.method === 'GET' && url.pathname.startsWith('/tokens/')) {
        const key = decodeURIComponent(url.pathname.slice('/tokens/'.length));
        const token = tokens.find((item) => item.slug === key || item.id === key);
        return token ? success(response, token) : failure(response, 404, 'Token lokal tidak ditemukan.');
    }

    if (request.method === 'POST' && url.pathname === '/messages') {
        const message = await readJson(request);
        console.log(`[local fixture] Pesan kontak diterima dari ${message.name || 'anonim'}; tidak dikirim ke production.`);
        return success(response, { id: `local-message-${Date.now()}`, ...message, createdAt: new Date().toISOString() }, 201);
    }

    return failure(response, 404, 'Endpoint fixture lokal tidak ditemukan.');
});

server.listen(PORT, HOST, () => {
    console.log(`API fixture lokal aktif di http://${HOST}:${PORT}`);
    console.log('Semua data berlabel LOCAL TEST dan tidak menyentuh production.');
});
