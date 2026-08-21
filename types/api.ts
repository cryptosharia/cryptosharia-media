export type PostSection = 'news' | 'education' | 'research' | 'activity';
export type PostType = 'article' | 'webinar' | 'video' | 'headline';
export type PublishStatus = 'draft' | 'published' | 'archived';
export type ShariaStatus = 'halal' | 'haram' | 'syubhat';

export type AssetMetadata = {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimeType?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ContentTag = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  /** A non-null section makes this tag available in that section's navigation. */
  section: 'news' | 'education' | null;
};

export type ContentCategory = Pick<ContentTag, 'id' | 'name' | 'slug' | 'section'> & { label: string };

export type UserMetadata = {
  id: string;
  name: string;
  email: string;
} | null;

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  section: PostSection;
  type: PostType;
  status: PublishStatus;
  isFeatured: boolean;
  eventDate: string | null;
  externalLink: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  createdBy: UserMetadata;
  updatedBy: UserMetadata;
  coverImage: AssetMetadata;
  tags?: ContentTag[];
};

export type PostDetail = Post & { content: string };

export type Token = {
  id: string;
  slug: string;
  /** @deprecated Only retained for bundled legacy mock data; use quote.rank from API v2. */
  rank?: number;
  name: string;
  ticker: string;
  shariaStatus: ShariaStatus;
  status: PublishStatus;
  excerpt: string;
  tradingviewSymbol: string | null;
  website: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  createdBy: UserMetadata;
  updatedBy: UserMetadata;
  logo: AssetMetadata | null;
  quote?: TokenQuote | null;
  tags?: ContentTag[];
};

export type TokenDetail = Token & { content: string; category?: string };

export type TokenQuote = {
  slug: string;
  rank: number;
  infiniteSupply: boolean;
  maxSupply: number | null;
  circulatingSupply: number;
  priceUsd: number;
  marketCapUsd: number;
  marketCapDominance: number;
  percentChange24h: number;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedData<T> = { items: T[]; pagination: Pagination };
export type ApiResponse<T> = { success: boolean; message: string; data: T; errors?: unknown };
export type PostsResponse = ApiResponse<PaginatedData<Post>>;
export type PostResponse = ApiResponse<PostDetail>;
export type TokensResponse = ApiResponse<PaginatedData<Token>>;
export type TokenResponse = ApiResponse<TokenDetail>;

export type ListPostsParams = {
  statuses?: PublishStatus[];
  sections?: PostSection[];
  types?: PostType[];
  slugs?: string[];
  exclude?: string[];
  tags?: string[];
  search?: string;
  limit?: number;
  page?: number;
};

export type ListTokensParams = {
  statuses?: PublishStatus[];
  shariaStatuses?: ShariaStatus[];
  slugs?: string[];
  exclude?: string[];
  tags?: string[];
  search?: string;
  limit?: number;
  page?: number;
  quote?: boolean;
};

export type ListTagsParams = {
  sections?: Array<'news' | 'education'>;
  slugs?: string[];
  search?: string;
  limit?: number;
  page?: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  avatar?: string | null;
  permissions?: string[];
  role?: string | { id: string; name: string; slug: string } | null;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
};
