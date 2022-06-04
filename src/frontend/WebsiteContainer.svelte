<script>
    import { loggedIn } from '../stores';
    import AccountSystem from './AccountSystem.svelte';
    import MainMenu from './MainMenu.svelte';
</script>

<style>
    div {
        z-index: 2;
        color: white;
    }
</style>

<div>
    {#if $loggedIn}
        <MainMenu/>
    {:else}
        <AccountSystem/>
    {/if}
</div>
