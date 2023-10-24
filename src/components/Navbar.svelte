<script>
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<nav>
    <ul>
        <li><a href="/view-analysis-results">Analyseergebnisse einsehen</a></li>
        <li><a href="/manage-data">Daten verwalten</a></li>
        <li><a href="/about">Über dieses Projekt</a></li>
    </ul>
    <ul>
        <li>
            <ThemeSwitcher/>
        </li>
    </ul>
</nav>