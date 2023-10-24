<script lang="ts">
    import {onMount} from "svelte";
    import {fetchCompanies} from "../lib/api";
    import {companies} from "../stores/companiesStore";

    export let selectedCompany = "";
    export let userFeedback = {message: "", isSuccess: true};

    const fetchCompaniesHandler = async () => {
        try {
            const fetchedCompanies = await fetchCompanies();
            companies.set(fetchedCompanies);
        } catch (error) {
            userFeedback = {message: error.message, isSuccess: false};
            console.error(error.message);
        }
    };

    onMount(fetchCompaniesHandler);
</script>

<div>
    <label for="companySelect">Unternehmen auswählen:</label>
    <select bind:value={selectedCompany} id="companySelect">
        <option value="">-- Unternehmen auswählen --</option>
        {#each $companies as company}
            <option value={company}>{company}</option>
        {/each}
    </select>
</div>