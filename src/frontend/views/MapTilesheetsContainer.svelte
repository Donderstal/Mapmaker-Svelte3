<script lang="ts">
	import { GRID_BLOCK_IN_SHEET_PX } from '../../resources/constants';
	import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';

	import Canvas from '../partials/Canvas.svelte';
	import type { Tile } from '../../canvas/Tile';
    import type { TilesheetModel } from '../../models/TilesheetModel';

	export let hide;
	export let handleTilesheetClick;

	let tilesheetCanvasLeft  : Canvas;
	let tilesheetCanvasRight : Canvas;
	let activeSheet : TilesheetModel;

	export const initializeTilesheetColumn = ( activeSheetModel : TilesheetModel ) => {
		[tilesheetCanvasLeft, tilesheetCanvasRight].forEach((e)=>{e.clearGrid()});
		activeSheet = activeSheetModel;

		if ( activeSheet.image.height > window.innerHeight ) {
			const tilesheetCanvases = [tilesheetCanvasLeft, tilesheetCanvasRight]
			const gridRows = (activeSheet.image.height / GRID_BLOCK_IN_SHEET_PX) / tilesheetCanvases.length;
			const tilesInSheetGrid = ( gridRows * 4 );
			tilesheetCanvases.forEach((e, index)=>{
				e.initializeGrid( 4, gridRows, tilesInSheetGrid * index );
				e.setTilesetToCanvas( activeSheet, index, tilesheetCanvases.length );
				e.drawTileBordersToCanvas( );
			})
		}
		else {
			const gridRows = activeSheet.image.height / GRID_BLOCK_IN_SHEET_PX;
			tilesheetCanvasLeft.initializeGrid( 4, gridRows );
			tilesheetCanvasLeft.setTilesetToCanvas( activeSheet, 0, 1 );
			tilesheetCanvasLeft.drawTileBordersToCanvas( );
		}
	}

	const handleCanvasClick = ( tile: Tile ) => {
		handleTilesheetClick( tile )
	}
</script>
<style>
	.invisible {
		display: none;
		visibility: hidden;
	}
</style>
<div class:invisible={hide}>
	<Canvas bind:this={tilesheetCanvasLeft} canvasType={CanvasTypeEnum.tilesheet} handleCanvasClick={handleCanvasClick}/>	
	<Canvas bind:this={tilesheetCanvasRight} canvasType={CanvasTypeEnum.tilesheet} handleCanvasClick={handleCanvasClick}/>	
</div>