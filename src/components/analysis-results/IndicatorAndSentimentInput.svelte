<script lang="ts">
    import SentimentSlider from "./SentimentSlider.svelte";
    import IndicatorDropdown from "./IndicatorDropdown.svelte";

    export let selectedIndicator = "";
    export let selectedSentiment = 2;
</script>

<div class="grid">
    <IndicatorDropdown bind:selectedIndicator={selectedIndicator}/>
    <SentimentSlider bind:selectedSentiment={selectedSentiment}/>
</div>