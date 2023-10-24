<script lang="ts">
    import {fetchNewsOfEachIndicator} from "../../lib/api";
    import IndicatorNewsAccordion from "./IndicatorNewsAccordion.svelte";
    import type {News} from "../../lib/DBItems";

    export let selectedCompany: string;
    export let selectedDateRange: string;
    export let selectedIndicator: string;
    export let maxSentiment: number;

    let userFeedback = {message: "", isSuccess: true};
    let newsByIndicator: Record<string, News[]> = {};

    const fetchNewsOfEachIndicatorHandler = async (selectedCompany: string, selectedDateRange: string, maxSentiment: number) => {
        try {
            newsByIndicator = await fetchNewsOfEachIndicator(selectedCompany, selectedDateRange, maxSentiment);
        } catch (error) {
            userFeedback = {message: error.message, isSuccess: false};
            console.error(error.message);
        }
    };

    $: fetchNewsOfEachIndicatorHandler(selectedCompany, selectedDateRange, maxSentiment);
</script>

<div>
    {#each Object.entries(newsByIndicator) as [indicatorName, indicatorNews]}
        {#if indicatorName === selectedIndicator}
            <IndicatorNewsAccordion indicatorName={indicatorName} indicatorNews={indicatorNews} expand={true}/>
        {:else}
            <IndicatorNewsAccordion indicatorName={indicatorName} indicatorNews={indicatorNews} expand={false}/>
        {/if}
    {/each}

    <p class:error={!userFeedback.isSuccess} class:success={userFeedback.isSuccess}>{userFeedback.message}</p>
</div>