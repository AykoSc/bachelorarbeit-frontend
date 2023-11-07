<section id="projectCreation">
    <h2>Wie das Projekt entstand</h2>
    <p>
        Dieses Projekt wurde im Rahmen der Bachelorarbeit
        "Nachhaltigkeitsbewertung von Unternehmen mittels KI-basierter Nachrichtenanalyse"
        von Juli bis November 2023 erstellt. Dabei wurde diese in Kooperation mit der abat AG geschrieben.
        Der Ersteller ist Ayko Schwedler.
    </p>
</section>

<section id="technologies">
    <h2>Verwendete Technologien</h2>
    <p>
        Im Frontend wurde größtenteils Svelte in Kombination mit Vite.js und TypeScript verwendet.
        Im Backend wurde hingegen ausschließlich Python verwendet.<br>
        Generell wurden die Technologien gewählt, die im <a href="https://survey.stackoverflow.co/2023/"
                                                            target="_blank">Stackoverflow Developer Survey</a>
        sehr hoch bewertet wurden.
    </p>
</section>

<section id="functionality">
    <h2>Funktionalitäten</h2>
    <p>
        Der Nutzer hat die Möglichkeit, die folgenden Funktionen zu verwenden, um über die Nachhaltigkeit von
        Unternehmen bzw. die Wahrnehmung von dieser in Nachrichtenartikeln informiert zu bleiben und
        die Backend-Analyse zu verwalten.
    </p>

    <h3>Frontend</h3>
    <p>
        Es bestehen (mit dieser hier) insgesamt drei Seiten und ein Dark Mode wird auch angeboten.
        Die Funktionen umfassen das Hinzufügen und Entfernen von Unternehmen sowie das
        Hinzufügen und Entfernen von Synonymen für Unternehmen. Die Kategorien beinhalten den am niedrigsten
        bewerteten Nachrichtenartikel, die Anzahl der analysierten Nachrichtenartikel pro Indikator,
        Statistiken zu den Nachhaltigkeitsindikatoren, sowie Sentiment-Trends. In den Statistiken werden unter
        anderem der Mindest-, Durchschnitts- und Höchstwert jedes ausgewählten Indikators angezeigt.
    </p>
    <h3>Backend</h3>
    <p>
        Über das Backend werden periodisch (und damit unabhängig) Nachrichtenartikel gesucht und anschließend
        mit verschiedenen KI-Algorithmen ausgewertet.
        Darüber hinaus werden die Ergebnisse sowie die Verwaltung der Daten über eine API zur Verfügung gestellt.
    </p>
</section>

<section id="details">
    <h2>Details</h2>
    <p>
        Genauere Informationen sind den Readmes, jeweils für das Frontend und das Backend zu entnehmen.
        Dort sind u. a. Details zu den hier bereits genannten Kategorien, als auch weitere Informationen, wie
        mögliche Verbesserungen, enthalten. Auch technische Details, wie die API-Schnittstelle, sowie
        das Datenbankmodell, sind dort verfügbar.
    </p>
</section>