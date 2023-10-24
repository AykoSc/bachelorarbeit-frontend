<script lang="ts">
    import CompanyDropdown from "./CompanyDropdown.svelte";
    import {dateRangeArray} from "../lib/DateRange";

    export let selectedCompany = "";
    export let selectedDateRange = "";
    let userFeedback = {message: "", isSuccess: true};
</script>

<div>
    <div class="grid">
        <CompanyDropdown bind:selectedCompany={selectedCompany} bind:userFeedback={userFeedback}/>
        <div>
            <label for="dateSelect">Zeitraum auswählen:</label>
            <select bind:value={selectedDateRange} id="dateSelect">
                <option value="">-- Datum auswählen --</option>
                {#each dateRangeArray as dateRange}
                    <option value={dateRange}>{dateRange}</option>
                {/each}
            </select>
        </div>
    </div>

    <p class:error={!userFeedback.isSuccess} class:success={userFeedback.isSuccess}>{userFeedback.message}</p>
</div>