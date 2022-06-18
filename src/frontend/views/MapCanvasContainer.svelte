<script lang="ts">
	import Canvas from "../partials/Canvas.svelte";

	import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';

	import type { ImageModel } from '../../models/ImageModel';
	import type { MapModel } from '../../models/MapModel';

	let activeMap : MapModel;
	let activeSheet : ImageModel;

	let backTilesCanvas: Canvas;
	let backSpritesCanvas: Canvas;
	let frontTilesCanvas: Canvas;
	let frontSpritesCanvas: Canvas;

	export const initializeMapMakerCanvases = ( activeMapModel : MapModel, activeSheetModel : ImageModel ) : void => {
		activeMap = activeMapModel;
		activeSheet = activeSheetModel;
		initTileCanvas( backTilesCanvas, true );
		initSpriteCanvas( backSpritesCanvas, true );
		initTileCanvas( frontTilesCanvas, false );
		initSpriteCanvas( frontSpritesCanvas, false );
	}

	const initTileCanvas = ( canvas : Canvas, isBackground: boolean ) : void => {
		canvas.setMapModel( activeMap, activeSheet, isBackground );
		canvas.drawTileBordersToCanvas( );
		canvas.drawGridToCanvas( );		
	}

	const initSpriteCanvas = ( canvas : Canvas, isBackground : boolean ) : void => {
		canvas.setMapModel( activeMap, activeSheet, isBackground );
	}
</script>
<style>
	.canvas-container {
		position: absolute;
		width: 65vw;
		height: 65vh;
	}
	.back-tiles-container { 
		z-index: 1;
	}
	.back-sprites-container { 
		z-index: 2;
	}
	.front-tiles-container { 
		z-index: 3;
	}
	.front-sprites-container { 
		z-index: 4;
	}
</style>
<div>
	<div class="canvas-container back-tiles-container">
		<Canvas bind:this={backTilesCanvas} canvasType={CanvasTypeEnum.background}/>
	</div>
	<div class="canvas-container back-sprites-container">
		<Canvas bind:this={backSpritesCanvas} canvasType={CanvasTypeEnum.backSprites}/>
	</div>
	<div class="canvas-container front-tiles-container">
		<Canvas bind:this={frontTilesCanvas} canvasType={CanvasTypeEnum.foreground}/>
	</div>
	<div class="canvas-container front-sprites-container">
		<Canvas bind:this={frontSpritesCanvas} canvasType={CanvasTypeEnum.frontSprites}/>
	</div>
</div>