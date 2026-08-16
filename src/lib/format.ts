const DATE_FORMATTER = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Jakarta'
});

export function formatDate(value: string | null | undefined) {
    if (!value) return 'Belum dipublikasikan';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Tanggal tidak tersedia' : DATE_FORMATTER.format(date);
}

export function formatUsd(value: number | null | undefined) {
    if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: value < 1 ? 6 : 2
    }).format(value);
}

export function initials(name: string) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');
}

export function safeExternalUrl(value: string | null | undefined) {
    if (!value) return null;
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
    } catch {
        return null;
    }
}
