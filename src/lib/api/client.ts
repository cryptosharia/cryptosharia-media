import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { getRequestEvent } from '$app/server';
import type {
    ApiResponse,
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
    response: { status: number; totalItems?: number };
};

function toQuery(params: Record<string, unknown> | undefined) {
    const query = new URLSearchParams();
    if (!params) return query;

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null || value === '') continue;
        if (Array.isArray(value)) {
            for (const item of value) {
                if (item === undefined || item === null || item === '') continue;
                query.append(key, String(item));
            }
            continue;
        }
        query.set(key, String(value));
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
    // Rate limiting must follow the visitor, rather than this SvelteKit BFF instance.
    headers.set('Forwarded', `for=${getRequestEvent().getClientAddress()}`);
    if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');

    try {
        const response = await fetch(url, { ...options, headers });
        const payload = (await response.json().catch(() => null)) as T | { message?: string; errors?: unknown } | null;

        if (!response.ok) {
            const publicMessage =
                response.status === 401 || response.status === 403
                    ? 'Konten sedang tidak tersedia. Silakan coba lagi nanti.'
                    : (payload as { message?: string } | null)?.message || 'Layanan CryptoSharia sedang tidak tersedia.';
            return {
                error: {
                    message: publicMessage,
                    status: response.status,
                    details: (payload as { errors?: unknown } | null)?.errors
                },
                response: { status: response.status }
            };
        }

        return {
            data: { success: true, message: 'OK', data: payload as T },
            response: {
                status: response.status,
                totalItems: Number.parseInt(response.headers.get('total-items') ?? '', 10) || undefined
            }
        };
    } catch {
        return {
            error: { message: 'Tidak dapat terhubung ke layanan CryptoSharia.', status: 503 },
            response: { status: 503 }
        };
    }
}

function paginatedResult<T>(result: ApiResult<T[]>, params: { page?: number; limit?: number }) {
    if (!result.data) return result as unknown as ApiResult<PaginatedData<T>>;

    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const total = result.response.totalItems ?? result.data.data.length;
    return {
        ...result,
        data: {
            ...result.data,
            data: { items: result.data.data, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } }
        }
    } as ApiResult<PaginatedData<T>>;
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
    const result = paginatedResult(await apiRequest<Post[]>('/posts', { query: params }), params);
    if (result.data) {
        result.data.data.items = result.data.data.items.map(redactPost);
    }
    return result;
}

export async function getContentCategories(params: ListTagsParams = {}) {
    const result = paginatedResult(await apiRequest<ContentTag[]>('/tags', { query: params }), params);
    if (result.data) {
        result.data.data.items = result.data.data.items.map((tag) => ({ ...tag, createdBy: null, updatedBy: null, label: tag.name }));
    }
    return result as ApiResult<PaginatedData<ContentCategory>>;
}

export async function getPost(slug: string) {
    const result = await apiRequest<PostDetail>(`/posts/${encodeURIComponent(slug)}`);
    if (result.data) result.data.data = redactPostDetail(result.data.data);
    return result;
}

export async function getTokens(params: ListTokensParams = {}) {
    const result = paginatedResult(await apiRequest<Token[]>('/cryptoassets', { query: params }), params);
    if (result.data) {
        result.data.data.items = result.data.data.items.map(redactToken);
    }
    return result;
}

export async function getToken(slug: string, options: { quote?: boolean } = {}) {
    const result = await apiRequest<TokenDetail>(`/cryptoassets/${encodeURIComponent(slug)}`, { query: options });
    if (result.data) result.data.data = redactTokenDetail(result.data.data);
    return result;
}

export async function getTokenQuotes(slugs: string | string[]) {
    const result = await getTokens({ slugs: Array.isArray(slugs) ? slugs : [slugs], quote: true });
    if (result.data) {
        const quotes = result.data.data.items.flatMap((token) => (token.quote ? [token.quote] : []));
        return { ...result, data: { ...result.data, data: quotes } } as ApiResult<TokenQuote[]>;
    }
    return result as unknown as ApiResult<TokenQuote[]>;
}

export function sendMessage(message: { name: string; email: string; message: string }) {
    return apiRequest<{ id?: string }>('/messages', {
        method: 'POST',
        body: JSON.stringify(message)
    });
}

export function requestOtp(email: string) {
    return apiRequest<undefined>('/auth/otp/request', {
        method: 'POST',
        body: JSON.stringify({ email })
    });
}

export function verifyOtp(credentials: { email: string; code: string }) {
    return apiRequest<{ accessToken: string; refreshToken: string }>('/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
}

export function refreshSession(refreshToken: string) {
    return apiRequest<{ accessToken: string }>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken })
    });
}

export function signOut(refreshToken: string) {
    return apiRequest<undefined>('/auth/signout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken })
    });
}

export function getMe(token: string) {
    return apiRequest<User>('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
}

export { API_BASE_URL };
