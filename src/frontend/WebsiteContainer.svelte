<script lang="ts">
    import { MainMenuEnum } from '../enumerables/MainMenuEnum';
    import { getMapModelForNewMap } from '../helpers/modelFactory';
    import { inMapMakerMode, inMapOverviewMode, loggedIn, user } from '../stores';

    import AccountSystem from './AccountSystem.svelte';
    import MainMenu from './MainMenu.svelte';
    import MapMaker from './MapMaker.svelte';
    import MapOverview from './MapOverview.svelte';
import GoBackButton from './partials/GoBackButton.svelte';

    let activeMap;
    let activeNeighbourhood;

    const prepareMapMaker = ( menuData, menuType ) => {
        if ( menuType === MainMenuEnum.newMap ) {
            activeMap = getMapModelForNewMap( menuData );
        }
        else {
            activeMap = $user.maps.filter((e)=>{return e.key === menuData})[0];
        }
        inMapMakerMode.set( true );
    }

    const prepareMapOverview = ( menuData ) => {
        activeNeighbourhood = $user.neighbourhoods.filter((e)=>{return e.name === menuData})[0];
        inMapOverviewMode.set( true );
    }

    const clearMapMaker = ( ) => {
        activeMap = null;
        inMapMakerMode.set( false );
    }

    const clearMapOverview = ( ) => {
        activeNeighbourhood = null;
        inMapOverviewMode.set( false );
    }
</script>

<style>
    div {
        color: white;
    }
</style>

<div>
    {#if $loggedIn}
        {#if $inMapMakerMode}
            <GoBackButton action={clearMapMaker}/>
            <MapMaker activeMap={activeMap}/>
        {:else if $inMapOverviewMode}
            <GoBackButton action={clearMapOverview}/>
            <MapOverview activeNeighbourhood={activeNeighbourhood}/>
        {:else}
            <MainMenu prepareMapMaker={prepareMapMaker} prepareMapOveriew={prepareMapOverview}/>
        {/if}
    {:else}
        <AccountSystem/>
    {/if}
</div>
