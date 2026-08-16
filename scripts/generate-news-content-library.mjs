import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { localNewsArticles } from './local-news-content.mjs';

const directory = dirname(fileURLToPath(import.meta.url));
const outputDirectory = resolve(directory, '../docs/production-news-library');
const outputFile = resolve(outputDirectory, 'index.html');
const articles = localNewsArticles.map(
	({ title, slug, tag, excerpt, content, externalLink, publishedAt }, index) => {
		const number = String(index + 1).padStart(2, '0');
		const coverFilename = `${number}-${slug}.png`;

		return {
			number,
			title,
			slug,
			tag,
			excerpt,
			content: content.trim(),
			externalLink,
			publishedAt,
			coverFilename,
			coverImage: `../production-news-cover-prompts/${coverFilename}`
		};
	}
);

const serializedArticles = JSON.stringify(articles).replace(/</g, '\\u003c');

const html = `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CryptoSharia — 16 Artikel Siap Upload</title>
  <style>
    :root { color-scheme: dark; --bg:#0b0e14; --surface:#151c2b; --surface-2:#101725; --line:#293447; --text:#edf2fa; --muted:#a7b3c8; --orange:#ff6b00; --green:#34d399; }
    * { box-sizing:border-box; } body { margin:0; background:var(--bg); color:var(--text); font-family:Inter, ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; line-height:1.5; }
    header { position:sticky; top:0; z-index:2; padding:24px max(20px, calc((100vw - 1120px)/2)); background:rgba(11,14,20,.96); border-bottom:1px solid var(--line); backdrop-filter:blur(10px); }
    h1 { font-size:clamp(1.5rem,4vw,2.25rem); margin:0 0 5px; } p { color:var(--muted); margin:0; } main { max-width:1120px; margin:0 auto; padding:28px 20px 80px; }
    .controls { display:grid; grid-template-columns:1fr auto; gap:12px; margin-top:20px; } input, select { min-height:46px; border:1px solid var(--line); border-radius:8px; background:var(--surface); color:var(--text); padding:0 14px; font:inherit; }
    #count { margin:20px 0 12px; color:var(--muted); font-size:.9rem; } .cards { display:grid; gap:16px; }
    article { background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:22px; } .article-overview { display:grid; grid-template-columns:minmax(260px,340px) minmax(0,1fr); gap:20px; align-items:start; }
    .cover-link { display:block; overflow:hidden; border:1px solid var(--line); border-radius:9px; background:var(--surface-2); } .cover { display:block; width:100%; height:auto; aspect-ratio:1672/941; object-fit:cover; }
    .cover-caption { margin-top:7px; color:var(--muted); font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace; overflow-wrap:anywhere; } .meta { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px; }
    .badge { font-size:.78rem; background:#1e293b; color:#dbe7fb; border-radius:999px; padding:4px 9px; } .badge.number { color:#071a12; background:var(--green); font-weight:800; font-variant-numeric:tabular-nums; } .badge.category { color:#ffe0c2; background:#4c260d; } h2 { font-size:1.22rem; margin:0 0 8px; line-height:1.3; }
    .excerpt { margin-bottom:0; } details { border-top:1px solid var(--line); margin-top:18px; padding-top:14px; } summary { cursor:pointer; color:#cbd7e8; font-weight:650; } .fields { display:grid; gap:12px; padding-top:15px; }
    .field { display:grid; gap:6px; } .field-head { display:flex; align-items:center; justify-content:space-between; gap:12px; } label { color:var(--muted); font-size:.82rem; font-weight:650; }
    textarea, .value { width:100%; resize:vertical; border:1px solid var(--line); border-radius:7px; background:var(--surface-2); color:var(--text); padding:10px; font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace; white-space:pre-wrap; overflow-wrap:anywhere; }
    textarea.short { min-height:58px; } textarea.body { min-height:320px; } button { border:0; border-radius:7px; background:var(--orange); color:#fff; cursor:pointer; font:inherit; font-weight:700; min-height:34px; padding:6px 11px; } button:hover { filter:brightness(1.08); } button.copied { background:var(--green); color:#062417; }
    .all { margin-top:12px; width:100%; } .help { margin-top:13px; font-size:.88rem; } @media (max-width:720px) { header { position:static; } .controls, .article-overview { grid-template-columns:1fr; } article { padding:17px; } }
  </style>
</head>
<body>
  <header>
    <h1>16 Artikel Siap Upload</h1>
    <p>Setiap artikel sudah dipasangkan dengan cover bernomor. Salin field ke CryptoSharia Admin dan simpan sebagai Draft terlebih dahulu.</p>
    <div class="controls">
      <input id="search" type="search" placeholder="Cari nomor, judul, slug, atau kategori…" autofocus>
      <select id="category" aria-label="Filter kategori"><option value="">Semua kategori</option><option value="crypto-news">Crypto News</option><option value="teknologi-ai">Teknologi & AI</option><option value="ekonomi">Ekonomi</option><option value="geopolitik">Geopolitik</option></select>
    </div>
  </header>
  <main>
    <p id="count"></p>
    <section class="cards" id="cards" aria-live="polite"></section>
  </main>
  <script>
    const articles = ${serializedArticles};
    const categoryNames = { 'crypto-news':'Crypto News', 'teknologi-ai':'Teknologi & AI', ekonomi:'Ekonomi', geopolitik:'Geopolitik' };
    const cards = document.querySelector('#cards'); const search = document.querySelector('#search'); const category = document.querySelector('#category'); const count = document.querySelector('#count');
    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
    const field = (name, value, kind = 'short') => '<div class="field"><div class="field-head"><label>' + name + '</label><button type="button" data-copy="' + escapeHtml(value) + '">Copy</button></div>' + (kind === 'link' ? '<div class="value">' + escapeHtml(value) + '</div>' : '<textarea class="' + kind + '" readonly>' + escapeHtml(value) + '</textarea>') + '</div>';
    const copy = async (value, button) => { let copied = false; try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(value); copied = true; } } catch {} if (!copied) { const helper = document.createElement('textarea'); helper.value = value; helper.style.cssText = 'position:fixed;left:-9999px;top:0'; document.body.append(helper); helper.select(); copied = document.execCommand('copy'); helper.remove(); } if (!copied) { window.prompt('Salin teks berikut:', value); return; } const original = button.textContent; button.textContent = 'Tersalin ✓'; button.classList.add('copied'); setTimeout(() => { button.textContent = original; button.classList.remove('copied'); }, 1300); };
    function render() { const query = search.value.trim().toLowerCase(); const selected = category.value; const visible = articles.filter((article) => (!selected || article.tag === selected) && (!query || [article.number, article.title, article.slug, article.tag].join(' ').toLowerCase().includes(query))); count.textContent = visible.length + ' dari ' + articles.length + ' artikel ditampilkan'; cards.innerHTML = visible.map((article) => { const all = ['Nomor: ' + article.number, 'Cover Image: ' + article.coverFilename, 'Title: ' + article.title, 'URL Slug: ' + article.slug, 'Tag: ' + article.tag, 'Excerpt: ' + article.excerpt, '', 'Body Content (Markdown):', article.content, '', 'External Link: ' + article.externalLink].join('\\n'); return '<article><div class="article-overview"><div><a class="cover-link" href="' + escapeHtml(article.coverImage) + '" target="_blank" rel="noopener" aria-label="Buka cover artikel nomor ' + article.number + '"><img class="cover" src="' + escapeHtml(article.coverImage) + '" alt="" width="1672" height="941" loading="lazy" decoding="async"></a><p class="cover-caption">' + escapeHtml(article.coverFilename) + '</p></div><div><div class="meta"><span class="badge number">#' + article.number + '</span><span class="badge category">' + categoryNames[article.tag] + '</span><span class="badge">Draft</span></div><h2>' + escapeHtml(article.title) + '</h2><p class="excerpt">' + escapeHtml(article.excerpt) + '</p></div></div><details><summary>Buka field untuk disalin</summary><div class="fields">' + field('Nomor Artikel', article.number) + field('Cover Image', article.coverFilename, 'link') + field('Title', article.title) + field('URL Slug', article.slug) + field('Tag (pilih di dropdown)', article.tag) + field('Excerpt', article.excerpt, 'short') + field('Body Content (Markdown)', article.content, 'body') + field('External Link', article.externalLink, 'link') + '</div><button type="button" class="all" data-copy="' + escapeHtml(all) + '">Copy seluruh artikel</button></details></article>'; }).join('') || '<article><p>Tidak ada artikel yang cocok.</p></article>'; document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', () => copy(button.dataset.copy, button))); }
    search.addEventListener('input', render); category.addEventListener('change', render); render();
  </script>
</body>
</html>`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, html, 'utf8');
console.log(`Generated ${outputFile}`);
