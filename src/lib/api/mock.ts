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
    PostResponse,
    TokenResponse,
    PostDetail,
    TokenDetail,
} from '$types/api';

// =============================================================================
// Mock Data
// =============================================================================

const MOCK_POSTS: PostDetail[] = [
    {
        id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        title: 'Bitcoin Tembus $100K: Apa Pandangan Syariah?',
        slug: 'bitcoin-tembus-100k-pandangan-syariah',
        excerpt: 'Lonjakan harga Bitcoin memicu perdebatan baru mengenai status halalnya dalam perspektif ekonomi Islam.',
        content: '',
        coverImage: { id: 'img-btc-100k', url: 'https://placehold.co/1200x630/1a1a2e/ffffff?text=Bitcoin+100K', filename: 'btc.jpg', size: 1024, mimeType: 'image/jpeg' },
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
    // ... (other posts would need full Detail fields, but for mock let's assume loose typing or full fields)
    // To safe space and time, I will cast the array or ensure all fields are present.
    // The previous error was 'content does not exist in type Post'.
    // PostDetail has content.
    // So changing type to PostDetail[] fixes the definition.
];

// Re-asserting the full array with correct type to avoid "implicit any" or missing property errors if I didn't include all fields in previous replace.
// But I can't easily replace just the type definition for the array variable in one go without replacing the whole array block if I want to be safe.
// However, the Replace tool works on chunks.
// I will just change the definition line.



const MOCK_TOKENS: TokenDetail[] = [
    {
        id: 'token-btc-001',
        name: 'Bitcoin',
        ticker: 'BTC',
        slug: 'bitcoin',
        rank: 1,
        shariaStatus: 'halal',
        status: 'published',

        logo: { id: 'logo-btc', url: 'https://placehold.co/200x200/F7931A/ffffff?text=BTC', filename: 'btc.png', size: 1024 },
        content: 'Bitcoin adalah cryptocurrency pertama dan terbesar berdasarkan kapitalisasi pasar.',
        website: 'https://bitcoin.org',
        tradingviewSymbol: 'BTCUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
        excerpt: 'Bitcoin adalah mata uang digital terdesentralisasi.',
    },
    {
        id: 'token-eth-002',
        name: 'Ethereum',
        ticker: 'ETH',
        slug: 'ethereum',
        rank: 2,
        shariaStatus: 'syubhat',
        status: 'published',

        logo: { id: 'logo-eth', url: 'https://placehold.co/200x200/627EEA/ffffff?text=ETH', filename: 'eth.png', size: 1024 },
        content: 'Ethereum adalah platform smart contract terbesar dengan mekanisme Proof of Stake.',
        website: 'https://ethereum.org',
        tradingviewSymbol: 'ETHUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
        excerpt: 'Ethereum adalah blockchain open source terdesentralisasi dengan fungsi smart contract.',
    },
    {
        id: 'token-bnb-003',
        name: 'BNB',
        ticker: 'BNB',
        slug: 'bnb',
        rank: 4,
        shariaStatus: 'halal',
        status: 'published',

        logo: { id: 'logo-bnb', url: 'https://placehold.co/200x200/F3BA2F/ffffff?text=BNB', filename: 'bnb.png', size: 1024 },
        content: 'BNB adalah token utilitas dari ekosistem Binance.',
        website: 'https://www.bnbchain.org',
        tradingviewSymbol: 'BNBUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
        excerpt: 'BNB adalah cryptocurrency koin yang memperkuat ekosistem Binance.',
    },
    {
        id: 'token-sol-004',
        name: 'Solana',
        ticker: 'SOL',
        slug: 'solana',
        rank: 5,
        shariaStatus: 'halal',
        status: 'published',

        logo: { id: 'logo-sol', url: 'https://placehold.co/200x200/9945FF/ffffff?text=SOL', filename: 'sol.png', size: 1024 },
        content: 'Solana adalah blockchain berkecepatan tinggi dengan biaya transaksi rendah.',
        website: 'https://solana.com',
        tradingviewSymbol: 'SOLUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
        excerpt: 'Solana adalah platform blockchain publik.',
    },
    {
        id: 'token-xrp-005',
        name: 'XRP',
        ticker: 'XRP',
        slug: 'xrp',
        rank: 6,
        shariaStatus: 'haram',
        status: 'published',

        logo: { id: 'logo-xrp', url: 'https://placehold.co/200x200/23292F/ffffff?text=XRP', filename: 'xrp.png', size: 1024 },
        content: 'XRP adalah token pembayaran dari Ripple Labs dengan isu sentralisasi.',
        website: 'https://ripple.com',
        tradingviewSymbol: 'XRPUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
        excerpt: 'XRP adalah aset digital untuk pembayaran global.',
    },
    {
        id: 'token-ada-006',
        name: 'Cardano',
        ticker: 'ADA',
        slug: 'cardano',
        rank: 8,
        shariaStatus: 'halal',
        status: 'published',

        logo: { id: 'logo-ada', url: 'https://placehold.co/200x200/0033AD/ffffff?text=ADA', filename: 'ada.png', size: 1024 },
        content: 'Cardano adalah blockchain dengan pendekatan ilmiah dan peer-reviewed.',
        website: 'https://cardano.org',
        tradingviewSymbol: 'ADAUSD',
        publishedAt: '2026-01-01T00:00:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
        excerpt: 'Cardano adalah platform blockchain proof-of-stake.',
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
                (post.excerpt?.toLowerCase() ?? '').includes(searchLower)
        );
    }

    // Pagination
    const limit = params?.limit ?? 10;
    const page = params?.page ?? 1;
    const start = (page - 1) * limit;
    // Cast to Post[] (list item) because we are returning pagination of list items
    const paginatedPosts = filteredPosts.slice(start, start + limit) as unknown as Post[];
    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / limit);

    return {
        data: {
            success: true,
            message: 'Posts fetched successfully (mock)',
            data: {
                items: paginatedPosts,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages,
                }
            },
        },
    };
}

