<script lang="ts">
    import ScreeningStatus from '$lib/components/screening/ScreeningStatus.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import { formatDate, formatUsd, safeExternalUrl } from '$lib/format';
    import type { PageData } from './$types';

    type TocItem = { id: string; label: string; level: number };
    let { data }: { data: PageData } = $props();
    const website = $derived(safeExternalUrl(data.token.website));
    const updatedAt = $derived(data.token.updatedAt ?? data.token.publishedAt ?? data.token.createdAt);
    const documentContent = $derived(prepareDocument(data.html));

    function stripHtml(value: string) { return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim(); }
    function prepareDocument(html: string) {
        const toc: TocItem[] = []; const counts = new Map<string, number>();
        const content = html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi, (_whole, tag: string, attributes: string, heading: string) => {
            const label = stripHtml(heading); if (!label) return _whole;
            const root = label.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-') || `bagian-${toc.length + 1}`;
            const number = counts.get(root) ?? 0; counts.set(root, number + 1); const id = number ? `${root}-${number + 1}` : root;
            toc.push({ id, label, level: tag.toLowerCase() === 'h3' ? 3 : 2 });
            return `<${tag}${attributes} id="${id}">${heading}</${tag}>`;
        });
        return { html: content, toc };
    }
    function formatCompactUsd(value: number | null | undefined) { if (typeof value !== 'number' || !Number.isFinite(value)) return '—'; return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2 }).format(value); }
    function formatChange(value: number | null | undefined) { if (typeof value !== 'number' || !Number.isFinite(value)) return '—'; return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`; }
</script>

<Seo title={`${data.token.name} (${data.token.ticker}) — Screening CryptoSharia`} description={data.token.excerpt} image={data.token.logo?.url || '/logo.png'} canonicalPath={`/screening/${data.token.slug}`} />

<main id="main-content" class="site-main">
    <header class="container coin-header">
        <a class="back-link" href="/screening">← Kembali ke Screening Coin</a>
        <div class="coin-overview">
            <div class="coin-identity">
                {#if data.token.logo?.url}<img src={data.token.logo.url} alt="" width="60" height="60" fetchpriority="high" />
                {:else}<span class="coin-logo-fallback" aria-hidden="true">{data.token.ticker.slice(0, 3)}</span>{/if}
                <div><p>#{data.token.rank} · {data.token.ticker}</p><h1>{data.token.name}</h1></div>
            </div>
            <div class="status-block"><p>Status screening</p><ScreeningStatus status={data.token.shariaStatus} /><time datetime={updatedAt}>Diperbarui {formatDate(updatedAt)}</time></div>
        </div>
        <p class="coin-excerpt">{data.token.excerpt}</p>
    </header>

    <section class="container quote-strip" aria-label="Konteks pasar">
        {#if data.quote}
            <div><span>Harga</span><strong title={formatUsd(data.quote.priceUsd)}>{formatCompactUsd(data.quote.priceUsd)}</strong></div>
            <div><span>Market cap</span><strong title={formatUsd(data.quote.marketCapUsd)}>{formatCompactUsd(data.quote.marketCapUsd)}</strong></div>
            <div><span>Perubahan 24 jam</span><strong class:positive={data.quote.percentChange24h > 0} class:negative={data.quote.percentChange24h < 0}>{formatChange(data.quote.percentChange24h)}</strong></div>
        {:else}<p class="quote-unavailable">Data pasar tidak tersedia saat ini. Analisis screening tetap dapat dibaca di bawah.</p>{/if}
    </section>

    <section class="container analysis-layout" aria-label="Analisis screening">
        {#if documentContent.toc.length}
            <details class="mobile-toc"><summary>Dalam analisis</summary><nav aria-label="Daftar isi analisis">{#each documentContent.toc as item (item.id)}<a class:subsection={item.level === 3} href={`#${item.id}`}>{item.label}</a>{/each}</nav></details>
        {/if}
        <article class="prose screening-prose">{@html documentContent.html}</article>
        {#if documentContent.toc.length}<aside class="desktop-toc"><p>Dalam analisis</p><nav aria-label="Daftar isi analisis">{#each documentContent.toc as item (item.id)}<a class:subsection={item.level === 3} href={`#${item.id}`}>{item.label}</a>{/each}</nav></aside>{/if}
    </section>

    <section class="container detail-outro">
        {#if website}<a class="website-link" href={website} target="_blank" rel="noopener noreferrer">Website resmi <span aria-hidden="true">↗</span></a>{/if}
        <aside class="screening-note"><p>Catatan</p><span>Informasi ini bukan fatwa personal maupun rekomendasi investasi. Status dan penjelasan dapat diperbarui mengikuti temuan serta kajian terbaru.</span></aside>
    </section>
</main>

<style>
 .coin-header { padding-top:72px; } .back-link { display:inline-flex; min-height:36px; align-items:center; padding-bottom:2px; color:var(--muted); border-bottom:1px solid transparent; font-size:.84rem; font-weight:650; } .back-link:hover { color:var(--text); border-color:var(--border-control); } .coin-overview { display:flex; align-items:end; justify-content:space-between; gap:40px; margin-top:38px; } .coin-identity { display:flex; min-width:0; align-items:center; gap:18px; } .coin-identity img,.coin-logo-fallback { width:60px;height:60px;flex:0 0 auto;object-fit:contain; } .coin-logo-fallback { display:grid;place-items:center;color:var(--muted);border:1px solid var(--border);border-radius:50%;background:var(--surface-muted);font-size:.78rem;font-weight:750; } .coin-identity p,.status-block p { margin:0 0 6px;color:var(--muted);font-size:.7rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase; } h1 { margin:0;font-size:clamp(2.65rem,4.2vw,3.25rem);line-height:1.05;letter-spacing:-.055em; } .status-block { display:grid;justify-items:start;gap:8px;min-width:170px;padding-left:20px;border-left:1px solid var(--border-control); } .status-block time { color:var(--muted);font-size:.78rem; } .coin-excerpt { max-width:700px;margin:24px 0 0;color:var(--muted);font-size:1rem;line-height:1.65; }
 .quote-strip { display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:52px;border-block:1px solid var(--border-control); } .quote-strip>div { display:grid;gap:7px;min-width:0;padding:22px 26px; } .quote-strip>div+div { border-left:1px solid var(--border); } .quote-strip span { color:var(--muted);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase; } .quote-strip strong { overflow:hidden;font-size:clamp(1.15rem,2.2vw,1.5rem);letter-spacing:-.035em;text-overflow:ellipsis;white-space:nowrap; } .quote-strip strong.positive { color:var(--success); } .quote-strip strong.negative { color:var(--danger); } .quote-unavailable { margin:0;padding:20px 0;color:var(--muted);font-size:.9rem; }
 .analysis-layout { display:grid;grid-template-columns:minmax(0,760px) 230px;justify-content:space-between;gap:72px;padding-top:64px; } .screening-prose { width:100%;max-width:760px;margin:0; } .desktop-toc { position:sticky;top:90px;align-self:start;padding-left:18px;border-left:1px solid var(--border); } .desktop-toc p { margin:0 0 12px;color:var(--muted);font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase; } nav { display:grid;gap:3px; } nav a { padding:5px 0;color:var(--muted);font-size:.8rem;line-height:1.35; } nav a:hover,nav a:focus-visible { color:var(--accent-text); } nav a.subsection { padding-left:10px;font-size:.75rem; } .mobile-toc { display:none; }
 .detail-outro { max-width:1200px;padding-top:36px;padding-bottom:104px; } .website-link { display:inline-flex;gap:8px;align-items:center;min-height:42px;padding:9px 13px;color:var(--text);border:1px solid var(--border-control);border-radius:7px;font-size:.84rem;font-weight:700; } .website-link:hover { border-color:var(--accent-text); } .screening-note { display:grid;max-width:760px;grid-template-columns:110px minmax(0,1fr);gap:20px;margin-top:36px;padding:20px 0 0 18px;color:var(--muted);border-top:1px solid var(--border);border-left:2px solid var(--accent);font-size:.9rem;line-height:1.65; } .screening-note p { margin:0;color:var(--text);font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase; }
 :global(.screening-prose h1),:global(.screening-prose h2),:global(.screening-prose h3) { scroll-margin-top:100px; } :global(.screening-prose h2) { margin-top:60px;font-size:clamp(1.5rem,2.5vw,1.8rem);line-height:1.2;letter-spacing:-.035em; } :global(.screening-prose h3) { margin-top:38px;font-size:1.14rem;line-height:1.3; } :global(.screening-prose p),:global(.screening-prose li) { font-size:1rem;line-height:1.75; } :global(.screening-prose li+li) { margin-top:7px; } :global(.screening-prose ul),:global(.screening-prose ol) { padding-left:1.25rem; } :global(.screening-prose blockquote) { margin-block:28px;padding:16px 18px;border-left:3px solid var(--accent);border-radius:0;background:color-mix(in srgb,var(--surface-muted) 60%,transparent); }
 @media(max-width:1023px){.analysis-layout{grid-template-columns:minmax(0,760px);justify-content:start}.desktop-toc{display:none}.mobile-toc{display:block;max-width:760px;margin-bottom:34px;border-block:1px solid var(--border)}.mobile-toc summary{padding:13px 0;color:var(--text);font-size:.82rem;font-weight:700;cursor:pointer}.mobile-toc nav{padding:0 0 14px}.mobile-toc[open] summary{color:var(--accent-text)}} @media(max-width:600px){.coin-header{padding-top:48px}.coin-overview{align-items:start;flex-direction:column;gap:22px;margin-top:30px}.coin-identity{gap:14px}.coin-identity img,.coin-logo-fallback{width:48px;height:48px}h1{font-size:clamp(2rem,9vw,2.35rem)}.status-block{display:flex;min-width:0;align-items:center;gap:10px;padding-left:0;border-left:0}.status-block p{display:none}.coin-excerpt{margin-top:18px;font-size:.94rem}.quote-strip{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:38px}.quote-strip>div{padding:15px 10px}.quote-strip strong{font-size:1rem}.quote-strip span{font-size:.58rem;letter-spacing:.08em}.analysis-layout{padding-top:40px}.detail-outro{padding-top:30px;padding-bottom:80px}.screening-note{grid-template-columns:1fr;gap:7px;margin-top:32px;padding-left:15px}:global(.screening-prose h2){margin-top:48px}:global(.screening-prose p),:global(.screening-prose li){font-size:.94rem;line-height:1.72}}
 @media(max-width:380px){.quote-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.quote-strip>div:nth-child(3){grid-column:1 / -1;border-top:1px solid var(--border);border-left:0}.quote-strip>div:nth-child(3){border-left:0}.quote-strip>div:nth-child(2){border-left:1px solid var(--border)}}
</style>
