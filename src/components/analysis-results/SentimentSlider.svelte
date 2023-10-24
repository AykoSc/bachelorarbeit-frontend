<script lang="ts">
    export let selectedSentiment = 2;
</script>

    <div>
        <label for="sentimentSlider">Maximales Sentiment auswählen:</label>
        <div style="display: flex">
            <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    bind:value={selectedSentiment}
                    id="sentimentSlider"
            />
            <p style="margin-left: 10px">{selectedSentiment}</p>
        </div>
    </div>
