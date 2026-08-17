<script lang="ts">
	import { navigating } from '$app/stores';

	let progress = $state(0);
	let visible = $state(false);
	let timer: ReturnType<typeof setInterval> | null = null;
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}

		if ($navigating) {
			// Start loading
			visible = true;
			progress = 15;

			// Animate progress incrementally
			timer = setInterval(() => {
				progress = Math.min(progress + (90 - progress) * 0.08, 90);
			}, 100);
		} else if (visible) {
			// Navigation complete – snap to 100% and fade out
			if (timer) clearInterval(timer);
			progress = 100;

			hideTimer = setTimeout(() => {
				visible = false;
				progress = 0;
				hideTimer = null;
			}, 350);
		}

		return () => {
			if (timer) clearInterval(timer);
			if (hideTimer) clearTimeout(hideTimer);
		};
	});
</script>

{#if visible}
	<div class="nav-loader" aria-hidden="true">
		<div class="nav-loader-bar" style:width="{progress}%"></div>
	</div>
{/if}

<style>
	.nav-loader {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		z-index: 9999;
		pointer-events: none;
	}

	.nav-loader-bar {
		height: 100%;
		background: var(--accent);
		border-radius: 0 2px 2px 0;
		transition: width var(--motion-micro) var(--ease-out), opacity var(--motion-micro) ease;
	}
</style>
