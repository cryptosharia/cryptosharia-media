<script lang="ts">
    import { onMount } from 'svelte';
    import { cubicIn, cubicOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { reveal } from '$lib/actions/reveal';
    import { TEAM_MEMBERS, type TeamMember } from '$lib/team';

    const chiefExecutive = TEAM_MEMBERS.find((member) => member.id === 'sholahuddin');
    const members = chiefExecutive
        ? [chiefExecutive, ...TEAM_MEMBERS.filter((member) => member.id !== chiefExecutive.id)]
        : TEAM_MEMBERS;
    let selectedIndex = $state(0);
    let selectorTrack: HTMLDivElement;
    let transitionDirection = $state<1 | -1>(1);
    let reducedMotion = $state(false);
    const selected = $derived(members[selectedIndex]);

    onMount(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateMotionPreference = () => { reducedMotion = mediaQuery.matches; };
        updateMotionPreference();
        mediaQuery.addEventListener('change', updateMotionPreference);
        return () => mediaQuery.removeEventListener('change', updateMotionPreference);
    });

    function selectMember(index: number, ensureVisible = false) {
        if (index < 0 || index >= members.length) return;
        if (index === selectedIndex) {
            if (ensureVisible) scrollMemberIntoView(index);
            return;
        }

        transitionDirection = index > selectedIndex ? 1 : -1;
        selectedIndex = index;
        if (ensureVisible) scrollMemberIntoView(index);
    }

    function compactMemberName(member: TeamMember) {
        const hasHonorific = member.name.startsWith('Ust. ');
        const words = member.name.replace(/^Ust\.\s+/, '').split(' ');
        if (hasHonorific) return `Ust. ${words[0]}`;
        if ((words[0] === 'Muhammad' || words[0] === 'Mokhamad') && words[1]) return `M. ${words[1]}`;
        if (words[0].length >= 8) return words[0];
        return words.slice(0, 2).join(' ');
    }

    function scrollMemberIntoView(index: number) {
        requestAnimationFrame(() => {
            const buttons = selectorTrack?.querySelectorAll<HTMLButtonElement>('.selector-card');
            const button = buttons?.[index];
            if (!selectorTrack || !button || selectorTrack.clientWidth === 0) return;

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
        if (nextIndex < 0 || nextIndex >= members.length) return;

        selectMember(nextIndex, true);
    }

    function handleSelectorKeydown(event: KeyboardEvent, index: number, ensureVisible: boolean) {
        let nextIndex: number | undefined;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % members.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + members.length) % members.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = members.length - 1;
        if (nextIndex === undefined) return;

        event.preventDefault();
        selectMember(nextIndex, ensureVisible);

        const group = (event.currentTarget as HTMLButtonElement).closest<HTMLElement>('[role="group"]');
        const buttons = group?.querySelectorAll<HTMLButtonElement>('[data-team-selector]');
        buttons?.[nextIndex]?.focus({ preventScroll: true });
    }
</script>

<section id="tim" class="container section team-section" aria-labelledby="tim-title" use:reveal={{ distance: 18, threshold: 0.08 }}>
    <div class="team-header">
        <div class="team-heading">
            <p class="eyebrow">Orang di balik CryptoSharia</p>
            <h2 id="tim-title">Kenali Tim CryptoSharia</h2>
            <p>Pilih profil untuk mengenal peran, fokus, dan kontribusi setiap pengurus dalam mengembangkan CryptoSharia.</p>
        </div>

        <div class="quick-selector-panel" role="group" aria-labelledby="quick-selector-title">
            <div class="quick-selector-heading">
                <h3 id="quick-selector-title">Pilih Profil</h3>
                <span>{members.length} profil</span>
            </div>
            <div id="quick-team-selector" class="quick-selector-grid">
                {#each members as member, index (member.id)}
                    <button
                        type="button"
                        class="quick-profile"
                        class:selected={selectedIndex === index}
                        class:long-name={compactMemberName(member).length > 10 && !compactMemberName(member).includes(' ')}
                        data-team-selector
                        aria-label={`Tampilkan profil ${member.name}`}
                        aria-pressed={selectedIndex === index}
                        aria-controls="selected-team-profile"
                        tabindex={selectedIndex === index ? 0 : -1}
                        title={member.name}
                        onclick={() => selectMember(index)}
                        onkeydown={(event) => handleSelectorKeydown(event, index, false)}
                    >
                        <img src={member.image} alt="" loading="lazy" width="48" height="58" />
                        <span class="quick-profile-copy">
                            <strong>{compactMemberName(member)}</strong>
                            <small>{member.role}</small>
                        </span>
                    </button>
                {/each}
            </div>
        </div>
    </div>

    <div class="mobile-team-selector-section" role="group" aria-labelledby="team-selector-title">
        <div class="selector-heading">
            <h3 id="team-selector-title">Pilih Profil</h3>
            <span>Geser untuk melihat semua</span>
        </div>

        <div id="team-selector" class="team-selector" bind:this={selectorTrack}>
            {#each members as member, index (member.id)}
                <button
                    type="button"
                    class="selector-card"
                    class:selected={selectedIndex === index}
                    class:long-name={member.name.length > 32}
                    data-team-selector
                    aria-label={`Tampilkan profil ${member.name}`}
                    aria-pressed={selectedIndex === index}
                    aria-controls="selected-team-profile"
                    tabindex={selectedIndex === index ? 0 : -1}
                    onclick={() => selectMember(index, true)}
                    onkeydown={(event) => handleSelectorKeydown(event, index, true)}
                >
                    <img src={member.image} alt="" loading="lazy" width="56" height="60" />
                    <span class="member-copy">
                        <strong>{member.name}</strong>
                        <small>{member.role}</small>
                    </span>
                </button>
            {/each}
        </div>
    </div>

    <article id="selected-team-profile" class="featured-profile" aria-label={`Profil ${selected.name}`}>
        <p class="sr-only" aria-live="polite" aria-atomic="true">
            Profil {selectedIndex + 1} dari {members.length}: {selected.name}, {selected.role}
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
                            aria-controls="selected-team-profile quick-team-selector team-selector"
                            disabled={selectedIndex === 0}
                            onclick={() => selectAdjacent(-1)}
                        ><span aria-hidden="true">←</span></button>
                        <button
                            class="profile-nav-button"
                            type="button"
                            aria-label="Lihat profil berikutnya"
                            aria-controls="selected-team-profile quick-team-selector team-selector"
                            disabled={selectedIndex === members.length - 1}
                            onclick={() => selectAdjacent(1)}
                        ><span aria-hidden="true">→</span></button>
                    </div>
                    <span class="featured-counter-shell" aria-hidden="true">
                        {#key selected.id}
                            <span
                                class="featured-counter"
                                in:fly={{ y: reducedMotion ? 0 : 4, duration: reducedMotion ? 0 : 180, delay: reducedMotion ? 0 : 20, easing: cubicOut }}
                                out:fly={{ y: reducedMotion ? 0 : -4, duration: reducedMotion ? 0 : 90, easing: cubicIn }}
                            >{String(selectedIndex + 1).padStart(2, '0')} / {String(members.length).padStart(2, '0')}</span>
                        {/key}
                    </span>
                </div>
            </div>

            <div class="featured-main">
                <div class="featured-portrait-navigation">
                    <button
                        class="profile-nav-button portrait-nav-button"
                        type="button"
                        aria-label="Lihat profil sebelumnya"
                        aria-controls="selected-team-profile quick-team-selector team-selector"
                        disabled={selectedIndex === 0}
                        onclick={() => selectAdjacent(-1)}
                    ><span aria-hidden="true">←</span></button>

                    {#key selected.id}
                    <div
                        class="featured-portrait"
                        in:fly={{ x: reducedMotion ? 0 : transitionDirection * 14, duration: reducedMotion ? 0 : 260, delay: reducedMotion ? 0 : 10, easing: cubicOut }}
                        out:fly={{ x: reducedMotion ? 0 : transitionDirection * -12, duration: reducedMotion ? 0 : 130, easing: cubicIn }}
                    >
                        <img class="portrait-image" src={selected.image} alt={`Foto ${selected.name}`} width="360" height="450" />
                    </div>
                    {/key}

                    <button
                        class="profile-nav-button portrait-nav-button"
                        type="button"
                        aria-label="Lihat profil berikutnya"
                        aria-controls="selected-team-profile quick-team-selector team-selector"
                        disabled={selectedIndex === members.length - 1}
                        onclick={() => selectAdjacent(1)}
                    ><span aria-hidden="true">→</span></button>
                </div>

                {#key selected.id}
                    <div
                        class="featured-details"
                        in:fly={{ x: reducedMotion ? 0 : transitionDirection * 12, duration: reducedMotion ? 0 : 230, delay: reducedMotion ? 0 : 35, easing: cubicOut }}
                        out:fly={{ x: reducedMotion ? 0 : transitionDirection * -10, duration: reducedMotion ? 0 : 120, easing: cubicIn }}
                    >
                        <div class="featured-identity">
                            <h3 class:long-name={selected.name.length > 32}>{selected.name}</h3>
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
                <div
                    class="expertise"
                    in:fly={{ x: reducedMotion ? 0 : transitionDirection * 10, duration: reducedMotion ? 0 : 220, delay: reducedMotion ? 0 : 70, easing: cubicOut }}
                    out:fly={{ x: reducedMotion ? 0 : transitionDirection * -8, duration: reducedMotion ? 0 : 100, easing: cubicIn }}
                >
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
</section>

<style>
    .eyebrow::before { display: none; }
    .team-section { padding-block: clamp(48px, 4vw, 56px); overflow-anchor: none; }
    .team-header { display: grid; gap: 28px; margin-bottom: clamp(28px, 3vw, 36px); }
    .team-heading { max-width: 760px; }
    .team-heading h2 { margin: 0; font-size: clamp(1.9rem, 3.5vw, 2.65rem); line-height: 1.1; letter-spacing: -.04em; }
    .team-heading > p:last-child { max-width: 690px; margin: 15px 0 0; color: var(--muted); }

    .quick-selector-panel { min-width: 0; }
    .quick-selector-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 10px; }
    .quick-selector-heading h3 { margin: 0; font-size: .7rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .quick-selector-heading span { color: var(--muted); font-size: .72rem; white-space: nowrap; }
    .quick-selector-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(132px, 1fr)); gap: 8px; }
    .quick-profile { position: relative; display: grid; min-width: 0; min-height: 74px; grid-template-columns: 44px minmax(0, 1fr); align-items: center; gap: 8px; padding: 7px; overflow: hidden; color: var(--text); border: 1px solid var(--border); border-radius: 10px; background: var(--surface); text-align: left; cursor: pointer; transform: translateY(0); transition: color var(--motion-micro) var(--ease-standard), border-color var(--motion-micro) var(--ease-standard), background var(--motion-micro) var(--ease-standard), box-shadow var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard); }
    .quick-profile::after { position: absolute; right: 8px; bottom: -1px; left: 8px; height: 2px; border-radius: 999px 999px 0 0; background: var(--accent); content: ''; opacity: 0; transform: scaleX(.45); transition: opacity var(--motion-micro) var(--ease-standard), transform var(--motion-ui) var(--ease-out); }
    .quick-profile:hover, .quick-profile:focus-visible { color: var(--accent-text); border-color: color-mix(in srgb, var(--accent) 60%, var(--border)); background: color-mix(in srgb, var(--surface-selected) 46%, var(--surface)); transform: translateY(-2px); }
    .quick-profile.selected { color: var(--text); border-color: color-mix(in srgb, var(--accent) 72%, var(--border)); background: color-mix(in srgb, var(--surface-selected) 62%, var(--surface)); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 34%, transparent); }
    .quick-profile.selected::after { opacity: 1; transform: scaleX(1); }
    .quick-profile img { width: 44px; height: 56px; object-fit: cover; object-position: center top; border: 1px solid var(--border); border-radius: 8px; background: var(--surface-muted); filter: saturate(.78); opacity: .72; transform: translateY(0) scale(1); transition: border-color var(--motion-micro) var(--ease-standard), filter var(--motion-micro) var(--ease-standard), opacity var(--motion-micro) var(--ease-standard), transform var(--motion-ui) var(--ease-out); }
    .quick-profile:hover img, .quick-profile:focus-visible img, .quick-profile.selected img { border-color: color-mix(in srgb, var(--accent) 56%, var(--border)); filter: none; opacity: 1; transform: translateY(-1px) scale(1.025); }
    .quick-profile-copy { display: grid; min-width: 0; gap: 3px; }
    .quick-profile-copy strong, .quick-profile-copy small { display: -webkit-box; min-width: 0; overflow: hidden; -webkit-box-orient: vertical; }
    .quick-profile-copy strong { font-size: .66rem; font-weight: 750; line-height: 1.2; letter-spacing: -.015em; -webkit-line-clamp: 2; line-clamp: 2; }
    .quick-profile-copy small { color: var(--muted); font-size: .59rem; line-height: 1.22; -webkit-line-clamp: 2; line-clamp: 2; }
    .quick-profile.long-name .quick-profile-copy strong { font-size: .6rem; letter-spacing: -.025em; }
    .quick-profile:focus-visible { outline: 3px solid var(--accent-text); outline-offset: 2px; }

    .featured-profile { padding: clamp(20px, 2.2vw, 28px); border: 1px solid var(--border); border-top: 2px solid var(--accent); border-radius: 14px; background: var(--surface); }
    .featured-topline { display: flex; align-items: center; justify-content: space-between; gap: 16px; color: var(--accent-text); font-size: .7rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .featured-topline-actions { display: flex; align-items: center; gap: 12px; }
    .featured-counter-shell { display: grid; min-width: 48px; overflow: hidden; text-align: right; }
    .featured-counter { grid-area: 1 / 1; display: inline-block; font-variant-numeric: tabular-nums; white-space: nowrap; }
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
    .portrait-image { animation: portrait-settle 310ms var(--ease-out) 10ms both; }
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
    .featured-details .featured-identity h3 { animation: detail-in 220ms var(--ease-out) 20ms both; }
    .featured-details .credentials, .featured-details .role { animation: detail-in 220ms var(--ease-out) 50ms both; }
    .featured-details .description { animation: detail-in 220ms var(--ease-out) 80ms both; }
    .featured-details .profile-metadata { animation: detail-in 220ms var(--ease-out) 105ms both; }
    .expertise h4 { animation: detail-in 200ms var(--ease-out) 35ms both; }
    .expertise article { animation: detail-in 200ms var(--ease-out) 55ms both; }
    .expertise article:nth-child(2) { animation-delay: 70ms; }
    .expertise article:nth-child(3) { animation-delay: 85ms; }
    .expertise article:nth-child(4) { animation-delay: 100ms; }

    .mobile-team-selector-section { display: none; }
    .selector-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 10px; }
    .selector-heading h3 { margin: 0; font-size: .7rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .selector-heading span { color: var(--muted); font-size: .7rem; }
    .team-selector { display: grid; grid-auto-flow: column; grid-auto-columns: min(74vw, 250px); gap: 9px; padding: 3px; overflow-x: auto; overscroll-behavior-inline: contain; scroll-padding-inline: 3px; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; }
    .team-selector::-webkit-scrollbar { display: none; width: 0; height: 0; }
    .selector-card { position: relative; display: grid; min-width: 0; min-height: 76px; grid-template-columns: 54px minmax(0, 1fr); align-items: center; gap: 10px; padding: 8px; overflow: hidden; color: var(--text); border: 1px solid var(--border); border-radius: 10px; background: var(--surface); text-align: left; scroll-snap-align: center; cursor: pointer; transform: translateY(0); transition: border-color var(--motion-micro) var(--ease-standard), background var(--motion-micro) var(--ease-standard), box-shadow var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard); }
    .selector-card::after { position: absolute; right: 10px; bottom: -1px; left: 10px; height: 2px; border-radius: 999px 999px 0 0; background: var(--accent); content: ''; opacity: 0; transform: scaleX(.45); transition: opacity var(--motion-micro) var(--ease-standard), transform var(--motion-ui) var(--ease-out); }
    .selector-card:hover, .selector-card:focus-visible { border-color: var(--border-control); background: var(--surface-muted); transform: translateY(-1px); }
    .selector-card:focus-visible, .profile-nav-button:focus-visible { outline: 3px solid var(--accent-text); outline-offset: 2px; }
    .selector-card.selected { border-color: var(--accent); background: color-mix(in srgb, var(--surface) 88%, var(--surface-selected)); box-shadow: inset 0 0 0 1px var(--accent); }
    .selector-card.selected::after { opacity: 1; transform: scaleX(1); }
    .selector-card img { width: 54px; height: 60px; object-fit: cover; object-position: center top; border-radius: 8px; background: var(--surface-muted); filter: saturate(.82); opacity: .78; transform: scale(1); transition: filter var(--motion-micro) var(--ease-standard), opacity var(--motion-micro) var(--ease-standard), transform var(--motion-ui) var(--ease-out); }
    .selector-card:hover img, .selector-card:focus-visible img, .selector-card.selected img { filter: none; opacity: 1; transform: scale(1.025); }
    .member-copy { display: grid; min-width: 0; gap: 4px; }
    .member-copy strong { font-size: .75rem; line-height: 1.24; letter-spacing: -.015em; }
    .selector-card.long-name .member-copy strong { font-size: .7rem; letter-spacing: -.025em; }
    .member-copy small { color: var(--muted); font-size: .64rem; line-height: 1.3; }

    @keyframes portrait-settle { from { transform: scale(1.018); } to { transform: scale(1); } }
    @keyframes detail-in { from { opacity: .3; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

    @media (min-width: 1200px) {
        .team-header { grid-template-columns: minmax(0, .9fr) minmax(420px, 1.1fr); align-items: start; gap: clamp(36px, 4vw, 52px); }
    }

    @media (min-width: 768px) and (max-width: 1199px) {
        .quick-selector-panel { padding-top: 22px; border-top: 1px solid var(--border); }
    }

    @media (max-width: 900px) {
        .featured-main { grid-template-columns: minmax(210px, .68fr) minmax(0, 1.32fr); gap: 24px; }
        .featured-portrait-navigation, .featured-portrait { max-width: 300px; }
        .featured-identity h3 { font-size: clamp(1.7rem, 4.6vw, 2.45rem); }
        .featured-identity h3.long-name { font-size: clamp(1.55rem, 4vw, 2.15rem); }
    }

    @media (max-width: 767px) {
        .team-section { padding-block: 48px; }
        .team-header { margin-bottom: 28px; }
        .team-heading h2 { font-size: clamp(1.625rem, 7vw, 1.875rem); }
        .quick-selector-panel { display: none; }
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
        .mobile-team-selector-section { display: block; margin-bottom: 24px; }
    }

    @media (max-width: 360px) {
        .featured-profile { padding: 14px; }
        .featured-topline { font-size: .64rem; }
        .featured-portrait { width: min(100%, clamp(160px, 54vw, 190px)); }
        .expertise > div { grid-template-columns: 1fr; }
    }

    @media (prefers-reduced-motion: reduce) {
        .portrait-image,
        .featured-details .featured-identity h3,
        .featured-details .credentials,
        .featured-details .role,
        .featured-details .description,
        .featured-details .profile-metadata,
        .expertise h4,
        .expertise article { animation: none !important; }
        .quick-profile, .quick-profile::after, .quick-profile img,
        .selector-card, .selector-card::after, .selector-card img { transition: none; }
        .quick-profile:hover, .quick-profile:focus-visible,
        .selector-card:hover, .selector-card:focus-visible { transform: none; }
        .quick-profile:hover img, .quick-profile:focus-visible img, .quick-profile.selected img,
        .selector-card:hover img, .selector-card:focus-visible img, .selector-card.selected img { transform: none; }
    }
</style>
