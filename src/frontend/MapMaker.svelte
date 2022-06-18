<script lang="ts">
	import { onMount } from 'svelte';
	import type { MapModel } from '../models/MapModel';
	import Header from './partials/Header.svelte';
	import { user } from '../stores';
	import MapCanvasContainer from './views/MapCanvasContainer.svelte';
	import MapTilesheetsContainer from './views/MapTilesheetsContainer.svelte';
	import type { ImageModel } from '../models/ImageModel';
	import MapUiContainer from './views/MapUiContainer.svelte';

	export let activeMap : MapModel;
	let activeSheet : ImageModel;

	let mapCanvasContainer;
	let mapTilesheetsContainer;
	let mapUiContainer;

	onMount(()=>{
		let tileSheets : ImageModel[] = Object.values($user.tilesets);
		activeSheet = tileSheets.filter((e)=>{return e.dataObject.key === activeMap.tileSet})[0];

		mapTilesheetsContainer.initializeTilesheetColumn( activeSheet );
		mapCanvasContainer.initializeMapMakerCanvases( activeMap, activeSheet );
		mapUiContainer.initializeUiColumn( );
	})
</script>
<style>
	.container {
		display: grid;
		grid-template-columns: [leftMargin] 5vw [leftColumn] 65vw [rightColumn] 25vw [rightMargin] 5vw;
		grid-template-rows: [topMargin] 5vh [center] 65vh [bottomRow] 25vh [bottomMargin] 5vh;
	}
	.header-item {
		grid-column: leftColumn / rightColumn;
		grid-row: topMargin;
	}
	.center-item {
		grid-column: leftColumn;
		grid-row:	center;
	}
	.bottom-item {
		grid-column: leftColumn;
		grid-row:	bottomRow;
	}
	.right-item {
		grid-column: rightColumn;
		grid-row: center / bottomMargin;
		overflow: scroll;
		-ms-overflow-style: none;
		scrollbar-width: none;
		z-index: 5;
		padding: 0vh 1vh;
	}
	.right-item::-webkit-scrollbar {
		display: none;
	}
</style>
<div class="container">
	<div class="header-item">
		<Header/>
	</div>
	<div class="center-item">
		<MapCanvasContainer bind:this={mapCanvasContainer}/>
	</div>
	<div class="bottom-item">
		<MapUiContainer bind:this={mapUiContainer}/>
	</div>
	<div class="right-item">
		<MapTilesheetsContainer bind:this={mapTilesheetsContainer} />
	</div>
</div>