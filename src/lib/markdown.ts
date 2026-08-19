import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'www.youtube-nocookie.com']);

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
    if (data.tagName !== 'iframe') return;

    const iframe = node as Element;
    const source = iframe.getAttribute('src');
    try {
        const url = new URL(source || '', 'https://www.youtube.com');
        const allowed =
            url.protocol === 'https:' &&
            YOUTUBE_HOSTS.has(url.hostname.toLowerCase()) &&
            url.pathname.startsWith('/embed/');
        if (!allowed) {
            iframe.parentNode?.removeChild(iframe);
            return;
        }
        iframe.setAttribute('src', url.href);
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        if (!iframe.getAttribute('title')) iframe.setAttribute('title', 'Video YouTube');
    } catch {
        iframe.parentNode?.removeChild(iframe);
    }
});

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    const element = node as Element;
    if (element.tagName?.toLowerCase() === 'a' && element.getAttribute('target') === '_blank') {
        element.setAttribute('rel', 'noopener noreferrer');
    }
});

export function renderMarkdown(markdown: string | null | undefined) {
    if (!markdown) return '';
    const html = marked.parse(markdown, { async: false, gfm: true });
    const content = typeof html === 'string' ? html : '';
    // A Markdown image title is treated as an optional caption; no title means no invented caption.
    const figures = content.replace(/<p>(<img\s+[^>]*>)<\/p>/g, (_match, image: string) => {
        const caption = image.match(/\stitle="([^"]*)"/)?.[1];
        return `<figure>${image}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
    });
    return DOMPurify.sanitize(figures, {
        USE_PROFILES: { html: true },
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['target', 'rel', 'allow', 'allowfullscreen', 'loading', 'referrerpolicy', 'title'],
        FORBID_TAGS: ['script', 'style', 'object', 'embed', 'form']
    });
}
