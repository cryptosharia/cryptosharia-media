/**
 * CryptoSharia API TypeScript Types
 * Wrapper around generated openapi-typescript types
 */

import type { components } from '../src/lib/api/api';

// ============================================================================
// Core Models from OpenAPI
// ============================================================================

export type Post = components['schemas']['PostsGetItem'];
export type PostDetail = components['schemas']['PostsGetData'];
export type Token = components['schemas']['TokensGetItem'];
export type TokenDetail = components['schemas']['TokensGetData'] & {
  category?: string;
  excerpt?: string;
};
export type TokenQuote = components['schemas']['TokensQuotesGetItem'];
export type Message = components['schemas']['MessagesGetItem'];
export type InsertMessage = components['schemas']['MessagesPostBody'];
export type AssetMetadata = components['schemas']['AssetMetadata'];
export type Pagination = components['schemas']['Pagination'];

// ============================================================================
// API Response Types
// ============================================================================

export type ApiResponse<T> = components['schemas']['ApiResponse'] & {
  data: T;
};

// Typedef for the data part of a paginated response
export interface PaginatedData<T> {
  items: T[];
  pagination: Pagination;
}

// ============================================================================
// API Response Aliases (Full Response Body)
// ============================================================================

/** Response type for GET /posts */
export type PostsResponse = ApiResponse<components['schemas']['PaginatedPostsGetItem']>;

/** Response type for GET /posts/:slug (single post) */
export type PostResponse = ApiResponse<components['schemas']['PostsGetData']>;

/** Response type for GET /tokens */
export type TokensResponse = ApiResponse<components['schemas']['PaginatedTokensGetItem']>;

/** Response type for GET /tokens/:slug (single token) */
export type TokenResponse = ApiResponse<components['schemas']['TokensGetData']>;

// ============================================================================
// Query Parameter Types
// ============================================================================

// We need to extract these from paths
import type { paths } from '../src/lib/api/api';

export type ListPostsParams = paths['/posts']['get']['parameters']['query'];
export type ListTokensParams = paths['/tokens']['get']['parameters']['query'];

