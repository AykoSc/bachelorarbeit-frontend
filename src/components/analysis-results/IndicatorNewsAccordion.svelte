<script lang="ts">
    import type {News} from "../../lib/DBItems";

    export let indicatorName: string;
    export let indicatorNews: Array<News>;
    export let expand: boolean;

    function formatDate(dateString: string) {
        const germanFormat = new Intl.DateTimeFormat("de-DE", {day: "2-digit", month: "2-digit", year: "numeric"});
        return germanFormat.format(new Date(dateString));
    }

    let minSentiment: string = "-";
    $: minSentiment = indicatorNews.length > 0 ? Number(indicatorNews[0].sentiment).toFixed(2).toString() : "-";
</script>

<div>
    <details open={expand}>
        <summary class="grid">
            <span>{indicatorName}</span>
            <span>Beiträge: {indicatorNews.length}</span>
            <span>Min. Sentiment: {minSentiment}</span>
        </summary>
        <div style="overflow-x:auto">
            <table class="responsive-table" role="grid">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titel</th>
                    <th scope="col">Sentiment</th>
                    <th scope="col">Datum</th>
                    <th scope="col">Link</th>
                </tr>
                </thead>
                <tbody>
                {#each indicatorNews as news, index}
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{news["title"]}</td>
                        <td>{Number(news["sentiment"]).toFixed(2)}</td>
                        <td>{formatDate(news["date"])}</td>
                        <td><a href="{news['link']}" target="_blank">Link</a></td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </details>
</div>