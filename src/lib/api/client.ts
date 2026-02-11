/**
 * CryptoSharia API Client (Server-Side Only)
 * Using openapi-fetch for type-safe API calls
 * 
 * ⚠️ This module uses private environment variables and must only be imported
 * from server-side code (+page.server.ts, +server.ts, hooks.server.ts)
 */

import createClient from 'openapi-fetch';
import { API_KEY } from '$env/static/private';
import type { paths } from './api';

// =============================================================================
// Configuration
// =============================================================================

const API_BASE_URL = 'https://preview.api.cryptosharia.id';
const apiKey = import.meta.env.VITE_API_KEY || API_KEY;

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
export const api = createClient<paths>({
    baseUrl: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
    },
});

// =============================================================================
// Convenience Functions
// =============================================================================

/**
 * Fetch posts with optional filters
 */
export async function getPosts(params?: paths['/posts']['get']['parameters']['query']) {
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
export async function getTokens(params?: paths['/tokens']['get']['parameters']['query']) {
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
    // Note: The generated type for quotes params requires 'slugs' as query param array, 
    // but the function signature here takes a single slug string.
    // The previous implementation used path param /tokens/{slug}/quotes but check openapi spec.
    // Spec says: /tokens/quotes GET, query param: slugs (array[string])
    // The OLD client used /tokens/{slug}/quotes but that path DOES NOT EXIST in the new spec.
    // Let's check api.ts to see available paths.
    // For now, I will comment this out or adapt it based on api.ts content view which I am doing in parallel.
    // Wait, I should view api.ts first.
    // I will replace with a placeholder or just comment it out as it might break if path doesn't exist.
    // Actually, I can leave it for now if it's not used immediately, but better to fix it.
    // Let's assume GET /tokens/quotes with query param slugs=[slug].
    return api.GET('/tokens/quotes', {
        params: { query: { slugs: [slug] } },
    });
}

/**
 * Send a contact/feedback message
 */
export async function sendMessage(message: NonNullable<paths['/messages']['post']['requestBody']>['content']['application/json']) {
    return api.POST('/messages', {
        body: message,
    });
}

// =============================================================================
// Export Types
// =============================================================================

export { API_BASE_URL };