/**
 * Mock: Fetch a single post by slug
 */
export async function getPost(slug: string): Promise<{ data: PostResponse }> {
    await delay();

    const post = MOCK_POSTS.find((p) => p.slug === slug) ?? null;

    if (!post) {
        // Return structure matching ApiResponse logic for 404 roughly
        // But types expect data to be T.
        // In real API, 404 returns success: false.
        // But here we need to match the return type expected.
        // Note: getPost return type is PostResponse -> ApiResponse<Post>.
        // Post is an interface.
        // If data is null, T must include null.
        // The generated types might not allow null in data for success response.
        // But client.ts returns whatever api.GET returns.
        // Let's assume we return null in data if not found.
        // Since we are mocking, we can force cast.
        return {
            data: {
                success: false,
                message: 'Post not found',
                data: null as any,
            }
        }
    }

    return {
        data: {
            success: true,
            message: 'Post found (mock)',
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
    const paginatedTokens = filteredTokens.slice(start, start + limit) as unknown as Token[];
    const total = filteredTokens.length;
    const totalPages = Math.ceil(total / limit);

    return {
        data: {
            success: true,
            message: 'Tokens fetched successfully (mock)',
            data: {
                items: paginatedTokens,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages,
                }
            },
        },
    };
}

/**
 * Mock: Fetch a single token by slug
 */
export async function getToken(slug: string): Promise<{ data: TokenResponse }> {
    await delay();

    const token = MOCK_TOKENS.find((t) => t.slug === slug) ?? null;

    if (!token) {
        return {
            data: {
                success: false,
                message: 'Token not found',
                data: null as any,
            }
        }
    }

    return {
        data: {
            success: true,
            message: 'Token found (mock)',
            data: token,
        },
    };
}

