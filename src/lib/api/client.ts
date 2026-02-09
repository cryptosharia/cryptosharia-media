/**
 * CryptoSharia API Client (Server-Side Only)
 * Using openapi-fetch for type-safe API calls
 * 
 * ⚠️ This module uses private environment variables and must only be imported
 * from server-side code (+page.server.ts, +server.ts, hooks.server.ts)
 */

import createClient from 'openapi-fetch';
import { API_KEY } from '$env/static/private';
import type {
    Post,
    Token,
    TokenQuote,
    Message,
    PostsResponse,
    PostResponse,
    TokensResponse,
    TokenResponse,
    ListPostsParams,
    ListTokensParams,
    InsertMessage,
    ApiResponse,
} from '$types/api';

// =============================================================================
// Configuration
// =============================================================================

const API_BASE_URL = 'https://preview.api.cryptosharia.id';

// =============================================================================
// API Path Definitions (for openapi-fetch typing)
// =============================================================================

/**
 * API paths definition for type inference
 * This provides autocomplete and type checking for all endpoints
 */
export interface ApiPaths {
    '/posts': {
        get: {
            parameters: {
                query?: ListPostsParams;
            };
            responses: {
                200: PostsResponse;
            };
        };
    };
    '/posts/{slug}': {
        get: {
            parameters: {
                path: {
                    slug: string;
                };
            };
            responses: {
                200: PostResponse;
            };
        };
    };
    '/posts/count': {
        get: {
            parameters: {
                query?: Pick<ListPostsParams, 'sections' | 'types' | 'search'>;
            };
            responses: {
                200: ApiResponse<number>;
            };
        };
    };
    '/tokens': {
        get: {
            parameters: {
                query?: ListTokensParams;
            };
            responses: {
                200: TokensResponse;
            };
        };
    };
    '/tokens/{slug}': {
        get: {
            parameters: {
                path: {
                    slug: string;
                };
            };
            responses: {
                200: TokenResponse;
            };
        };
    };
    '/tokens/count': {
        get: {
            parameters: {
                query?: Pick<ListTokensParams, 'shariaStatuses' | 'search'>;
            };
            responses: {
                200: ApiResponse<number>;
            };
        };
    };
    '/tokens/{slug}/quotes': {
        get: {
            parameters: {
                path: {
                    slug: string;
                };
            };
            responses: {
                200: ApiResponse<TokenQuote>;
            };
        };
    };
    '/messages': {
        get: {
            responses: {
                200: ApiResponse<Message[]>;
            };
        };
        post: {
            requestBody: {
                content: {
                    'application/json': InsertMessage;
                };
            };
            responses: {
                200: ApiResponse<Message>;
            };
        };
    };
}

// =============================================================================
// Server-Side Guard
// =============================================================================

if (typeof window !== 'undefined') {
    throw new Error(
        'API client can only be used on the server. ' +
        'Import this module only from +page.server.ts, +server.ts, or hooks.server.ts'
    );
}

// =============================================================================
// Client Instance
// =============================================================================

/**
 * Pre-configured API client instance with authentication
 * Usage:
 *   const { data, error } = await api.GET('/posts', { params: { query: { limit: 10 } } });
 */
export const api = createClient<ApiPaths>({
    baseUrl: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Api-Key': API_KEY,
    },
});

// =============================================================================
// Convenience Functions
// =============================================================================

/**
 * Fetch posts with optional filters
 */
export async function getPosts(params?: ListPostsParams) {
    return api.GET('/posts', {
        params: { query: params },
    });
}

/**
 * Fetch a single post by slug
 */
export async function getPost(slug: string) {
    return api.GET('/posts/{slug}', {
        params: { path: { slug } },
    });
}

/**
 * Fetch tokens with optional filters
 */
export async function getTokens(params?: ListTokensParams) {
    return api.GET('/tokens', {
        params: { query: params },
    });
}

/**
 * Fetch a single token by slug
 */
export async function getToken(slug: string) {
    return api.GET('/tokens/{slug}', {
        params: { path: { slug } },
    });
}

/**
 * Fetch token price quotes
 */
export async function getTokenQuotes(slug: string) {
    return api.GET('/tokens/{slug}/quotes', {
        params: { path: { slug } },
    });
}

/**
 * Send a contact/feedback message
 */
export async function sendMessage(message: InsertMessage) {
    return api.POST('/messages', {
        body: message,
    });
}

// =============================================================================
// Export Types
// =============================================================================

export { API_BASE_URL };

