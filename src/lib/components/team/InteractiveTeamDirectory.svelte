<script lang="ts">
    import { TEAM_MEMBERS } from '$lib/team';

    let selectedIndex = $state(0);
    let selectorTrack: HTMLDivElement;
    const selected = $derived(TEAM_MEMBERS[selectedIndex]);

    function selectMember(index: number) {
        selectedIndex = index;
    }

    function scrollMemberIntoView(index: number) {
        requestAnimationFrame(() => {
            const buttons = selectorTrack?.querySelectorAll<HTMLButtonElement>('.selector-card');
            const button = buttons?.[index];
            if (!selectorTrack || !button) return;

            const trackRect = selectorTrack.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            const targetLeft = selectorTrack.scrollLeft
                + buttonRect.left
                - trackRect.left
                - (selectorTrack.clientWidth - buttonRect.width) / 2;
            const maxLeft = selectorTrack.scrollWidth - selectorTrack.clientWidth;

            selectorTrack.scrollTo({
                left: Math.max(0, Math.min(targetLeft, maxLeft)),
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            });
        });
    }

    function selectAdjacent(direction: -1 | 1) {
        const nextIndex = selectedIndex + direction;
        if (nextIndex < 0 || nextIndex >= TEAM_MEMBERS.length) return;

        selectMember(nextIndex);
        scrollMemberIntoView(nextIndex);
    }

    function handleSelectorKeydown(event: KeyboardEvent, index: number) {
        let nextIndex: number | undefined;

        if (event.key === 'ArrowRight' && index < TEAM_MEMBERS.length - 1) nextIndex = index + 1;
        if (event.key === 'ArrowLeft' && index > 0) nextIndex = index - 1;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = TEAM_MEMBERS.length - 1;
        if (nextIndex === undefined) {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') event.preventDefault();
            return;
        }

        event.preventDefault();
        selectMember(nextIndex);

        const buttons = (event.currentTarget as HTMLButtonElement).parentElement?.querySelectorAll<HTMLButtonElement>('.selector-card');
        buttons?.[nextIndex]?.focus();
        scrollMemberIntoView(nextIndex);
    }
</script>

