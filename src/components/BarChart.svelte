<script lang="ts">
    import Chart from "chart.js/auto";
    import {onMount} from "svelte";
    import type {ChartData, ChartOptions} from "chart.js";

    export let chartData: ChartData;
    export let chartOptions: ChartOptions;

    let ctx = null;
    let chart: Chart;

    onMount(() => {
        ctx = document.getElementById("barChart") as HTMLCanvasElement;
    });

    function createChart(chartData: ChartData, chartOptions: ChartOptions) {
        chart = new Chart(ctx, {
            type: "bar",
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
    <canvas id="barChart"></canvas>
</div>
