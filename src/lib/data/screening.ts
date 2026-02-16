import type { TokenDetail } from '$types/api';

export const SCREENING_DATA: TokenDetail[] = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        ticker: "BTC",
        slug: "bitcoin",
        rank: 1,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-btc", url: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", filename: "btc.png", size: 1024 },
        category: "Store of Value",
        excerpt: "Aset digital terdesentralisasi pertama. Tidak mengandung riba, gharar rendah karena mekanisme jelas, dan tidak ada unsur maisir.",
        content: `
<h3>Tujuan Proyek</h3>
<p><strong>Bitcoin (BTC)</strong> adalah aset kripto pertama yang dirancang sebagai <em>peer-to-peer electronic cash system</em> untuk memungkinkan pembayaran online langsung tanpa perantara, sekaligus berkembang menjadi <strong>store of value</strong> berbasis kelangkaan digital <strong>21 juta BTC</strong>.</p>
<p>Bitcoin dikembangkan oleh <strong>Satoshi Nakamoto</strong> pada 2008–2009 untuk menyelesaikan masalah <em>double spending</em> dan ketergantungan pada lembaga keuangan terpusat.</p>
<p>Bitcoin bertujuan menyediakan:</p>
<ul>
<li>Uang elektronik peer-to-peer yang <strong>tahan sensor</strong></li>
<li><strong>Tidak bisa dipalsukan</strong></li>
<li><strong>Tidak dikendalikan pemerintah atau bank sentral</strong></li>
<li>Sistem moneter global yang <em>permissionless</em> dan tahan inflasi</li>
<li>Fungsi ganda: alat pembayaran + <strong>emas digital (store of value)</strong></li>
</ul>
<p>Saat ini Bitcoin menguasai ±45–50% kapitalisasi pasar kripto.</p>

<h3>Produk / Layanan</h3>
<p><strong>Settlement Layer (Layer 1 – PoW)</strong></p>
<ul>
<li>Blockchain Proof-of-Work dengan keamanan berbasis algoritma SHA-256</li>
<li>Rata-rata waktu blok 10 menit</li>
<li>Diamankan oleh ribuan node dan miner global</li>
</ul>

<p><strong>Layer 2 & Skalabilitas</strong></p>
<ul>
<li><strong>Lightning Network:</strong> pembayaran mikro instan, biaya sangat rendah</li>
<li><strong>Sidechain/Layer 2:</strong> Liquid, Rootstock — enabling DeFi & smart contract</li>
</ul>

<p><strong>Ekosistem Pembayaran</strong></p>
<ul>
<li>Digunakan oleh payment processor, merchant online/offline, ATM Bitcoin, dan remittance service</li>
<li>Di El Salvador, Bitcoin diakui sebagai legal tender</li>
<li>Semua kode inti open-source dan diaudit komunitas global (Bitcoin Core).</li>
</ul>

<h3>Tokenomics</h3>
<ul>
<li><strong>Token utama:</strong> BTC</li>
<li><strong>Maksimum suplai:</strong> 21 juta BTC</li>
<li><strong>Suplai beredar (akhir 2025):</strong> ±19,95 juta BTC (~95%)</li>
<li><strong>Market cap (akhir 2025):</strong> ±1,7 triliun USD</li>
</ul>

<p><strong>Halving & Distribusi</strong></p>
<ul>
<li>Reward awal: 50 BTC/blok (2009)</li>
<li>Setelah halving 2024: 3,125 BTC/blok</li>
<li>Halving setiap 210.000 blok (~4 tahun) hingga reward mendekati nol ≈2140</li>
</ul>

<p><strong>Reward Miner (bukan bunga)</strong></p>
<ul>
<li>Block reward</li>
<li>Biaya transaksi (tx fee)</li>
</ul>
<p>Reward ini adalah kompensasi penggunaan listrik & hardware, <strong>bukan riba</strong>, karena nilainya ditentukan pasar melalui harga BTC + kompetisi hashrate.</p>

<p><strong>Fair Launch</strong></p>
<ul>
<li>Tanpa pre-mine</li>
<li>Tanpa alokasi khusus untuk tim / VC</li>
<li>Distribusi murni dari PoW sejak genesis</li>
</ul>

<h3>Underlying Asset</h3>
<p>Bitcoin tidak memiliki underlying fisik, tetapi nilainya ditopang oleh:</p>
<ul>
<li><strong>Kelangkaan matematis:</strong> suplai tetap 21 juta</li>
<li><strong>Biaya produksi & keamanan:</strong> energi + hardware penambangan</li>
<li><strong>Network effect:</strong> adopsi global, likuiditas tinggi, dan reputasi sebagai kripto pertama</li>
</ul>
<p>Fungsi utama:</p>
<ul>
<li>Store of value (emas digital)</li>
<li>Alat tukar lintas negara</li>
<li>Unit of account dalam ekosistem kripto (collateral, denominasi harga)</li>
</ul>
<p>Nilai BTC bertumpu pada kepercayaan, kelangkaan, dan keamanan PoW.</p>

<h3>Trading Mekanisme</h3>
<p>Protokol Bitcoin bersifat netral dan hanya menyediakan ledger transfer BTC — <strong>tidak ada margin/leverage/derivatif pada layer dasar</strong>.</p>
<p>Namun BTC diperdagangkan di hampir semua exchange global, dalam bentuk:</p>
<ul>
<li><strong>Spot trading:</strong> jual-beli langsung BTC terhadap fiat/kripto lain</li>
<li><strong>Derivatif:</strong> futures, perpetual, options (CME & exchange kripto)</li>
</ul>
<p>Aktivitas derivatif ini berpotensi mengandung riba dan gharar jika melibatkan:</p>
<ul>
<li>Pinjaman berbunga</li>
<li>Funding rate</li>
<li>Spekulasi berlebihan tanpa serah terima aset</li>
</ul>
<p>Bitcoin sebagai protokol tidak mendorong aktivitas tersebut, tetapi infrastruktur pasar membuat spekulasi ekstrem sangat mungkin terjadi.</p>

<h3>Gharar / Spekulasi</h3>
<p><strong>Transparansi Tinggi</strong></p>
<ul>
<li>Semua data suplai, halving, transaksi publik & auditabel melalui blockchain</li>
</ul>
<p><strong>Likuiditas & Volatilitas</strong></p>
<ul>
<li>Volume harian puluhan miliar USD</li>
<li>Volatilitas tinggi → risiko spekulasi signifikan</li>
</ul>
<p><strong>Minim Gharar pada Protokol</strong></p>
<ul>
<li>PoW + suplai tetap → aturan transparan & tidak dapat diubah sepihak</li>
<li>Tidak ada Ponzi bawaan</li>
</ul>
<p>Risiko gharar berasal dari exchange, lending platform, derivatif, dll. Perdagangan leverage, futures, dan produk turunan kompleks sering masuk kategori gharar & maisir.</p>

<h3>Tim & Governance</h3>
<p>Bitcoin tidak memiliki tim pusat atau perusahaan resmi.</p>
<ul>
<li><strong>Bitcoin Core Developers:</strong> Developer sukarela yang memelihara implementasi referensi</li>
<li><strong>Miner & Node Operator:</strong> Menjalankan konsensus PoW, menerima/menolak upgrade melalui signalling dan penggunaan software</li>
<li><strong>Komunitas Global:</strong> Wallet provider, exchange, perusahaan pembayaran, pengguna — membentuk social consensus</li>
</ul>
<p><strong>Governance (BIP)</strong></p>
<ul>
<li>Upgrade besar (SegWit 2017, Taproot 2021) diaktifkan setelah tercapai konsensus sosial + teknis</li>
<li>Tidak ada <em>one coin, one vote</em></li>
<li>Risiko: konsentrasi hashrate pada mining pool besar</li>
</ul>

<h3>Kesimpulan</h3>
<div class="summary-box">
<span class="status-badge halal">Halal</span>
<p>Secara prinsip, Bitcoin (BTC) dikategorikan sebagai <strong>māl mutaqawwam</strong> — aset digital yang dapat dimiliki, dipindahtangankan, dan diwariskan, dengan sejumlah indikator kepatuhan syariah yang positif.</p>
</div>

<p><strong>Indikator Pro-Halal (Secara Teknis):</strong></p>
<ul>
<li>BTC adalah aset digital nyata secara fiqh: dapat dimiliki & dipindahkan secara penuh</li>
<li>Tidak ada riba bawaan (tidak ada bunga tetap)</li>
<li>Aturan protokol (PoW, suplai tetap, halving) transparan & terverifikasi on-chain → meminimalkan gharar</li>
<li>Tidak ada skema Ponzi bawaan; reward miner berasal dari kerja komputasi nyata</li>
<li>Memiliki manfaat riil: remitansi, pembayaran lintas negara, lindung nilai inflasi</li>
<li>Fair launch, tanpa pre-mine & tanpa alokasi VC</li>
</ul>

<p><strong>Pandangan Fikih:</strong></p>
<ul>
<li>Kelompok yang mengharamkan menyoroti volatilitas ekstrem, potensi penyalahgunaan, dan aktivitas pasar derivatif yang penuh gharar.</li>
<li>Kelompok yang membolehkan menilai bahwa Bitcoin adalah <em>māl digital</em> yang halal dimiliki dan diperjualbelikan jika:
<ul>
<li>Spot trading (qabdh langsung)</li>
<li>Tanpa margin/futures berbunga</li>
<li>Tidak untuk aktivitas haram</li>
</ul>
</li>
</ul>

<p><strong>Rekomendasi Umum untuk Muslim:</strong></p>
<ul>
<li>Perlakukan BTC sebagai aset halal bersyarat untuk investasi jangka menengah–panjang</li>
<li>Hindari margin, futures, options berleverage</li>
<li>Gunakan BTC untuk aktivitas yang mubah: tabungan, pembayaran halal, remitansi</li>
</ul>

<h3>Sumber Status</h3>
<div class="sources-table">
<table>
<thead>
<tr>
<th>Sumber</th>
<th>Status</th>
</tr>
</thead>
<tbody>
<tr><td>Sharlife</td><td>Halal ✅</td></tr>
<tr><td>Cryptoummah</td><td>Halal ✅</td></tr>
<tr><td>islamicfinanceguru</td><td>Halal ✅</td></tr>
<tr><td>Crypto Islam</td><td>Halal ✅</td></tr>
</tbody>
</table>
</div>
        `,
        website: "https://bitcoin.org",
        tradingviewSymbol: "BINANCE:BTCUSDT",
        price: 68566,
        priceChange24h: -0.59,
        marketCap: 1370670187321,
        marketCapDominance: 58.24,
        maxSupply: 21000000,
        circulatingSupply: 19990525,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "ethereum",
        name: "Ethereum",
        ticker: "ETH",
        slug: "ethereum",
        rank: 2,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-eth", url: "https://cryptologos.cc/logos/ethereum-eth-logo.png", filename: "eth.png", size: 1024 },
        category: "Smart Contract Platform",
        excerpt: "Blockchain generasi kedua yang berfungsi sebagai 'komputer dunia'. ETH termasuk māl i'tibārī yang sah, boleh diperjualbelikan selama digunakan untuk aktivitas halal.",
        content: `
<h3>Tujuan Proyek</h3>
<p><strong>Ethereum (ETH)</strong> adalah platform blockchain <em>open-source</em> terdesentralisasi yang menjalankan <em>smart contracts</em>. Ethereum memungkinkan developer untuk membangun aplikasi terdesentralisasi (dApps) yang berjalan di atasnya.</p>
<p>Ether (ETH) adalah aset kripto asli jaringan ini, digunakan untuk membayar biaya transaksi (gas) dan layanan komputasi.</p>

<h3>Produk / Layanan</h3>
<ul>
<li><strong>Smart Contract Platform:</strong> Memungkinkan pemrograman uang dan aplikasi tanpa perantara.</li>
<li><strong>DeFi Ecosystem:</strong> Basis utama untuk lending, borrowing, dan exchange terdesentralisasi.</li>
<li><strong>NFTs:</strong> Platform utama untuk seni digital dan tokenisasi aset.</li>
</ul>

<h3>Kesimpulan</h3>
<div class="summary-box">
<span class="status-badge halal">Halal</span>
<p>Hukum asal muamalah adalah boleh. ETH dapat dimiliki secara pribadi, diakui nilainya sesama pengguna, dan dapat digunakan sebagai alat tukar.</p>
</div>

<p><strong>Catatan:</strong> Yang perlu dihindari adalah terlibat dalam aktivitas haram (seperti protocol lending ribawi) yang dibangun di atas ekosistem Ethereum, bukan teknologi koin ETH itu sendiri.</p>

<h3>Sumber Status</h3>
<div class="sources-table">
<table>
<thead>
<tr><th>Sumber</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>Sharlife</td><td>Halal ✅</td></tr>
<tr><td>CryptoUmmah</td><td>Halal ✅</td></tr>
<tr><td>Islamic Finance Guru</td><td>Halal ✅</td></tr>
</tbody>
</table>
</div>
        `,
        website: "https://ethereum.org",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "tether",
        name: "Tether",
        ticker: "USDT",
        slug: "tether",
        rank: 3,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-usdt", url: "https://cryptologos.cc/logos/tether-usdt-logo.png", filename: "usdt.png", size: 1024 },
        category: "Stablecoin",
        excerpt: "Stablecoin terbesar yang dipatok ke USD. Digunakan sebagai alat tukar digital yang stabil.",
        content: `
<h3>Tujuan Proyek</h3>
<p><strong>Tether (USDT)</strong> adalah <em>stablecoin</em> yang nilainya dipatok (pegged) 1:1 terhadap Dolar AS (USD). Tujuannya adalah menggabungkan keunggulan transaksi instan kripto dengan stabilitas nilai mata uang fiat.</p>

<h3>Produk / Layanan</h3>
<ul>
<li><strong>Stabilitas Nilai:</strong> Meminimalisir volatilitas pasar kripto.</li>
<li><strong>Alat Tukar Global:</strong> Memudahkan transfer nilai lintas batas dan lintas exchange.</li>
<li><strong>Pairing Utama:</strong> Menjadi pasangan trading utama di hampir semua exchange kripto.</li>
</ul>

<h3>Kesimpulan</h3>
<div class="summary-box">
<span class="status-badge halal">Halal</span>
<p>USDT dinilai halal karena berfungsi sebagai alat tukar dan penyimpan nilai (store of value) sementara yang didukung oleh aset cadangan (reserves).</p>
</div>

<h3>Sumber Status</h3>
<div class="sources-table">
<table>
<thead>
<tr><th>Sumber</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>CryptoSharia Team</td><td>Halal ✅</td></tr>
<tr><td>Sharlife</td><td>Halal ✅</td></tr>
</tbody>
</table>
</div>
        `,
        website: "https://tether.to",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "xrp",
        name: "XRP",
        ticker: "XRP",
        slug: "xrp",
        rank: 6,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-xrp", url: "https://cryptologos.cc/logos/xrp-xrp-logo.png", filename: "xrp.png", size: 1024 },
        category: "Payment",
        excerpt: "Token untuk jaringan pembayaran Ripple. Digunakan untuk remittance lintas negara dengan biaya rendah dan kecepatan tinggi.",
        content: "XRP memiliki utilitas jelas sebagai jembatan pembayaran internasional. Telah dinilai halal oleh tim CryptoSharia.",
        website: "https://ripple.com",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "bnb",
        name: "BNB",
        ticker: "BNB",
        slug: "bnb",
        rank: 4,
        shariaStatus: "syubhat",
        status: "published",
        logo: { id: "logo-bnb", url: "https://cryptologos.cc/logos/bnb-bnb-logo.png", filename: "bnb.png", size: 1024 },
        category: "Exchange Token",
        excerpt: "Token utilitas Binance untuk fee trading dan ekosistem BNB Chain. Status syubhat karena perbedaan pendapat ulama.",
        content: `
<h3>Tujuan Proyek</h3>
<p><strong>Binance Coin (BNB)</strong> adalah aset kripto asli dari ekosistem Binance dan BNB Chain. Awalnya diterbitkan sebagai token ERC-20, sekarang berjalan di blockchain sendiri.</p>

<h3>Kegunaan</h3>
<ul>
<li>Membayar biaya transaksi di BNB Chain (BSC).</li>
<li>Mendapatkan diskon biaya trading di exchange Binance.</li>
<li>Partisipasi dalam token sale di Binance Launchpad.</li>
</ul>

<h3>Kesimpulan</h3>
<div class="summary-box">
<span class="status-badge syubhat">Syubhat</span>
<p>Terdapat perbedaan pendapat (khilafiyah) mengenai status BNB.</p>
</div>

<p><strong>Pandangan:</strong></p>
<ul>
<li><strong>Pro-Halal:</strong> Dilihat dari fungsi utilitasnya untuk diskon fee dan gas fee blockchain.</li>
<li><strong>Kontra (Haram/Syubhat):</strong> Keterikatan kuat dengan Binance sebagai entitas yang memfasilitasi perdagangan derivatif, margin, dan futures yang mengandung riba/gharar.</li>
</ul>
<p>Disarankan untuk berhati-hati (wara').</p>

<h3>Sumber Status</h3>
<div class="sources-table">
<table>
<thead>
<tr><th>Sumber</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>Sharlife</td><td>Halal ✅</td></tr>
<tr><td>CryptoHalal.cc</td><td>Haram ❌</td></tr>
<tr><td>CryptoSharia Team</td><td>Syubhat ⚠️</td></tr>
</tbody>
</table>
</div>
        `,
        website: "https://www.bnbchain.org",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "solana",
        name: "Solana",
        ticker: "SOL",
        slug: "solana",
        rank: 5,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-sol", url: "https://cryptologos.cc/logos/solana-sol-logo.png", filename: "sol.png", size: 1024 },
        category: "Smart Contract Platform",
        excerpt: "Blockchain cepat dengan biaya rendah dan throughput tinggi. Memiliki utilitas jelas sebagai infrastruktur dApps.",
        content: `
<h3>Tujuan Proyek</h3>
<p><strong>Solana (SOL)</strong> adalah blockchain berkinerja tinggi yang dirancang untuk mendukung aplikasi terdesentralisasi (dApps) dengan skala global. Solana menggunakan mekanisme konsensus unik yang disebut <em>Proof of History</em> (PoH).</p>

<h3>Keunggulan Utama</h3>
<ul>
<li><strong>Throughput Tinggi:</strong> Mampu memproses ribuan transaksi per detik (TPS).</li>
<li><strong>Biaya Rendah:</strong> Biaya transaksi rata-rata sangat murah (kurang dari $0.01).</li>
<li><strong>Ekosistem Pertumbuhan Cepat:</strong> Mendukung NFT, DeFi, dan Web3 gaming.</li>
</ul>

<h3>Kesimpulan</h3>
<div class="summary-box">
<span class="status-badge halal">Halal</span>
<p>Solana dinilai halal karena fungsi utilitasnya yang jelas sebagai infrastruktur blockchain. Aset SOL digunakan untuk membayar biaya jaringan dan staking.</p>
</div>

<p><strong>Catatan:</strong> Seperti blockchain lain, hindari penggunaan dApps di atas Solana yang melanggar syariah (misalnya protokol pinjam-meminjam dengan bunga).</p>

<h3>Sumber Status</h3>
<div class="sources-table">
<table>
<thead>
<tr><th>Sumber</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>CryptoSharia Team</td><td>Halal ✅</td></tr>
<tr><td>Sharlife</td><td>Halal ✅</td></tr>
</tbody>
</table>
</div>
        `,
        website: "https://solana.com",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "tron",
        name: "Tron",
        ticker: "TRX",
        slug: "tron",
        rank: 10,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-trx", url: "https://cryptologos.cc/logos/tron-trx-logo.png", filename: "trx.png", size: 1024 },
        category: "Smart Contract Platform",
        excerpt: "Platform blockchain untuk konten digital terdesentralisasi. Dinilai halal oleh PIF, Sharlife, IFG, dan CryptoHalal.",
        content: "TRON memiliki utilitas nyata untuk konten digital, dApps, dan transaksi cepat dengan biaya rendah. Dinilai umumnya halal oleh berbagai lembaga selama penggunaannya tidak terlibat pada proyek atau konten yang bertentangan dengan prinsip Islam.",
        website: "https://tron.network",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "bitcoin-cash",
        name: "Bitcoin Cash",
        ticker: "BCH",
        slug: "bitcoin-cash",
        rank: 15,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-bch", url: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png", filename: "bch.png", size: 1024 },
        category: "Payment",
        excerpt: "Fork dari Bitcoin dengan fokus pada pembayaran cepat dan murah. Memiliki utilitas jelas sebagai alat tukar digital.",
        content: "Bitcoin Cash mempertahankan prinsip dasar Bitcoin sebagai sistem pembayaran peer-to-peer. Dinilai halal oleh tim CryptoSharia.",
        website: "https://bitcoincash.org",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "cardano",
        name: "Cardano",
        ticker: "ADA",
        slug: "cardano",
        rank: 8,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-ada", url: "https://cryptologos.cc/logos/cardano-ada-logo.png", filename: "ada.png", size: 1024 },
        category: "Smart Contract Platform",
        excerpt: "Platform research-driven dengan fokus pada peer-review ilmiah. Delegated PoS yang transparan.",
        content: "Cardano memiliki pendekatan ilmiah dan peer-reviewed. Reward staking berasal dari biaya transaksi dan inflasi terkontrol. Dinilai halal oleh tim CryptoSharia.",
        website: "https://cardano.org",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "hyperliquid",
        name: "Hyperliquid",
        ticker: "HYPE",
        slug: "hyperliquid",
        rank: 50,
        shariaStatus: "haram",
        status: "published",
        logo: { id: "logo-hype", url: "https://cryptologos.cc/logos/hyperliquid-hype-logo.png", filename: "hype.png", size: 1024 },
        category: "DeFi Derivatives",
        excerpt: "Platform DEX derivatif (perpetual futures) dengan leverage. Mengandung unsur riba, gharar ekstrem, dan maisir.",
        content: "Hyperliquid fokus pada produk derivatif leverage (perps) yang sangat problematik secara syariah. Fitur perpetual futures, margin trading, dan leverage mengandung riba, gharar, dan maisir. Tidak direkomendasikan untuk investasi Muslim.",
        website: "https://hyperliquid.xyz",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "unus-sed-leo",
        name: "UNUS SED LEO",
        ticker: "LEO",
        slug: "unus-sed-leo",
        rank: 20,
        shariaStatus: "haram",
        status: "published",
        logo: { id: "logo-leo", url: "https://cryptologos.cc/logos/unus-sed-leo-leo-logo.png", filename: "leo.png", size: 1024 },
        category: "Exchange Token",
        excerpt: "Token dari Bitfinex/iFinex. Terkait erat dengan platform yang menyediakan produk non-syariah.",
        content: "LEO dikategorikan haram oleh tim CryptoSharia karena keterikatan dengan platform yang menyediakan produk derivatif, margin trading, dan instrumen ribawi lainnya.",
        website: "https://www.bitfinex.com",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "ethena-usde",
        name: "Ethena USDe",
        ticker: "USDe",
        slug: "ethena-usde",
        rank: 25,
        shariaStatus: "haram",
        status: "published",
        logo: { id: "logo-usde", url: "https://cryptologos.cc/logos/ethena-usde-usde-logo.png", filename: "usde.png", size: 1024 },
        category: "Synthetic Stablecoin",
        excerpt: "Stablecoin sintetis yang menghasilkan yield dari strategi derivatif. Mengandung unsur riba dan gharar.",
        content: "USDe dikategorikan haram karena mekanisme yield-nya berbasis strategi derivatif (futures arbitrage) yang mengandung unsur riba dan gharar. Bukan stablecoin dengan backing aset langsung.",
        website: "https://ethena.fi",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "chainlink",
        name: "Chainlink",
        ticker: "LINK",
        slug: "chainlink",
        rank: 12,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-link", url: "https://cryptologos.cc/logos/chainlink-link-logo.png", filename: "link.png", size: 1024 },
        category: "Oracle",
        excerpt: "Jaringan oracle terdesentralisasi. Menyediakan data dunia nyata ke blockchain. Utility jelas sebagai infrastruktur.",
        content: "Chainlink memiliki utilitas jelas sebagai infrastruktur oracle untuk smart contract. Tidak ada unsur riba atau gharar berlebihan. Dinilai halal oleh tim CryptoSharia.",
        website: "https://chain.link",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "monero",
        name: "Monero",
        ticker: "XMR",
        slug: "monero",
        rank: 30,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-xmr", url: "https://cryptologos.cc/logos/monero-xmr-logo.png", filename: "xmr.png", size: 1024 },
        category: "Privacy Coin",
        excerpt: "Privacy coin dengan transaksi rahasia. Teknologi privasi untuk melindungi data keuangan pengguna.",
        content: "Monero dinilai halal oleh tim CryptoSharia. Privasi finansial adalah hak yang sah. Fokus pada PoW mining yang merupakan usaha nyata.",
        website: "https://getmonero.org",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "multi-collateral-dai",
        name: "Dai",
        ticker: "DAI",
        slug: "multi-collateral-dai",
        rank: 18,
        shariaStatus: "haram",
        status: "published",
        logo: { id: "logo-dai", url: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png", filename: "dai.png", size: 1024 },
        category: "DeFi Stablecoin",
        excerpt: "Stablecoin terdesentralisasi oleh MakerDAO. Mekanisme lending/borrowing dengan bunga dalam prosesnya.",
        content: "DAI dikategorikan haram karena mekanisme penciptaannya melalui lending protocol dengan interest (stability fee). Core business MakerDAO berbasis pinjam-meminjam dengan bunga yang termasuk riba.",
        website: "https://makerdao.com",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "stellar",
        name: "Stellar",
        ticker: "XLM",
        slug: "stellar",
        rank: 22,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-xlm", url: "https://cryptologos.cc/logos/stellar-xlm-logo.png", filename: "xlm.png", size: 1024 },
        category: "Payment",
        excerpt: "Platform pembayaran dan remittance global dengan biaya sangat rendah. Utilitas jelas untuk inklusi keuangan.",
        content: "Stellar memiliki misi inklusi keuangan global dan memiliki utilitas jelas sebagai jembatan pembayaran. Dinilai halal oleh tim CryptoSharia.",
        website: "https://stellar.org",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "litecoin",
        name: "Litecoin",
        ticker: "LTC",
        slug: "litecoin",
        rank: 19,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-ltc", url: "https://cryptologos.cc/logos/litecoin-ltc-logo.png", filename: "ltc.png", size: 1024 },
        category: "Payment",
        excerpt: "Digital silver — fork dari Bitcoin dengan konfirmasi lebih cepat. Digunakan sebagai alat pembayaran.",
        content: "Litecoin menggunakan PoW seperti Bitcoin dan memiliki utilitas jelas sebagai alat tukar. Dinilai halal oleh tim CryptoSharia.",
        website: "https://litecoin.org",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "zcash",
        name: "Zcash",
        ticker: "ZEC",
        slug: "zcash",
        rank: 45,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-zec", url: "https://cryptologos.cc/logos/zcash-zec-logo.png", filename: "zec.png", size: 1024 },
        category: "Privacy Coin",
        excerpt: "Privacy coin dengan teknologi zk-SNARKs. Menawarkan transaksi privat opsional.",
        content: "Zcash memiliki utilitas privasi dengan teknologi zero-knowledge proof. PoW mining yang merupakan usaha nyata. Dinilai halal oleh tim CryptoSharia.",
        website: "https://z.cash",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "avalanche",
        name: "Avalanche",
        ticker: "AVAX",
        slug: "avalanche",
        rank: 9,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-avax", url: "https://cryptologos.cc/logos/avalanche-avax-logo.png", filename: "avax.png", size: 1024 },
        category: "Smart Contract Platform",
        excerpt: "Platform blockchain dengan konsensus unik dan skalabilitas tinggi. Mendukung subnet khusus untuk berbagai use case.",
        content: "Avalanche memiliki utilitas sebagai platform smart contract dan infrastruktur blockchain. Dinilai halal oleh tim CryptoSharia.",
        website: "https://avax.network",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "sui",
        name: "Sui",
        ticker: "SUI",
        slug: "sui",
        rank: 21,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-sui", url: "https://cryptologos.cc/logos/sui-sui-logo.png", filename: "sui.png", size: 1024 },
        category: "Smart Contract Platform",
        excerpt: "Blockchain Layer 1 dengan model pemrograman berbasis objek. Fokus pada pengalaman pengguna yang baik.",
        content: "Sui memiliki inovasi teknis dan utilitas jelas sebagai platform smart contract. Dinilai halal oleh tim CryptoSharia.",
        website: "https://sui.io",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "hedera",
        name: "Hedera",
        ticker: "HBAR",
        slug: "hedera",
        rank: 26,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-hbar", url: "https://cryptologos.cc/logos/hedera-hbar-logo.png", filename: "hbar.png", size: 1024 },
        category: "Enterprise DLT",
        excerpt: "Platform distributed ledger dengan governance oleh perusahaan besar global. Fokus pada enterprise use case.",
        content: "Hedera menggunakan hashgraph consensus dan dikelola oleh dewan perusahaan terkemuka. Utilitas jelas untuk enterprise. Dinilai halal oleh tim CryptoSharia.",
        website: "https://hedera.com",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "shiba-inu",
        name: "Shiba Inu",
        ticker: "SHIB",
        slug: "shiba-inu",
        rank: 11,
        shariaStatus: "haram",
        status: "published",
        logo: { id: "logo-shib", url: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png", filename: "shib.png", size: 1024 },
        category: "Meme Coin",
        excerpt: "Memecoin berbasis Ethereum. Nilai sangat dipengaruhi sentimen komunitas dan siklus hype, bukan utilitas teknis.",
        content: "Shiba Inu dikategorikan haram. DNA awalnya adalah memecoin dengan spekulasi tinggi. Meskipun ada ekosistem (ShibaSwap, Shibarium), utilitas fundamental belum setara blockchain besar. Ketergantungan pada sentimen dan spekulasi sangat tinggi.",
        website: "https://shibatoken.com",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "toncoin",
        name: "Toncoin",
        ticker: "TON",
        slug: "toncoin",
        rank: 7,
        shariaStatus: "halal",
        status: "published",
        logo: { id: "logo-ton", url: "https://cryptologos.cc/logos/toncoin-ton-logo.png", filename: "ton.png", size: 1024 },
        category: "Smart Contract Platform",
        excerpt: "Blockchain yang awalnya dikembangkan oleh Telegram. Fokus pada integrasi messaging dan pembayaran.",
        content: "Toncoin memiliki utilitas jelas sebagai platform smart contract dengan basis pengguna besar dari ekosistem Telegram. Dinilai halal oleh tim CryptoSharia.",
        website: "https://ton.org",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "cronos",
        name: "Cronos",
        ticker: "CRO",
        slug: "cronos",
        rank: 35,
        shariaStatus: "haram",
        status: "published",
        logo: { id: "logo-cro", url: "https://cryptologos.cc/logos/cronos-cro-logo.png", filename: "cro.png", size: 1024 },
        category: "Exchange Token",
        excerpt: "Token dari Crypto.com. Terkait erat dengan platform yang menyediakan produk derivatif dan layanan non-syariah.",
        content: "CRO dikategorikan haram oleh tim CryptoSharia karena keterikatan kuat dengan Crypto.com yang menyediakan margin trading, futures, dan produk derivatif lainnya.",
        website: "https://cronos.org",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    },
    {
        id: "world-liberty-financial-wlfi",
        name: "World Liberty Financial",
        ticker: "WLFI",
        slug: "world-liberty-financial-wlfi",
        rank: 99,
        shariaStatus: "haram",
        status: "published",
        logo: { id: "logo-wlfi", url: "https://cryptologos.cc/logos/world-liberty-financial-wlfi-logo.png", filename: "wlfi.png", size: 1024 },
        category: "DeFi",
        excerpt: "Token dengan klaim dukungan emas namun menyediakan produk DeFi ribawi. Mengandung riba, gharar, dan maysir.",
        content: "WLFI jelas melanggar prinsip syariah: imbal hasil dari interest/bunga, fitur margin trading & derivatif, klaim dukungan emas tanpa kepemilikan fisik langsung, dan governance tidak transparan. Dikategorikan haram dan tidak direkomendasikan untuk Muslim.",
        website: "https://worldlibertyfinancial.com",
        tradingviewSymbol: null,
        publishedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        createdBy: null,
        updatedBy: null
    }
];
