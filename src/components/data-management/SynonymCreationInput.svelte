<script lang="ts">
    import {saveSynonym} from "../../lib/api";
    import CompanyDropdown from "../CompanyDropdown.svelte";

    let selectedCompany = "";
    let synonymName = "";
    let isButtonDisabled = true;
    let userFeedback = {message: "", isSuccess: true};


    const saveSynonymHandler = async () => {
        try {
            await saveSynonym(selectedCompany, synonymName);
            userFeedback = {
                message: `Das Synonym "${synonymName}" wurde erfolgreich gespeichert.`,
                isSuccess: true,
            };
            console.log(userFeedback.message);
        } catch (error) {
            userFeedback = {message: error.message, isSuccess: false};
            console.error(userFeedback.message);
        }
    };

    $: isButtonDisabled = !synonymName || !selectedCompany;
</script>

<div>
    <div class="grid">
        <CompanyDropdown bind:selectedCompany={selectedCompany} bind:userFeedback={userFeedback}/>
        <div>
            <label for="synonymName">Synonym eingeben:</label>
            <input bind:value={synonymName} id="synonymName" placeholder="Synonym..." type="text"/>
        </div>
        <div>
            <label class="hidden" for="saveSynonym">Synonym speichern:</label>
            <button disabled={isButtonDisabled} id="saveSynonym" on:click={saveSynonymHandler}>Synonym speichern
            </button>
        </div>
    </div>

    <p class:error={!userFeedback.isSuccess} class:success={userFeedback.isSuccess}>{userFeedback.message}</p>
</div>