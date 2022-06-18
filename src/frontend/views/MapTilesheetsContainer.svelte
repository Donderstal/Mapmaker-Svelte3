<script lang="ts">
	import type { ImageModel } from '../../models/ImageModel';
	import { GRID_BLOCK_IN_SHEET_PX } from '../../resources/constants';
	import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';

	import Canvas from '../partials/Canvas.svelte';

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
</script>
<div>
	<Canvas bind:this={tilesheetCanvasLeft} canvasType={CanvasTypeEnum.tilesheet}/>	
	<Canvas bind:this={tilesheetCanvasRight} canvasType={CanvasTypeEnum.tilesheet}/>	
</div>