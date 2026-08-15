export type RevealOptions = {
    delay?: number;
    distance?: number;
    threshold?: number;
};

/** Lightweight, one-shot viewport reveal. Content remains visible without JS. */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) return {};

    node.classList.add('motion-reveal');
    node.style.setProperty('--reveal-delay', `${options.delay ?? 0}ms`);
    node.style.setProperty('--reveal-distance', `${options.distance ?? 20}px`);

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) return;
            node.classList.add('is-revealed');
            observer.unobserve(node);
        },
        { threshold: options.threshold ?? 0.12, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(node);
    return { destroy: () => observer.disconnect() };
}
