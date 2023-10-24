<script>
    import SynonymInput from "./SynonymCreationInput.svelte";
    import CompanyInput from "./CompanyCreationInput.svelte";
    import CompanyDeletionInput from "./CompanyDeletionInput.svelte";
    import SynonymDeletionInput from "./SynonymDeletionInput.svelte";
</script>

<section id="addCompany">
    <hgroup>
        <h2>Unternehmen hinzufügen</h2>
        <h3>
            Fügt ein Unternehmen der Datenbank hinzu.<br>
            Dadurch wird dieses Unternehmen in die KI-basierte Nachrichtenanalyse zur Nachhaltigkeitsbewertung
            einbezogen.
        </h3>
    </hgroup>
    <CompanyInput/>
</section>

<section id="addSynonym">
    <hgroup>
        <h2>Synonym zu Unternehmen hinzufügen</h2>
        <h3>
            Ordnet einem vorhandenen Unternehmen ein Synonym zu.<br>
            Dadurch können bei der Analyse Synonyme erkannt und die Ergebnisse verbessert werden.
        </h3>
    </hgroup>
    <SynonymInput/>
</section>

<section id="removeCompany">
    <hgroup>
        <h2>Unternehmen löschen</h2>
        <h3>
            Löscht ein Unternehmen aus der Datenbank.<br>
            Dadurch wird dieses Unternehmen aus der KI-basierten Nachrichtenanalyse zur Nachhaltigkeitsbewertung
            entfernt.
        </h3>
    </hgroup>
    <CompanyDeletionInput/>
</section>

<section id="removeSynonym">
    <hgroup>
        <h2>Synonym von Unternehmen entfernen</h2>
        <h3>
            Löscht das einem Unternehmen zugeordnete Synonym.<br>
            Somit wird dieses Synonym nicht mehr in der KI-basierten Analyse berücksichtigt.
        </h3>
    </hgroup>
    <SynonymDeletionInput/>
</section>