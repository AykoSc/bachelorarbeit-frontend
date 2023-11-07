<script lang="ts">
    import CompanyAndTimeInput from "../CompanyAndDateInput.svelte";
    import IndicatorRatingBarChart from "./IndicatorRatingBarChart.svelte";
    import IndicatorNews from "./IndicatorNews.svelte";
    import {doNewsExist} from "../../lib/api";
    import IndicatorAndSentimentInput from "./IndicatorAndSentimentInput.svelte";
    import TrendLineChart from "./TrendLineChart.svelte";
    import MinNewsItem from "./MinNewsItem.svelte";

    let selectedCompany = "";
    let selectedDateRange = "";
    let selectedIndicator = "";
    let selectedSentiment = 2;
    let selectedTrendCalculationAsMinimum = true;
    let doRelevantNewsExist = false;

    const doNewsExistHandler = async (selectedCompany: string, selectedDateRange: string, selectedIndicator: string, selectedSentiment: number) => {
        try {
            doRelevantNewsExist = await doNewsExist(selectedCompany, selectedDateRange, selectedIndicator, selectedSentiment);
        } catch (error) {
            console.error(error.message);
        }
    };

    $: doNewsExistHandler(selectedCompany, selectedDateRange, selectedIndicator, selectedSentiment);
    $: isSelectionComplete = selectedCompany && selectedDateRange;
</script>

<section id="filterSelection">
    <h2>Filterkriterien auswählen</h2>
    <CompanyAndTimeInput bind:selectedCompany={selectedCompany} bind:selectedDateRange={selectedDateRange}/>
    <IndicatorAndSentimentInput bind:selectedIndicator={selectedIndicator} bind:selectedSentiment={selectedSentiment}/>
    {#if !isSelectionComplete}
        <p class="warning">Bitte wähle Unternehmen und Zeitraum aus, um Analyseergebnisse zu erhalten.</p>
    {/if}
    {#if isSelectionComplete && !doRelevantNewsExist}
        <p class="warning">Für die ausgewählten Kriterien existieren keine Nachrichten.</p>
    {/if}
</section>

{#if isSelectionComplete && doRelevantNewsExist}
    <section id="minNewsItem">
        <hgroup>
            <h2>Am niedrigsten bewerteter Nachrichtenbeitrag</h2>
            <h3>
                Dieser Nachrichtenbeitrag besitzt die niedrigste Sentiment-Bewertung.
                Relevante Nachrichtenbeiträge sind solche, bei denen mindestens ein Indikator erkannt wurde,
                und die in die Suchkriterien (Unternehmen, Zeitraum und Indikator) passen.<br>
                Die Skala geht von 0 bis 10. Somit kann 5 als durchschnittlich gedeutet werden.
            </h3>
        </hgroup>
        <MinNewsItem selectedCompany={selectedCompany} selectedDateRange={selectedDateRange} selectedIndicator={selectedIndicator}/>
    </section>

    <section id="newsBySustainabilityIndicators">
        <hgroup>
            <h2>Analysierte Nachrichten pro Indikator</h2>
            <h3>
                Zu jedem Indikator ist die Anzahl analysierter Nachrichtenbeiträge, das Minimum sowie eine
                detaillierte Auflistung der hierzu genutzten Nachrichtenbeiträge einsehbar.
            </h3>
        </hgroup>
        <IndicatorNews selectedCompany={selectedCompany} selectedDateRange={selectedDateRange} selectedIndicator={selectedIndicator} maxSentiment={selectedSentiment}/>
    </section>

    <section id="gradeByIndicators">
        <hgroup>
            <h2>Statistiken der Nachhaltigkeitsindikatoren</h2>
            <h3>
                Hier werden, neben den anderen verfügbaren Statistiken, zusätzlich Minimum,
                Durchschnitt, sowie Maximum von jedem gewählten Indikator angezeigt.<br>
                Je mehr Nachrichtenbeiträge existieren, desto genauer kann die Bewertung erfolgen.
            </h3>
        </hgroup>
        <IndicatorRatingBarChart selectedCompany={selectedCompany} selectedDateRange={selectedDateRange} selectedIndicator={selectedIndicator} maxSentiment={selectedSentiment}/>
    </section>

    <section id="sentimentTrendByCategory">
        <hgroup>
            <h2>Sentiment-Trends</h2>
            <h3>
                Der ausgewählte Zeitraum wird in zehn Zeitpunkte aufgeteilt und beginnt beim
                Anfang der ausgewählten Zeitspanne. Nur wenn der erste Beitrag erst später innerhalb
                des Zeitraums verfügbar ist, beginnt der Zeitraum erst dort.<br>
                Es kann zwischen dem Minimum (Standard) und dem Durchschnitt gewählt werden.
            </h3>
        </hgroup>
            <TrendLineChart selectedCompany={selectedCompany} selectedTrendCategory={selectedIndicator}
                        selectedDateRange={selectedDateRange} selectedSentiment={selectedSentiment}
                            bind:selectedTrendCalculationAsMinimum={selectedTrendCalculationAsMinimum}/>
    </section>
{/if}