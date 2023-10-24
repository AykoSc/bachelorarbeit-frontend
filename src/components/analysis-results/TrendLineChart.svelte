<script lang="ts">
    import {fetchNewsOfIndicator} from "../../lib/api";
    import LineChart from "../LineChart.svelte";
    import type {News} from "../../lib/DBItems";
    import type {ChartData, ChartOptions} from "chart.js";
    import {HOURS_PER_DAY, MILLISECONDS_PER_SECOND, SECONDS_PER_HOUR} from "../../stores/conversion";
    import {fetchNewsOfEachIndicator} from "../../lib/api.js";

    export let selectedCompany: string;
    export let selectedDateRange: string;
    export let selectedTrendCategory: string;
    export let selectedSentiment: number;
    export let selectedTrendCalculationAsMinimum: boolean;

    let userFeedback = {message: "", isSuccess: true};

    let canBuildChart = false;

    let fetchedNews: Array<News> = [];

    let chartData: ChartData<"line"> = {
        labels: [],
        datasets: []
    };
    let chartOptions: ChartOptions<"line"> = {
        scales: {
            y: {
                beginAtZero: true,
                max: 10
            }
        }
    };

    const fetchAllNewsByCriteriaHandler = async (selectedCompany: string,
                                                 indicatorName: string,
                                                 selectedDateRange: string,
                                                 maxSentiment: number) => {
        try {
            if (indicatorName !== "") {
                fetchedNews = await fetchNewsOfIndicator(selectedCompany, indicatorName, selectedDateRange, maxSentiment);
            } else {
                const newsByIndicators = await fetchNewsOfEachIndicator(selectedCompany, selectedDateRange, maxSentiment);
                fetchedNews = (Object.values(newsByIndicators) as News[]).reduce((combinedNews, newsArray) => {
                    return combinedNews.concat(newsArray);
                }, []);
            }

            canBuildChart = true;
        } catch (error) {
            userFeedback = {message: error.message, isSuccess: false};
            console.error(error.message);
        }
    };

    function processChartData(newsWithDateString: Array<News>, trendCalculationAsMinimum: boolean) {
        if (newsWithDateString.length === 0) return;

        // Convert all string data to "Date" data and remove unnecessary information
        let news: Array<{
            sentiment: number
            date: Date
        }> = [];
        for (const newsItem of newsWithDateString) {
            const processedNews = {
                sentiment: newsItem.sentiment,
                date: new Date(newsItem.date)
            };
            news.push(processedNews);
        }

        // Find the earliest and latest message post
        let earliestDate = news[0]["date"];
        let latestDate = news[0]["date"];
        for (const newsItem of news) {
            let date = newsItem["date"];

            if (date < earliestDate) earliestDate = date;
            if (date > latestDate) latestDate = date;
        }

        // Divide the trend steps into a maximum of 10 time intervals
        let newsSentimentsByDateRange: [Date[], number[]] = [[],[]];
        let timeSpanInDays = Math.floor((latestDate.getTime() - earliestDate.getTime())
            / (MILLISECONDS_PER_SECOND * SECONDS_PER_HOUR * HOURS_PER_DAY)) + 1;
        let timeSteps = Math.floor(timeSpanInDays / 10) > 0 ? Math.floor(timeSpanInDays / 10) : 1

        // Obtain (minimum or average) sentiment for each time interval
        for (let days = 0; days < timeSpanInDays; days += timeSteps) {
            let sentiments = [];
            let firstDayOfStep = new Date(earliestDate);
            firstDayOfStep.setDate(firstDayOfStep.getDate() + days);
            let lastDayOfStep = new Date(earliestDate);
            lastDayOfStep.setDate(lastDayOfStep.getDate() + days + timeSteps);

            news = news.filter(newsItem => {
                let date = newsItem["date"];
                let sentiment = newsItem["sentiment"]

                if (date >= firstDayOfStep && date < lastDayOfStep) {
                    sentiments.push(sentiment);
                    return false;
                }
                return true;
            });

            let sentiment: number;
            if (trendCalculationAsMinimum) {
                sentiment = Math.min(...sentiments);
            } else {
                sentiment = sentiments.reduce((sum, n) => sum + n, 0) / sentiments.length;
            }

            if (sentiments.length > 0) {
                newsSentimentsByDateRange[0].push(firstDayOfStep);
                newsSentimentsByDateRange[1].push(sentiment);
            }
        }

        return newsSentimentsByDateRange;
    }

    function buildChart(news: Array<News>, trendCalculationAsMinimum: boolean) {
        let data = processChartData(news, trendCalculationAsMinimum);

        if (data) {
            chartData = {
                labels: data[0].map(date => new Date(date).toLocaleDateString()),
                datasets: [{
                    label: selectedTrendCalculationAsMinimum ? "Sentiment-Minimum" : "Sentiment-Durchschnitt",
                    data: data[1]
                }]
            };
        }
    }

    $: fetchAllNewsByCriteriaHandler(selectedCompany, selectedTrendCategory, selectedDateRange, selectedSentiment);
    $: {
        if (canBuildChart) {
            buildChart(fetchedNews, selectedTrendCalculationAsMinimum);
        }
    }
</script>

<div>
    <div>
            <label for="minimumAverageSelect">
                <input bind:checked={selectedTrendCalculationAsMinimum} type="checkbox" id="minimumAverageSelect" name="minimumAverageSelect" role="switch">
                {#if selectedTrendCalculationAsMinimum}
                    Zeige Minimum
                {:else}
                    Zeige Durchschnitt
                {/if}
            </label>
    </div>

    <LineChart chartData={chartData} chartOptions={chartOptions}/>

    <p class:error={!userFeedback.isSuccess} class:success={userFeedback.isSuccess}>{userFeedback.message}</p>
</div>