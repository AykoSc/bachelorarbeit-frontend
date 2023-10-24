<script lang="ts">
    import {deleteSynonym} from "../../lib/api";
    import CompanyDropdown from "../CompanyDropdown.svelte";

    let selectedCompany = "";
    let synonymName = "";
    let isButtonDisabled = true;
    let userFeedback = {message: "", isSuccess: true};


    const deleteSynonymHandler = async () => {
        try {
            await deleteSynonym(selectedCompany, synonymName);
            userFeedback = {
                message: `Das Synonym "${synonymName}" wurde erfolgreich gelöscht.`,
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
            <label class="hidden" for="deleteSynonym">Synonym löschen:</label>
            <button disabled={isButtonDisabled} id="deleteSynonym" on:click={deleteSynonymHandler}>Synonym löschen
            </button>
        </div>
    </div>

    <p class:error={!userFeedback.isSuccess} class:success={userFeedback.isSuccess}>{userFeedback.message}</p>
</div>