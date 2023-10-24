<script lang="ts">
    import {currentTheme} from "../stores/themeStore";

    document.documentElement.setAttribute("data-theme", $currentTheme);

    function toggleMode() {
        currentTheme.set($currentTheme === "dark" ? "light" : "dark");
        document.documentElement.setAttribute("data-theme", $currentTheme);
    }
</script>

<div>
    <button on:click={toggleMode}>
        {$currentTheme === "dark" ? "Hellmodus" : "Dunkelmodus"}
    </button>
</div>