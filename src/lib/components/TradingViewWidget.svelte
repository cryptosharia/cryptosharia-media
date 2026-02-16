<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { theme } from "$lib/stores/theme";

    interface Props {
        symbol: string;
    }

    let { symbol }: Props = $props();

    let containerId = `tv-widget-${Math.random().toString(36).substring(2, 9)}`;
    let scriptLoaded = false;

    // Default to BINANCE if no exchange specified, assuming USDT pair
    // If symbol has no exchange prefix, prepend BINANCE: and append USDT
    // Logic can be improved based on actual data needs
    let formattedSymbol = $derived(
        symbol.includes(":") ? symbol : `BINANCE:${symbol}USDT`,
    );

    function initWidget() {
        if (!browser || !window.TradingView) return;

        new window.TradingView.widget({
            autosize: true,
            symbol: formattedSymbol,
            interval: "D",
            timezone: "Asia/Jakarta",
            theme: $theme ? "dark" : "light", // true = dark, false = light
            style: "1",
            locale: "id",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: containerId,
            hide_side_toolbar: false,
        });
    }

    onMount(() => {
        if (!browser) return;

        // Check if script is already loaded
        if (window.TradingView) {
            initWidget();
        } else {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/tv.js";
            script.async = true;
            script.onload = () => {
                scriptLoaded = true;
                initWidget();
            };
            document.head.appendChild(script);
        }
    });

    // Reactive theme update
    $effect(() => {
        // Re-init widget when theme changes or symbol changes
        // Using $theme and formattedSymbol as dependencies
        if (browser && window.TradingView) {
            // Check if container exists to avoid errors during unmount/remount
            const container = document.getElementById(containerId);
            if (container) {
                // Clear container to prevent duplicate widgets if necessary,
                // though TradingView widget usually replaces content.
                container.innerHTML = "";
                initWidget();
            }
        }
    });
</script>

<div class="tradingview-widget-container">
    <div id={containerId} style="height: 500px; width: 100%;"></div>
</div>

<style>
    .tradingview-widget-container {
        height: 500px;
        width: 100%;
        border-radius: var(--radius);
        overflow: hidden;
        margin: 2rem 0;
        border: 1px solid var(--border-color);
    }
</style>
