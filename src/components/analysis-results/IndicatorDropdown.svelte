<script lang="ts">
    import {onMount} from "svelte";
    import {fetchIndicators} from "../../lib/api";

    export let selectedIndicator = "Insgesamt";
    let userFeedback = {message: "", isSuccess: true};

    let indicators = [];

    const fetchIndicatorsHandler = async () => {
        try {
            const fetchedIndicators = await fetchIndicators();
            const indicatorsUnsorted = indicators.concat(fetchedIndicators);
            indicators = indicatorsUnsorted.sort((a, b) => a.localeCompare(b));
        } catch (error) {
            userFeedback = {message: error.message, isSuccess: false};
            console.error(error.message);
        }
    };

    onMount(fetchIndicatorsHandler);
</script>

<div>
    <label for="indicatorsSelect">Indikator auswählen:</label>
    <select bind:value={selectedIndicator} id="indicatorsSelect">
        <option value="">Alle Indikatoren</option>
        {#each indicators as indicator}
            <option value={indicator}>{indicator}</option>
        {/each}
    </select>
    <p class:error={!userFeedback.isSuccess} class:success={userFeedback.isSuccess}>{userFeedback.message}</p>
</div>