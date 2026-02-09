/**
 * CryptoSharia API - Unified Export
 * 
 * Automatically switches between mock and real API based on environment variable.
 * Set PUBLIC_USE_MOCK_API=true in .env to use mock data during development.
 */

import { env } from '$env/dynamic/public';

// Determine which client to use based on environment
const USE_MOCK = env.PUBLIC_USE_MOCK_API === 'true';

// Conditionally export from mock or real client
export const { getPosts, getPost, getTokens, getToken } = USE_MOCK
    ? await import('./mock')
    : await import('./client');

// Re-export useful utilities
export { getAssetUrl, getPostCoverUrl, getTokenLogoUrl } from '../utils/assets';

// Export flag for debugging
export const isMockMode = USE_MOCK;
