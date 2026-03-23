<script lang="ts">
	import { navigating } from '$app/stores';

	let p = $state(0);
	let visible = $state(false);
	let timer: ReturnType<typeof setInterval>;

	$effect(() => {
		if ($navigating) {
			visible = true;
			p = 0.1;
			clearInterval(timer);
			timer = setInterval(() => {
				if (p >= 0.9) return;
				p += (1 - p) * 0.1;
			}, 200);
		} else {
			p = 1;
			clearInterval(timer);
			setTimeout(() => {
				visible = false;
				setTimeout(() => {
					if (!visible) p = 0;
				}, 200);
			}, 300);
		}
		return () => clearInterval(timer);
	});
</script>

<div
	class="progress-bar"
	class:visible
	style="--progress: {p * 100}%;"
></div>

<style>
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 4px;
		background: linear-gradient(90deg, var(--brand), var(--accent));
		z-index: 9999;
		width: var(--progress);
		opacity: 0;
		transition: width 0.2s ease-out, opacity 0.3s ease-out;
		pointer-events: none;
	}
	.progress-bar.visible {
		opacity: 1;
	}
</style>
