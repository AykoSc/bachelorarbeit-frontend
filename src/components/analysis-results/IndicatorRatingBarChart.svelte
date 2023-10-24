<script lang="ts">
    import BarChart from "../BarChart.svelte";
    import type {ChartData, ChartOptions} from "chart.js";
    import {fetchIndicatorStats} from "../../lib/api";
    import type {IndicatorStats} from "../../lib/DBItems";

    export let selectedCompany: string;
    export let selectedDateRange: string;
    export let selectedIndicator: string;
    export let maxSentiment: number;

    let userFeedback = {message: "", isSuccess: true};

    let chartData: ChartData<"bar"> = {
        labels: [],
        datasets: []
    };
    let chartOptions: ChartOptions<"bar"> = {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true,
                max: 10
            }
        }
    };

    const fetchAllIndicatorGradesHandler = async (selectedCompany: string, selectedDateRange: string, selectedIndicator: string, maxSentiment: number) => {
        try {
            let response: Array<IndicatorStats>
            if (selectedIndicator !== "") {
                response = await fetchIndicatorStats(selectedCompany, selectedDateRange, maxSentiment, selectedIndicator);
            } else {
                response = await fetchIndicatorStats(selectedCompany, selectedDateRange, maxSentiment);
            }

            const indicators = response.map(item => item.indicator_name);

            const data = response.map(item => {
                const min = item.indicator_min;
                const avg = item.indicator_avg;
                const max = item.indicator_max;
                return [min, avg, max];
            });

            chartData = {
                labels: indicators,
                datasets: [
                    {
                        label: "Minimum",
                        borderWidth: 1,
                        data: data.map(values => values[0]),
                        backgroundColor: "rgba(255, 100, 130, 0.2)"
                    },
                    {
                        label: "Durchschnitt",
                        borderWidth: 1,
                        data: data.map(values => values[1]),
                        backgroundColor: "rgba(55, 160, 230, 0.2)"
                    },
                    {
                        label: "Maximum",
                        borderWidth: 1,
                        data: data.map(values => values[2]),
                        backgroundColor: "rgba(75, 190, 190, 0.2)"
                    }
                ]
            };
        } catch (error) {
            userFeedback = {message: error.message, isSuccess: false};
            console.error(error.message);
        }
    };

    $: fetchAllIndicatorGradesHandler(selectedCompany, selectedDateRange, selectedIndicator, maxSentiment);
</script>

<div>
    <BarChart chartData={chartData} chartOptions={chartOptions}/>

    <p class:error={!userFeedback.isSuccess} class:success={userFeedback.isSuccess}>{userFeedback.message}</p>
</div>