<script lang="ts">
    import {saveCompany} from "../../lib/api";
    import {companies} from "../../stores/companiesStore";

    let companyName = "";
    let isButtonDisabled = true;
    let userFeedback = {message: "", isSuccess: true};

    const saveCompanyHandler = async () => {
        try {
            await saveCompany(companyName);
            companies.update((existingCompanies) => [...existingCompanies, companyName]);

            userFeedback = {
                message: `Das Unternehmen "${companyName}" wurde erfolgreich gespeichert.`,
                isSuccess: true,
            };
            console.log(userFeedback.message);
        } catch (error) {
            userFeedback = {message: error.message, isSuccess: false};
            console.error(userFeedback.message);
        }
    };

    $: isButtonDisabled = !companyName;
</script>

<div>
    <label for="companyName">Firmenname eingeben:</label>
    <div class="grid">
        <div>
            <input bind:value={companyName} id="companyName" placeholder="Firmenname..." type="text"/>
        </div>
        <div>
            <button disabled={isButtonDisabled} on:click={saveCompanyHandler}>Unternehmen speichern</button>
        </div>
    </div>

    <p class:error={!userFeedback.isSuccess} class:success={userFeedback.isSuccess}>{userFeedback.message}</p>
</div>