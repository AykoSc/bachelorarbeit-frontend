<script lang="ts">
    import {Route, Router} from "svelte-routing";
    import Header from "./components/Header.svelte";
    import AnalysisResults from "./components/analysis-results/AnalysisResults.svelte";
    import ManageData from "./components/data-management/ManageData.svelte";
    import {onMount} from "svelte";
    import About from "./components/about/About.svelte";

    const allowedPaths = ["/view-analysis-results", "/manage-data", "/about"];

    onMount(() => {
        if (!allowedPaths.includes(window.location.pathname)) {
            window.location.href = allowedPaths[0];
        }
    });
</script>

<Header/>

<main class="container">
    <Router>
        <Route component={AnalysisResults} path="/view-analysis-results"/>
        <Route component={ManageData} path="/manage-data"/>
        <Route component={About} path="/about"/>
    </Router>
</main>