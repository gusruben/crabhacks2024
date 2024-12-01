<script>
	import { onMount } from 'svelte';
	import { goto } from "$app/navigation";

    onMount(() => goto("/assignments"));
</script>

<style>
    :global(body) {
        background-color: #232529;
    }
</style>