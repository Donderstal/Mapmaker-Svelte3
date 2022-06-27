<script lang="ts">
	import type { ImageModel } from '../../models/ImageModel';
	import { GRID_BLOCK_IN_SHEET_PX } from '../../resources/constants';
	import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';

	import Canvas from '../partials/Canvas.svelte';

	export let hide;

	let tilesheetCanvasLeft  : Canvas;
	let tilesheetCanvasRight : Canvas;
	let activeSheet : ImageModel

	export const initializeTilesheetColumn = ( activeSheetModel : ImageModel ) => {
		activeSheet = activeSheetModel;

		if ( activeSheet.image.height > window.innerHeight ) {
			const tilesheetCanvases = [tilesheetCanvasLeft, tilesheetCanvasRight]
			const gridRows = (activeSheet.image.height / GRID_BLOCK_IN_SHEET_PX) / tilesheetCanvases.length;
			tilesheetCanvases.forEach((e, index)=>{
				e.initializeGrid( 4, gridRows );
				e.setTilesetToCanvas( activeSheet, index, tilesheetCanvases.length );
				e.drawTileBordersToCanvas( );
			})
		}
		else {
			const gridRows = activeSheet.image.height / GRID_BLOCK_IN_SHEET_PX;
			tilesheetCanvasLeft.initializeGrid( 4, gridRows );
			tilesheetCanvasLeft.setImageToCanvas( activeSheet );
			tilesheetCanvasLeft.drawTileBordersToCanvas( );
		}
	}

	const captureTilesheetClick = ( ) => {

	}
</script>
<style>
	.invisible {
		display: none;
		visibility: hidden;
	}
</style>
<div class:invisible={hide}>
	<Canvas bind:this={tilesheetCanvasLeft} canvasType={CanvasTypeEnum.tilesheet} on:click={captureTilesheetClick}/>	
	<Canvas bind:this={tilesheetCanvasRight} canvasType={CanvasTypeEnum.tilesheet} on:click={captureTilesheetClick}/>	
</div>