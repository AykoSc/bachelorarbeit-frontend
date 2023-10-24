<script lang="ts">
    import {fetchLowestSentimentNewsItemOfCompany} from "../../lib/api";

    export let selectedCompany = "";
    export let selectedDateRange = "Insgesamt";
    export let selectedIndicator = "";
    export
    let userFeedback = {message: "", isSuccess: true};
    let news = null;

    const fetchMinSentimentNewsHandler = async (selectedCompany: string, selectedIndicator: string, selectedDateRange: string) => {
        try {
            news = await fetchLowestSentimentNewsItemOfCompany(selectedCompany, selectedIndicator, selectedDateRange);
        } catch (error) {
            userFeedback = {message: error.message, isSuccess: false};
            console.error(error.message);
        }
    };

    function formatDate(dateString: string) {
        const germanFormat = new Intl.DateTimeFormat("de-DE", {day: "2-digit", month: "2-digit", year: "numeric"});
        return germanFormat.format(new Date(dateString));
    }

    $: fetchMinSentimentNewsHandler(selectedCompany, selectedIndicator, selectedDateRange);
</script>

{#if news !== null}
    <div>
        <table class="responsive-table" role="grid">
            <thead>
            <tr>
                <th scope="col">Titel</th>
                <th scope="col">Sentiment</th>
                <th scope="col">Datum</th>
                <th scope="col">Link</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{news["title"]}</td>
                    <td>{Number(news["sentiment"]).toFixed(2)}</td>
                    <td>{formatDate(news["date"])}</td>
                    <td><a href="{news['link']}" target="_blank">Link</a></td>
                </tr>
            </tbody>
        </table>
        <p class:success={userFeedback.isSuccess} class:error={!userFeedback.isSuccess}>{userFeedback.message}</p>
    </div>
{/if}