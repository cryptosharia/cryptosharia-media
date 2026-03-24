<script lang="ts">
	import { navigating } from '$app/stores';

	let progress = $state(0);
	let visible = $state(false);
	let timer: ReturnType<typeof setInterval> | null = null;

	$effect(() => {
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

			setTimeout(() => {
				visible = false;
				progress = 0;
			}, 350);
		}

		return () => {
			if (timer) clearInterval(timer);
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
		background: linear-gradient(90deg, var(--brand), var(--accent));
		border-radius: 0 2px 2px 0;
		box-shadow: 0 0 10px rgba(252, 192, 0, 0.5), 0 0 5px rgba(245, 102, 10, 0.3);
		transition: width 0.15s ease-out;
	}
</style>
