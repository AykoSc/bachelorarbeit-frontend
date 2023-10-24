<script lang="ts">
    import {deleteCompany} from "../../lib/api";
    import {companies} from "../../stores/companiesStore";

    let companyName = "";
    let isButtonDisabled = true;
    let userFeedback = {message: "", isSuccess: true};

    const deleteCompanyHandler = async () => {
        try {
            await deleteCompany(companyName);
            companies.update((existingCompanies) => existingCompanies.filter(company => company !== companyName));

            userFeedback = {
                message: `Das Unternehmen "${companyName}" wurde erfolgreich gelöscht.`,
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
            <button disabled={isButtonDisabled} on:click={deleteCompanyHandler}>Unternehmen löschen</button>
        </div>
    </div>

    <p class:error={!userFeedback.isSuccess} class:success={userFeedback.isSuccess}>{userFeedback.message}</p>
</div>