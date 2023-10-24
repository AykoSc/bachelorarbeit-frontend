<script lang="ts">
    import Chart from "chart.js/auto";
    import {onMount} from "svelte";
    import type {ChartData, ChartOptions} from "chart.js";

    export let chartData: ChartData;
    export let chartOptions: ChartOptions;

    let ctx: HTMLCanvasElement | null = null;
    let chart: Chart;

    onMount(() => {
        ctx = document.getElementById("lineChart") as HTMLCanvasElement;
    });

    function createChart(chartData: ChartData, chartOptions: ChartOptions) {
        chart = new Chart(ctx, {
            type: "line",
            data: chartData,
            options: chartOptions
        });
    }

    $: {
        if (chart) {
            chart.destroy();
        }
        if (ctx) {
            createChart(chartData, chartOptions);
        }
    }
</script>

<div>
    <canvas id="lineChart"></canvas>
</div>

