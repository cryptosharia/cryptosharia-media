/**
 * CryptoSharia Mock API Client
 * For development when real API is unavailable
 */

import type {
    Post,
    Token,
    PostsResponse,
    TokensResponse,
    ListPostsParams,
    ListTokensParams,
} from '$types/api';

// =============================================================================
// Mock Data
// =============================================================================

const MOCK_POSTS: Post[] = [
    {
        id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        title: 'Bitcoin Tembus $100K: Apa Pandangan Syariah?',
        slug: 'bitcoin-tembus-100k-pandangan-syariah',
        excerpt: 'Lonjakan harga Bitcoin memicu perdebatan baru mengenai status halalnya dalam perspektif ekonomi Islam.',
        content: null,
        coverImageId: null,
        section: 'news',
        type: 'article',
        status: 'published',
        isFeatured: true,
        eventDate: null,
        externalLink: null,
        publishedAt: '2026-02-08T10:00:00Z',
        createdAt: '2026-02-08T09:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
        title: 'Regulasi Crypto Indonesia 2026: Update Terbaru',
        slug: 'regulasi-crypto-indonesia-2026',
        excerpt: 'Bappebti mengeluarkan aturan baru yang mengatur perdagangan aset kripto di Indonesia.',
        content: null,
        coverImageId: null,
        section: 'news',
        type: 'article',
        status: 'published',
        isFeatured: false,
        eventDate: null,
        externalLink: null,
        publishedAt: '2026-02-07T14:30:00Z',
        createdAt: '2026-02-07T12:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
        title: 'Memahami Smart Contract dalam Perspektif Fiqh Muamalah',
        slug: 'smart-contract-fiqh-muamalah',
        excerpt: 'Artikel edukatif menjelaskan konsep smart contract dan bagaimana Islam memandangnya.',
        content: null,
        coverImageId: null,
        section: 'education',
        type: 'article',
        status: 'published',
        isFeatured: false,
        eventDate: null,
        externalLink: null,
        publishedAt: '2026-02-06T08:00:00Z',
        createdAt: '2026-02-06T07:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
        title: 'Staking vs Lending: Mana yang Halal?',
        slug: 'staking-vs-lending-halal',
        excerpt: 'Perbandingan mendalam antara staking dan lending dalam konteks kehalalan.',
        content: null,
        coverImageId: null,
        section: 'education',
        type: 'article',
        status: 'published',
        isFeatured: false,
        eventDate: null,
        externalLink: null,
        publishedAt: '2026-02-05T11:00:00Z',
        createdAt: '2026-02-05T10:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
        title: 'Webinar: Crypto Halal Summit 2026',
        slug: 'webinar-crypto-halal-summit-2026',
        excerpt: 'Bergabunglah dalam diskusi tahunan terbesar tentang cryptocurrency dan syariah.',
        content: null,
        coverImageId: null,
        section: 'activity',
        type: 'webinar',
        status: 'published',
        isFeatured: true,
        eventDate: '2026-03-15T09:00:00Z',
        externalLink: 'https://cryptosharia.id/summit-2026',
        publishedAt: '2026-02-01T08:00:00Z',
        createdAt: '2026-02-01T07:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: '6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
        title: 'Analisis: Ethereum 2.0 dan Proof of Stake',
        slug: 'analisis-ethereum-pos',
        excerpt: 'Riset mendalam tentang mekanisme PoS Ethereum dan implikasinya terhadap status syariah.',
        content: null,
        coverImageId: null,
        section: 'research',
        type: 'article',
        status: 'published',
        isFeatured: false,
        eventDate: null,
        externalLink: null,
        publishedAt: '2026-02-04T15:00:00Z',
        createdAt: '2026-02-04T14:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
        title: 'Community Meetup Jakarta - Februari 2026',
        slug: 'community-meetup-jakarta-feb-2026',
        excerpt: 'Kopi darat komunitas CryptoSharia di Jakarta untuk networking dan diskusi.',
        content: null,
        coverImageId: null,
        section: 'activity',
        type: 'article',
        status: 'published',
        isFeatured: false,
        eventDate: '2026-02-20T14:00:00Z',
        externalLink: null,
        publishedAt: '2026-02-03T10:00:00Z',
        createdAt: '2026-02-03T09:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
];

const MOCK_TOKENS: Token[] = [
    {
        id: 'token-btc-001',
        name: 'Bitcoin',
        ticker: 'BTC',
        slug: 'bitcoin',
        rank: 1,
        shariaStatus: 'halal',
        status: 'published',
        brandColorHex: '#F7931A',
        logoId: null,
        content: 'Bitcoin adalah cryptocurrency pertama dan terbesar berdasarkan kapitalisasi pasar.',
        website: 'https://bitcoin.org',
        tradingviewSymbol: 'BTCUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: 'token-eth-002',
        name: 'Ethereum',
        ticker: 'ETH',
        slug: 'ethereum',
        rank: 2,
        shariaStatus: 'syubhat',
        status: 'published',
        brandColorHex: '#627EEA',
        logoId: null,
        content: 'Ethereum adalah platform smart contract terbesar dengan mekanisme Proof of Stake.',
        website: 'https://ethereum.org',
        tradingviewSymbol: 'ETHUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: 'token-bnb-003',
        name: 'BNB',
        ticker: 'BNB',
        slug: 'bnb',
        rank: 4,
        shariaStatus: 'halal',
        status: 'published',
        brandColorHex: '#F3BA2F',
        logoId: null,
        content: 'BNB adalah token utilitas dari ekosistem Binance.',
        website: 'https://www.bnbchain.org',
        tradingviewSymbol: 'BNBUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: 'token-sol-004',
        name: 'Solana',
        ticker: 'SOL',
        slug: 'solana',
        rank: 5,
        shariaStatus: 'halal',
        status: 'published',
        brandColorHex: '#9945FF',
        logoId: null,
        content: 'Solana adalah blockchain berkecepatan tinggi dengan biaya transaksi rendah.',
        website: 'https://solana.com',
        tradingviewSymbol: 'SOLUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: 'token-xrp-005',
        name: 'XRP',
        ticker: 'XRP',
        slug: 'xrp',
        rank: 6,
        shariaStatus: 'haram',
        status: 'published',
        brandColorHex: '#23292F',
        logoId: null,
        content: 'XRP adalah token pembayaran dari Ripple Labs dengan isu sentralisasi.',
        website: 'https://ripple.com',
        tradingviewSymbol: 'XRPUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    {
        id: 'token-ada-006',
        name: 'Cardano',
        ticker: 'ADA',
        slug: 'cardano',
        rank: 8,
        shariaStatus: 'halal',
        status: 'published',
        brandColorHex: '#0033AD',
        logoId: null,
        content: 'Cardano adalah blockchain dengan pendekatan ilmiah dan peer-reviewed.',
        website: 'https://cardano.org',
        tradingviewSymbol: 'ADAUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
];

// =============================================================================
// Mock API Functions
// =============================================================================

/**
 * Simulate network delay for realistic behavior
 */
function delay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock: Fetch posts with optional filters
 */
export async function getPosts(params?: ListPostsParams): Promise<{ data: PostsResponse }> {
    await delay();

    let filteredPosts = [...MOCK_POSTS];

    // Filter by sections
    if (params?.sections && params.sections.length > 0) {
        filteredPosts = filteredPosts.filter((post) =>
            params.sections!.includes(post.section as 'news' | 'education' | 'research' | 'activity')
        );
    }

    // Filter by types
    if (params?.types && params.types.length > 0) {
        filteredPosts = filteredPosts.filter((post) =>
            params.types!.includes(post.type as 'article' | 'webinar' | 'video' | 'headline')
        );
    }

    // Search
    if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredPosts = filteredPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchLower) ||
                post.excerpt?.toLowerCase().includes(searchLower)
        );
    }

    // Pagination
    const limit = params?.limit ?? 10;
    const page = params?.page ?? 1;
    const start = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(start, start + limit);

    return {
        data: {
            success: true,
            message: 'Posts fetched successfully (mock)',
            data: paginatedPosts,
        },
    };
}