<section id="tim" class="container section team-section" aria-labelledby="tim-title">
    <div class="team-heading">
        <p class="eyebrow">Orang di balik CryptoSharia</p>
        <h2 id="tim-title">Kenali Tim CryptoSharia</h2>
        <p>Pilih profil untuk mengenal peran, fokus, dan kontribusi setiap pengurus dalam mengembangkan CryptoSharia.</p>
    </div>

    <article id="selected-team-profile" class="featured-profile" aria-labelledby="selected-profile-name">
        <p class="sr-only" aria-live="polite" aria-atomic="true">
            Profil {selectedIndex + 1} dari {TEAM_MEMBERS.length}: {selected.name}, {selected.role}
        </p>

        <div class="featured-content">
            <div class="featured-topline">
                <span>Profil terpilih</span>
                <div class="featured-topline-actions">
                    <div class="featured-profile-controls" role="group" aria-label="Navigasi profil terpilih">
                        <button
                            class="profile-nav-button"
                            type="button"
                            aria-label="Lihat profil sebelumnya"
                            aria-controls="selected-team-profile team-selector"
                            disabled={selectedIndex === 0}
                            onclick={() => selectAdjacent(-1)}
                        ><span aria-hidden="true">←</span></button>
                        <button
                            class="profile-nav-button"
                            type="button"
                            aria-label="Lihat profil berikutnya"
                            aria-controls="selected-team-profile team-selector"
                            disabled={selectedIndex === TEAM_MEMBERS.length - 1}
                            onclick={() => selectAdjacent(1)}
                        ><span aria-hidden="true">→</span></button>
                    </div>
                    <span class="featured-counter">{String(selectedIndex + 1).padStart(2, '0')} / {String(TEAM_MEMBERS.length).padStart(2, '0')}</span>
                </div>
            </div>

            <div class="featured-main">
                <div class="featured-portrait-navigation">
                    <button
                        class="profile-nav-button portrait-nav-button"
                        type="button"
                        aria-label="Lihat profil sebelumnya"
                        aria-controls="selected-team-profile team-selector"
                        disabled={selectedIndex === 0}
                        onclick={() => selectAdjacent(-1)}
                    ><span aria-hidden="true">←</span></button>

                    {#key selected.id}
                    <div class="featured-portrait">
                        <img src={selected.image} alt={`Foto ${selected.name}`} width="360" height="450" />
                    </div>
                    {/key}

                    <button
                        class="profile-nav-button portrait-nav-button"
                        type="button"
                        aria-label="Lihat profil berikutnya"
                        aria-controls="selected-team-profile team-selector"
                        disabled={selectedIndex === TEAM_MEMBERS.length - 1}
                        onclick={() => selectAdjacent(1)}
                    ><span aria-hidden="true">→</span></button>
                </div>

                {#key selected.id}
                    <div class="featured-details">
                        <div class="featured-identity">
                            <h3 id="selected-profile-name" class:long-name={selected.name.length > 32}>{selected.name}</h3>
                            {#if selected.credentials}<p class="credentials">{selected.credentials}</p>{/if}
                            <p class="role">{selected.role}</p>
                            <p class="description">{selected.description}</p>
                        </div>

                        <dl class="profile-metadata">
                            <div><dt>Jabatan</dt><dd>{selected.role}</dd></div>
                            <div><dt>Fokus</dt><dd>{selected.focus}</dd></div>
                            {#if selected.contribution}<div class="metadata-wide"><dt>Kontribusi</dt><dd>{selected.contribution}</dd></div>{/if}
                            {#if selected.joined}<div><dt>Bergabung</dt><dd>{selected.joined}</dd></div>{/if}
                        </dl>
                    </div>
                {/key}
            </div>

            {#key selected.id}
                <div class="expertise">
                    <h4>Area keahlian</h4>
                    <div>
                        {#each selected.expertise as item (item.title)}
                            <article><strong>{item.title}</strong><span>{item.description}</span></article>
                        {/each}
                    </div>
                </div>
            {/key}
        </div>
    </article>

    <nav class="team-selector-section" aria-labelledby="team-selector-title">
        <div class="selector-heading">
            <h3 id="team-selector-title">Pilih Tokoh Tim Kami</h3>
            <div class="selector-controls" aria-label="Kontrol daftar tim">
                <button type="button" aria-label="Lihat profil sebelumnya" aria-controls="selected-team-profile team-selector" disabled={selectedIndex === 0} onclick={() => selectAdjacent(-1)}>←</button>
                <button type="button" aria-label="Lihat profil berikutnya" aria-controls="selected-team-profile team-selector" disabled={selectedIndex === TEAM_MEMBERS.length - 1} onclick={() => selectAdjacent(1)}>→</button>
            </div>
        </div>

        <div id="team-selector" class="team-selector" bind:this={selectorTrack}>
            {#each TEAM_MEMBERS as member, index (member.id)}
                <button
                    type="button"
                    class="selector-card"
                    class:selected={selectedIndex === index}
                    class:long-name={member.name.length > 32}
                    aria-label={`Pilih profil ${member.name}, ${member.role}`}
                    aria-pressed={selectedIndex === index}
                    aria-controls="selected-team-profile"
                    onclick={() => selectMember(index)}
                    onkeydown={(event) => handleSelectorKeydown(event, index)}
                >
                    <img src={member.image} alt="" loading="lazy" width="154" height="166" />
                    <span class="member-copy">
                        <strong>{member.name}</strong>
                        <small>{member.role}</small>
                    </span>
                    {#if selectedIndex === index}<em>Terpilih</em>{/if}
                </button>
            {/each}
        </div>
    </nav>
</section>

<style>
    .eyebrow::before { display: none; }
    .team-section { padding-block: clamp(48px, 4vw, 56px); }
    .team-heading { max-width: 760px; margin-bottom: clamp(28px, 3vw, 36px); }
    .team-heading h2 { margin: 0; font-size: clamp(1.9rem, 3.5vw, 2.65rem); line-height: 1.1; letter-spacing: -.04em; }
    .team-heading > p:last-child { max-width: 690px; margin: 15px 0 0; color: var(--muted); }

    .featured-profile { padding: clamp(20px, 2.2vw, 28px); border: 1px solid var(--border); border-top: 2px solid var(--accent); border-radius: 14px; background: var(--surface); }
    .featured-topline { display: flex; align-items: center; justify-content: space-between; gap: 16px; color: var(--accent-text); font-size: .7rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .featured-topline-actions { display: flex; align-items: center; gap: 12px; }
    .featured-counter { white-space: nowrap; }
    .featured-profile-controls { display: flex; gap: 6px; }
    .profile-nav-button { display: grid; width: 36px; height: 36px; flex: 0 0 auto; padding: 0; place-items: center; color: var(--text); border: 1px solid var(--border); border-radius: 8px; background: var(--surface); font-size: 1rem; font-weight: 600; letter-spacing: normal; line-height: 1; cursor: pointer; transition: color 160ms ease, border-color 160ms ease, background 160ms ease, opacity 160ms ease; }
    .profile-nav-button:hover:not(:disabled) { color: var(--accent-text); border-color: var(--accent-text); background: var(--surface-selected); }
    .profile-nav-button:active:not(:disabled) { background: color-mix(in srgb, var(--surface-selected) 78%, var(--surface)); }
    .profile-nav-button:disabled { color: var(--muted); border-color: var(--border); background: var(--surface-muted); opacity: .46; cursor: not-allowed; }
    .portrait-nav-button { display: none; }
    .featured-main { display: grid; grid-template-columns: minmax(250px, .72fr) minmax(0, 1.6fr); align-items: start; gap: clamp(26px, 3.5vw, 44px); margin-top: clamp(18px, 2vw, 22px); }
    .featured-portrait-navigation { width: 100%; max-width: 330px; }
    .featured-portrait { width: 100%; max-width: 330px; overflow: hidden; border: 1px solid var(--border); border-radius: 12px; background: var(--surface-muted); }
    .featured-portrait img { width: 100%; height: auto; aspect-ratio: 4 / 4.55; object-fit: cover; object-position: center top; }
    .featured-details { min-width: 0; }
    .featured-portrait, .featured-details, .expertise { animation: profile-in 180ms ease both; }
    .featured-identity h3 { max-width: 720px; margin: 0; font-size: clamp(1.9rem, 3.6vw, 3.05rem); line-height: 1.03; letter-spacing: -.05em; text-wrap: balance; }
    .featured-identity h3.long-name { font-size: clamp(1.7rem, 3vw, 2.65rem); }
    .credentials, .role, .description { margin: 0; }
    .credentials { margin-top: 8px; color: var(--muted); font-size: .85rem; }
    .role { margin-top: 6px; color: var(--accent-text); font-size: .91rem; font-weight: 700; }
    .description { max-width: 650px; margin-top: 14px; color: var(--muted); font-size: clamp(.92rem, 1.15vw, 1rem); line-height: 1.58; }
    .profile-metadata { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 24px; margin: 18px 0 0; border-top: 1px solid var(--border); }
    .profile-metadata div { min-width: 0; padding: 11px 0; border-bottom: 1px solid var(--border); }
    .profile-metadata .metadata-wide { grid-column: 1 / -1; padding-left: 0; border-left: 0; }
    .profile-metadata dt, .expertise h4 { margin: 0; color: var(--accent-text); font-size: .65rem; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; }
    .profile-metadata dd { margin: 4px 0 0; font-size: .88rem; line-height: 1.45; }
    .expertise { margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--border); }
    .expertise > div { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; margin-top: 10px; }
    .expertise article { min-width: 0; padding: 12px; border: 1px solid var(--border); border-radius: 9px; background: color-mix(in srgb, var(--surface-muted) 70%, var(--surface)); }
    .expertise strong, .expertise span { display: block; }
    .expertise strong { font-size: .82rem; line-height: 1.28; }
    .expertise span { margin-top: 4px; color: var(--muted); font-size: .72rem; line-height: 1.38; }

    .team-selector-section { margin-top: clamp(24px, 3vw, 32px); }
    .selector-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 10px; }
    .selector-heading h3 { margin: 0; font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .selector-controls { display: flex; gap: 8px; }
    .selector-controls button { display: grid; width: 44px; height: 44px; padding: 0; place-items: center; color: var(--text); border: 1px solid var(--border); border-radius: 8px; background: var(--surface); font-size: 1rem; cursor: pointer; transition: border-color 160ms ease, background 160ms ease, opacity 160ms ease; }
    .selector-controls button:hover:not(:disabled) { border-color: var(--border-control); background: var(--surface-muted); }
    .selector-controls button:disabled { color: var(--muted); border-color: var(--border); background: var(--surface-muted); opacity: .48; cursor: not-allowed; }
    .team-selector { display: grid; grid-auto-flow: column; grid-auto-columns: clamp(120px, 10vw, 128px); gap: 10px; padding: 3px; overflow-x: auto; overscroll-behavior-inline: contain; scroll-padding-inline: 3px; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; }
    .team-selector::-webkit-scrollbar { display: none; width: 0; height: 0; }
    .selector-card { position: relative; display: grid; min-width: 0; padding: 0 0 9px; overflow: hidden; color: var(--text); border: 1px solid var(--border); border-radius: 10px; background: var(--surface); text-align: left; scroll-snap-align: start; cursor: pointer; transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease; }
    .selector-card:hover { border-color: var(--border-control); background: var(--surface-muted); }
    .selector-card:focus-visible, .selector-controls button:focus-visible, .profile-nav-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    .selector-card.selected { border-color: var(--accent); background: color-mix(in srgb, var(--surface) 88%, var(--surface-selected)); box-shadow: inset 0 0 0 1px var(--accent); }
    .selector-card img { width: 100%; height: auto; aspect-ratio: 4 / 4.15; object-fit: cover; object-position: center top; background: var(--surface-muted); transition: transform 180ms ease; }
    .selector-card:hover img { transform: scale(1.015); }
    .member-copy { display: grid; gap: 4px; padding: 8px 8px 0; }
    .member-copy strong { font-size: .74rem; line-height: 1.24; letter-spacing: -.015em; }
    .selector-card.long-name .member-copy { padding-inline: 6px; }
    .selector-card.long-name .member-copy strong { font-size: .7rem; letter-spacing: -.025em; }
    .member-copy small { color: var(--muted); font-size: .64rem; line-height: 1.3; }
    .selector-card em { position: absolute; top: 6px; left: 6px; padding: 2px 5px; color: var(--on-accent); border-radius: 5px; background: var(--accent); font-size: .53rem; font-style: normal; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }

    @keyframes profile-in { from { opacity: .7; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 900px) {
        .featured-main { grid-template-columns: minmax(210px, .68fr) minmax(0, 1.32fr); gap: 24px; }
        .featured-portrait-navigation, .featured-portrait { max-width: 300px; }
        .featured-identity h3 { font-size: clamp(1.7rem, 4.6vw, 2.45rem); }
        .featured-identity h3.long-name { font-size: clamp(1.55rem, 4vw, 2.15rem); }
    }

    @media (max-width: 768px) {
        .team-section { padding-block: 48px; }
        .team-heading h2 { font-size: clamp(1.625rem, 7vw, 1.875rem); }
        .featured-profile { padding: 16px; }
        .featured-main { grid-template-columns: 1fr; gap: 14px; }
        .featured-profile-controls { display: none; }
        .featured-portrait-navigation { display: grid; width: calc(100% + 16px); max-width: none; grid-template-columns: 44px minmax(0, 210px) 44px; align-items: center; justify-content: center; gap: 6px; margin-inline: -8px; }
        .portrait-nav-button { display: grid; width: 44px; height: 44px; }
        .featured-portrait { width: min(100%, clamp(160px, 52vw, 210px)); max-width: 210px; margin-inline: auto; }
        .featured-identity h3 { font-size: clamp(1.5rem, 6vw, 1.75rem); line-height: 1.06; }
        .featured-identity h3.long-name { font-size: clamp(1.4rem, 5.6vw, 1.65rem); line-height: 1.06; }
        .description { margin-top: 12px; line-height: 1.55; }
        .profile-metadata { grid-template-columns: 1fr; margin-top: 16px; column-gap: 0; }
        .profile-metadata .metadata-wide { grid-column: auto; }
        .profile-metadata div { padding-block: 10px; }
        .expertise { margin-top: 16px; padding-top: 14px; }
        .expertise > div { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .expertise article { padding: 10px; }
        .selector-controls { display: none; }
        .team-selector { grid-auto-columns: 128px; }
    }

    @media (max-width: 360px) {
        .featured-profile { padding: 14px; }
        .featured-topline { font-size: .64rem; }
        .featured-portrait { width: min(100%, clamp(160px, 54vw, 190px)); }
        .expertise > div { grid-template-columns: 1fr; }
    }

    @media (prefers-reduced-motion: reduce) {
        .featured-portrait, .featured-details, .expertise { animation: none; }
        .selector-card img { transition: none; }
    }
</style>
