import {writable} from "svelte/store";

export const currentTheme = writable<string>(localStorage.getItem("theme") || "light");

currentTheme.subscribe(value => {
    localStorage.setItem("theme", value);
});