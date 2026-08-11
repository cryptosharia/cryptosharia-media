<script lang="ts">
    import { SOCIAL_LINKS } from '$lib/config';
</script>

<footer class="site-footer">
    <div class="container">
        <div class="footer-grid">
            <div>
                <a class="brand" href="/">
                    <img src="/logo.png" alt="" width="38" height="38" />
                    <span>CryptoSharia</span>
                </a>
                <p>Berita, edukasi, dan screening aset kripto dari perspektif syariah.</p>
            </div>
            <div>
                <h2>Konten</h2>
                <div class="footer-links">
                    <a href="/berita">Berita</a>
                    <a href="/edukasi">Edukasi</a>
                    <a href="/screening">Screening Coin</a>
                </div>
            </div>
            <div>
                <h2>CryptoSharia</h2>
                <div class="footer-links">
                    <a href="/tentang-kami">Tentang Kami</a>
                    <a href="/tentang-kami#aktivitas">Aktivitas</a>
                    <a href="/komunitas">Komunitas</a>
                    <a href="/tentang-kami#hubungi-kami">Hubungi Kami</a>
                </div>
            </div>
            <div>
                <h2>Ikuti Kami</h2>
                <div class="footer-links">
                    {#each SOCIAL_LINKS as link (link.label)}
                        <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                    {/each}
                </div>
            </div>
        </div>
        <div class="footer-bottom">© {new Date().getFullYear()} CryptoSharia. Seluruh hak cipta dilindungi.</div>
    </div>
</footer>