/**
 * Mock: Fetch a single post by slug
 */
export async function getPost(slug: string): Promise<{ data: { success: boolean; message: string; data: Post | null } }> {
    await delay();

    const post = MOCK_POSTS.find((p) => p.slug === slug) ?? null;

    return {
        data: {
            success: post !== null,
            message: post ? 'Post found (mock)' : 'Post not found',
            data: post,
        },
    };
}

/**
 * Mock: Fetch tokens with optional filters
 */
export async function getTokens(params?: ListTokensParams): Promise<{ data: TokensResponse }> {
    await delay();

    let filteredTokens = [...MOCK_TOKENS];

    // Filter by sharia statuses
    if (params?.shariaStatuses && params.shariaStatuses.length > 0) {
        filteredTokens = filteredTokens.filter((token) =>
            params.shariaStatuses!.includes(token.shariaStatus as 'halal' | 'haram' | 'syubhat')
        );
    }

    // Search
    if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredTokens = filteredTokens.filter(
            (token) =>
                token.name.toLowerCase().includes(searchLower) ||
                token.ticker.toLowerCase().includes(searchLower)
        );
    }

    // Pagination
    const limit = params?.limit ?? 10;
    const page = params?.page ?? 1;
    const start = (page - 1) * limit;
    const paginatedTokens = filteredTokens.slice(start, start + limit);

    return {
        data: {
            success: true,
            message: 'Tokens fetched successfully (mock)',
            data: paginatedTokens,
        },
    };
}

/**
 * Mock: Fetch a single token by slug
 */
export async function getToken(slug: string): Promise<{ data: { success: boolean; message: string; data: Token | null } }> {
    await delay();

    const token = MOCK_TOKENS.find((t) => t.slug === slug) ?? null;

    return {
        data: {
            success: token !== null,
            message: token ? 'Token found (mock)' : 'Token not found',
            data: token,
        },
    };
}
