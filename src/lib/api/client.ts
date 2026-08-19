import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type {
    ApiResponse,
    AuthSession,
    ListPostsParams,
    ListTokensParams,
    PaginatedData,
    Post,
    PostDetail,
    Token,
    TokenDetail,
    TokenQuote,
    ContentCategory,
    ContentTag,
    ListTagsParams,
    User
} from '$types/api';

const API_BASE_URL = (publicEnv.PUBLIC_CS_API_URL || 'https://api.cryptosharia.id').replace(/\/$/, '');

type ApiError = { message: string; status: number; details?: unknown };
type ApiResult<T> = {
    data?: ApiResponse<T>;
    error?: ApiError;
    response: { status: number };
};

function toQuery(params: Record<string, unknown> | undefined) {
    const query = new URLSearchParams();
    if (!params) return query;

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null || value === '') continue;
        query.set(key, Array.isArray(value) ? value.join(',') : String(value));
    }
    return query;
}

async function apiRequest<T>(
    path: string,
    options: RequestInit & { query?: Record<string, unknown> } = {}
): Promise<ApiResult<T>> {
    const query = toQuery(options.query);
    const url = `${API_BASE_URL}${path}${query.size ? `?${query}` : ''}`;
    const headers = new Headers(options.headers);
    headers.set('Api-Key', privateEnv.CS_API_KEY || '');
    if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');

    try {
        const response = await fetch(url, { ...options, headers });
        const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;

        if (!response.ok || !payload?.success) {
            const publicMessage =
                response.status === 401 || response.status === 403
                    ? 'Konten sedang tidak tersedia. Silakan coba lagi nanti.'
                    : payload?.message || 'Layanan CryptoSharia sedang tidak tersedia.';
            return {
                error: {
                    message: publicMessage,
                    status: response.status,
                    details: payload?.errors
                },
                response: { status: response.status }
            };
        }

        return { data: payload, response: { status: response.status } };
    } catch {
        return {
            error: { message: 'Tidak dapat terhubung ke layanan CryptoSharia.', status: 503 },
            response: { status: 503 }
        };
    }
}

function redactPost(post: Post): Post {
    const publicPost = { ...post, createdBy: null, updatedBy: null } as Post & { content?: unknown };
    delete publicPost.content;
    return publicPost;
}

function redactPostDetail(post: PostDetail): PostDetail {
    return { ...post, createdBy: null, updatedBy: null };
}

function redactToken(token: Token): Token {
    const publicToken = { ...token, createdBy: null, updatedBy: null } as Token & { content?: unknown };
    delete publicToken.content;
    return publicToken;
}

function redactTokenDetail(token: TokenDetail): TokenDetail {
    return { ...token, createdBy: null, updatedBy: null };
}

export async function getPosts(params: ListPostsParams = {}) {
    const result = await apiRequest<PaginatedData<Post>>('/posts', { query: params });
    if (result.data) {
        result.data.data.items = result.data.data.items.map(redactPost);
    }
    return result;
}

export async function getContentCategories(params: ListTagsParams = {}) {
    const result = await apiRequest<PaginatedData<ContentTag>>('/tags', { query: params });
    if (result.data) {
        result.data.data.items = result.data.data.items.map((tag) => ({ ...tag, createdBy: null, updatedBy: null }));
    }
    return result as ApiResult<PaginatedData<ContentCategory>>;
}

export async function getPost(slug: string) {
    const result = await apiRequest<PostDetail>(`/posts/${encodeURIComponent(slug)}`);
    if (result.data) result.data.data = redactPostDetail(result.data.data);
    return result;
}

export async function getTokens(params: ListTokensParams = {}) {
    const result = await apiRequest<PaginatedData<Token>>('/tokens', { query: params });
    if (result.data) {
        result.data.data.items = result.data.data.items.map(redactToken);
    }
    return result;
}

export async function getToken(slug: string) {
    const result = await apiRequest<TokenDetail>(`/tokens/${encodeURIComponent(slug)}`);
    if (result.data) result.data.data = redactTokenDetail(result.data.data);
    return result;
}

export function getTokenQuotes(slugs: string | string[]) {
    return apiRequest<TokenQuote[]>('/tokens/quotes', { query: { slugs: Array.isArray(slugs) ? slugs : [slugs] } });
}

export function sendMessage(message: { name: string; email: string; message: string }) {
    return apiRequest<{ id?: string }>('/messages', {
        method: 'POST',
        body: JSON.stringify(message)
    });
}

export function signIn(credentials: { email: string; password: string }) {
    return apiRequest<AuthSession>('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
}

export function refreshSession(refreshToken: string) {
    return apiRequest<AuthSession>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken })
    });
}

export function signOut(refreshToken: string) {
    return apiRequest<{ success: boolean }>('/auth/signout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken })
    });
}

export function getMe(token: string) {
    return apiRequest<User>('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
}

export { API_BASE_URL };
