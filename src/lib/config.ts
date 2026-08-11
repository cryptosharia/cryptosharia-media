export const SITE_NAME = 'CryptoSharia';
export const SITE_URL = 'https://www.cryptosharia.id';
export const SITE_DESCRIPTION =
    'Berita, edukasi, dan screening aset kripto dari perspektif syariah dalam satu platform.';

export const NEWS_CATEGORIES = [
    { label: 'Crypto News', slug: 'crypto-news' },
    { label: 'Teknologi & AI', slug: 'teknologi-ai' },
    { label: 'Ekonomi', slug: 'ekonomi' },
    { label: 'Geopolitik', slug: 'geopolitik' }
] as const;

export const EDUCATION_CATEGORIES = [
    { label: 'Crypto Edu', slug: 'crypto-edu' },
    { label: 'Financial Edu', slug: 'financial-edu' },
    { label: 'Syariah Edu', slug: 'syariah-edu' }
] as const;

export const COMMUNITY_LINKS = {
    whatsapp: 'https://chat.whatsapp.com/EkyYn2gmXVN7tspbMvz6fx',
    discord: 'https://discord.gg/raBFJtB4ja',
    premium: 'https://berbagi.link/cryptosharia?tab=tab-marketplace'
} as const;

export const SOCIAL_LINKS = [
    { label: 'Instagram', href: 'https://www.instagram.com/cryptosharia' },
    { label: 'YouTube', href: 'https://www.youtube.com/@cryptosharia' },
    { label: 'Telegram', href: 'https://t.me/cryptosharia' },
    { label: 'Discord', href: COMMUNITY_LINKS.discord },
    { label: 'X', href: 'https://x.com/cryptosharia_' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cryptosharia' },
    { label: 'Facebook', href: 'https://www.facebook.com/cryptosharia' }
] as const;

export const EMPTY_PAGINATION = { total: 0, page: 1, limit: 12, totalPages: 0 } as const;
