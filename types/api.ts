/**
 * CryptoSharia API TypeScript Types
 * Generated from: https://preview.api.cryptosharia.id/openapi.json
 * Generated on: 2026-02-09
 */

// ============================================================================
// Enums
// ============================================================================

export type PostSection = 'news' | 'education' | 'research' | 'activity';

export type PostType = 'article' | 'webinar' | 'video' | 'headline';

export type PostStatus = 'draft' | 'published' | 'archived';

export type ShariaStatus = 'halal' | 'haram' | 'syubhat';

export type TokenStatus = 'draft' | 'published' | 'archived';

// ============================================================================
// Core Models
// ============================================================================

/**
 * Post model representing content items like articles, webinars, videos, and headlines
 */
export interface Post {
  /** UUID */
  id: string;
  /** Title of the post (max 255 chars) */
  title: string;
  /** URL-friendly slug (max 255 chars) */
  slug: string;
  /** Short summary/excerpt */
  excerpt: string | null;
  /** Full post content */
  content: string | null;
  /** UUID reference to cover image */
  coverImageId: string | null;
  /** Content section category */
  section: PostSection;
  /** Content type */
  type: PostType;
  /** Publication status */
  status: PostStatus;
  /** Whether the post is featured */
  isFeatured: boolean;
  /** Event date for webinars/activities (ISO 8601) */
  eventDate: string | null;
  /** External URL if applicable */
  externalLink: string | null;
  /** Publication timestamp (ISO 8601) */
  publishedAt: string | null;
  /** Creation timestamp (ISO 8601) */
  createdAt: string;
  /** Last update timestamp (ISO 8601) */
  updatedAt: string | null;
  /** UUID of the creator */
  createdBy: string | null;
  /** UUID of the last updater */
  updatedBy: string | null;
}

/**
 * Token model representing cryptocurrency tokens with sharia compliance status
 */
export interface Token {
  /** UUID */
  id: string;
  /** Full name of the token (max 100 chars) */
  name: string;
  /** Trading symbol/ticker (max 20 chars) */
  ticker: string;
  /** URL-friendly slug (max 100 chars) */
  slug: string;
  /** Market rank */
  rank: number | null;
  /** Sharia compliance status */
  shariaStatus: ShariaStatus;
  /** Publication status */
  status: TokenStatus;
  /** Brand color in hex format (max 7 chars, e.g., "#FF0000") */
  brandColorHex: string | null;
  /** UUID reference to token logo */
  logoId: string | null;
  /** Token description/analysis content */
  content: string | null;
  /** Official website URL */
  website: string | null;
  /** TradingView chart symbol (max 64 chars) */
  tradingviewSymbol: string | null;
  /** Publication timestamp (ISO 8601) */
  publishedAt: string | null;
  /** Creation timestamp (ISO 8601) */
  createdAt: string;
  /** Last update timestamp (ISO 8601) */
  updatedAt: string | null;
  /** UUID of the creator */
  createdBy: string | null;
  /** UUID of the last updater */
  updatedBy: string | null;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  /** Indicates if the request was successful */
  success: boolean;
  /** Response message or description */
  message: string;
  /** The actual data payload */
  data: T;
  /** Optional field-level error messages */
  errors?: Record<string, string[]>;
}

/**
 * Paginated list response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  data: T[];
}

// ============================================================================
// Query Parameter Types
// ============================================================================

/**
 * Query parameters for the List Posts endpoint
 * GET /posts
 */
export interface ListPostsParams {
  /** Filter by content sections */
  sections?: PostSection[];
  /** Filter by content types */
  types?: PostType[];
  /** Filter by specific slugs */
  slugs?: string[];
  /** Search query string */
  search?: string;
  /** Number of results (min: 1, max: 100, default: 10) */
  limit?: number;
  /** Page number (min: 1, default: 1) */
  page?: number;
  /** Slugs to exclude from results */
  exclude?: string[];
}

/**
 * Query parameters for the List Tokens endpoint
 * GET /tokens
 */
export interface ListTokensParams {
  /** Filter by sharia compliance statuses */
  shariaStatuses?: ShariaStatus[];
  /** Filter by specific slugs */
  slugs?: string[];
  /** Search query string */
  search?: string;
  /** Number of results (min: 1, max: 100, default: 10) */
  limit?: number;
  /** Page number (min: 1, default: 1) */
  page?: number;
  /** Slugs to exclude from results */
  exclude?: string[];
}

// ============================================================================
// API Response Aliases (for convenience)
// ============================================================================

/** Response type for GET /posts */
export type PostsResponse = PaginatedResponse<Post>;

/** Response type for GET /posts/:slug (single post) */
export type PostResponse = ApiResponse<Post>;

/** Response type for GET /tokens */
export type TokensResponse = PaginatedResponse<Token>;

/** Response type for GET /tokens/:slug (single token) */
export type TokenResponse = ApiResponse<Token>;

// ============================================================================
// Additional Models (from API docs sidebar)
// ============================================================================

/**
 * Token quote/price information
 */
export interface TokenQuote {
  id: string;
  tokenId: string;
  price: number;
  priceChange24h: number | null;
  priceChangePercentage24h: number | null;
  marketCap: number | null;
  volume24h: number | null;
  circulatingSupply: number | null;
  totalSupply: number | null;
  maxSupply: number | null;
  fetchedAt: string;
  createdAt: string;
}

/**
 * Message model (for contact/feedback)
 */
export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string | null;
}

/**
 * Insert message request body
 * POST /messages
 */
export interface InsertMessage {
  name: string;
  email: string;
  subject?: string;
  content: string;
}
