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

import { SCREENING_DATA } from '../data/screening';

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
];

const MOCK_TOKENS: TokenDetail[] = SCREENING_DATA;

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
export async function getToken(slug: string): Promise<any> {
    await delay();

    const token = MOCK_TOKENS.find((t) => t.slug === slug) ?? null;

    if (!token) {
        return {
            data: undefined,
            error: {
                success: false,
                message: 'Token not found',
            }
        }
    }

    return {
        data: {
            success: true,
            message: 'Token found (mock)',
            data: token,
        },
        error: undefined,
    };
}

/**
 * Mock: Fetch token price quotes
 */
export async function getTokenQuotes(slugs: string | string[]): Promise<any> {
    await delay();

    const requestedSlugs = Array.isArray(slugs) ? slugs : [slugs];

    return {
        data: {
            success: true,
            message: 'Token quotes fetched (mock)',
            data: requestedSlugs.map((slug) => (
                {
                    slug,
                    rank: 1,
                    infiniteSupply: false,
                    maxSupply: 21000000,
                    circulatingSupply: 19500000,
                    priceUsd: 0,
                    marketCapUsd: 0,
                    marketCapDominance: 0,
                    percentChange24h: 0,
                }
            )),
        },
        error: undefined,
    };
}

/**
 * Mock: Send a contact/feedback message
 */
export async function sendMessage(message: { name: string; email: string; message: string }): Promise<any> {
    await delay();

    return {
        data: {
            success: true,
            message: 'Message sent successfully (mock)',
            data: {
                id: 'mock-msg-' + Date.now(),
                name: message.name,
                email: message.email,
                message: message.message,
                createdAt: new Date().toISOString(),
            },
        },
        error: undefined,
    };
}

// =============================================================================
// Mock Auth Functions
// =============================================================================

export async function signIn(credentials: any): Promise<any> {
    await delay();

    if (credentials.email === 'admin@cryptosharia.id' && credentials.password === 'password') {
        return {
            data: {
                success: true,
                message: 'Login successful (mock)',
                data: {
                    user: {
                        id: 'mock-user-1',
                        name: 'Naufal Nabila (Mock)',
                        email: 'admin@cryptosharia.id',
                        role: 'admin',
                    },
                    access_token: 'mock-access-token-12345',
                    refresh_token: 'mock-refresh-token-67890',
                }
            },
            error: undefined
        };
    }

    return {
        data: undefined,
        error: {
            success: false,
            message: 'Invalid credentials',
        }
    };
}

export async function signOut(token: string): Promise<any> {
    await delay();
    return {
        data: { success: true, message: 'Signed out (mock)' },
        error: undefined
    };
}

export async function getMe(token: string): Promise<any> {
    await delay();
    
    if (token !== 'mock-access-token-12345') {
        return {
            data: undefined,
            error: { success: false, message: 'Unauthorized' }
        };
    }

    return {
        data: {
            success: true,
            data: {
                id: 'mock-user-1',
                name: 'Naufal Nabila (Mock)',
                email: 'admin@cryptosharia.id',
                role: 'admin',
                avatar: null,
            }
        },
        error: undefined
    };
}
