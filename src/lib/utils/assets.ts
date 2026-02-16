/**
 * Asset URL Utilities
 * Helper functions for constructing asset/media URLs
 */

// =============================================================================
// Configuration
// =============================================================================

/**
 * Base URL for asset files
 * Change this if the asset endpoint differs from the API
 */
const ASSETS_BASE_URL = 'https://preview.api.cryptosharia.id';

/**
 * Asset path prefix (e.g., '/assets', '/files', '/uploads')
 * Adjust based on your API's asset routing
 */
const ASSETS_PATH = '/assets';

/**
 * Default placeholder image URL
 * Used when no asset ID is provided
 */
const DEFAULT_PLACEHOLDER = 'https://placehold.co/600x400/1a1a2e/ffffff?text=No+Image';

// =============================================================================
// Asset URL Functions
// =============================================================================

/**
 * Construct full URL for an asset by its ID
 *
 * @param id - The asset UUID, or null/undefined for placeholder
 * @returns Full URL to the asset, or placeholder if id is null
 *
 * @example
 * // With valid ID
 * getAssetUrl('abc123') // => 'https://preview.api.cryptosharia.id/assets/abc123'
 *
 * // With null/undefined
 * getAssetUrl(null) // => placeholder image URL
 */
export function getAssetUrl(id: string | null | undefined): string {
    if (!id) {
        return DEFAULT_PLACEHOLDER;
    }
    return `${ASSETS_BASE_URL}${ASSETS_PATH}/${id}`;
}

/**
 * Get asset URL with custom placeholder
 *
 * @param id - The asset UUID
 * @param placeholder - Custom placeholder URL to use if id is null
 */
export function getAssetUrlWithFallback(
    id: string | null | undefined,
    placeholder: string
): string {
    if (!id) {
        return placeholder;
    }
    return `${ASSETS_BASE_URL}${ASSETS_PATH}/${id}`;
}

// =============================================================================
// Specialized Asset Helpers
// =============================================================================

/**
 * Get cover image URL for a post
 * Uses a content-appropriate placeholder
 */
export function getPostCoverUrl(coverImageId: string | null | undefined): string {
    return getAssetUrlWithFallback(
        coverImageId,
        'https://placehold.co/1200x630/1a1a2e/ffffff?text=CryptoSharia'
    );
}

/**
 * Get logo URL for a token
 * Uses a crypto-themed placeholder
 */
export function getTokenLogoUrl(logo: { filename?: string; id?: string } | string | null | undefined): string {
    if (typeof logo === 'object' && logo?.filename) {
        return `/logos/${logo.filename}`;
    }

    const logoId = typeof logo === 'string' ? logo : logo?.id;

    return getAssetUrlWithFallback(
        logoId,
        'https://placehold.co/200x200/1a1a2e/ffffff?text=Token'
    );
}

// =============================================================================
// Configuration Helpers (for runtime customization)
// =============================================================================

/**
 * Create a custom asset URL builder with different base URL
 * Useful for different environments (staging, production)
 */
export function createAssetUrlBuilder(baseUrl: string, path: string = '/assets') {
    return function (id: string | null | undefined, placeholder?: string): string {
        if (!id) {
            return placeholder ?? DEFAULT_PLACEHOLDER;
        }
        return `${baseUrl}${path}/${id}`;
    };
}

// =============================================================================
// Exports
// =============================================================================

export { ASSETS_BASE_URL, ASSETS_PATH, DEFAULT_PLACEHOLDER };
