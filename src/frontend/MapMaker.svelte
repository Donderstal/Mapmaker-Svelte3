<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../stores';
	import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum';
	import type { ImageModel } from '../models/ImageModel';
	import type { MapModel } from '../models/MapModel';
	import Canvas from './partials/Canvas.svelte';
	import { GRID_BLOCK_IN_SHEET_PX } from '../resources/constants';

	export let activeMap : MapModel;
	export let activeSheet : ImageModel;

	let backTilesCanvas;
	let backSpritesCanvas;
	let frontTilesCanvas;
	let frontSpritesCanvas;
	let utilityCanvas;
	let tilesheetCanvasLeft;
	let tilesheetCanvasRight;

	onMount(()=>{
		initializeTilesheetColumn( );
		initializeMapMakerCanvases( );
		initializeUiColumn( );
	})

	const initializeTilesheetColumn = ( ) => {
		let tileSheets : ImageModel[] = Object.values($user.tilesets);
		activeSheet = tileSheets.filter((e)=>{return e.dataObject.key === activeMap.tileSet})[0];
		if ( activeSheet.image.height > window.innerHeight ) {
			const tilesheetCanvases = [tilesheetCanvasLeft, tilesheetCanvasRight]
			tilesheetCanvases.forEach((e, index)=>{
				e.setTilesetToCanvas( activeSheet, index, tilesheetCanvases.length );

			})
		}
		else {
			tilesheetCanvasLeft.setImageToCanvas( activeSheet );
		}
	}

	const initializeMapMakerCanvases = ( ) => {
		initTileCanvas( backTilesCanvas, true );
		initSpriteCanvas( backSpritesCanvas, true );
		initTileCanvas( frontTilesCanvas, false );
		initSpriteCanvas( frontSpritesCanvas, false );
	}

	const initTileCanvas = ( canvas, isBackground ) => {
		canvas.setMapModel( activeMap, activeSheet, isBackground );
		canvas.drawTileBordersToCanvas( );
		canvas.drawGridToCanvas( );		
	}

	const initSpriteCanvas = ( canvas, isBackground ) => {
		canvas.setMapModel( activeMap, activeSheet, isBackground );
	}

	const initializeUiColumn = ( ) => {
		utilityCanvas.initializeGrid( 4, 4 );
		utilityCanvas.fillRect( 0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,"black" )
;	}
</script>
<style>
	.container {
		display: grid;
		grid-template-columns: [leftColumn] 10vw [middleColumn] 65vw [rightColumn] 25vw;
		grid-template-rows: [topMargin] 5vh [center] 90vh [bottomMargin] 5vh;
	}
	.header-item {
		grid-column: middleColumn / rightColumn;
		grid-row: topMargin;
	}
	.left-item {
		grid-column: leftColumn;
		grid-row:	center;
		z-index: 5;
	}
	.center-item {
		grid-column: middleColumn;
		grid-row:	center / bottomMargin;
	}
	.right-item {
		grid-column: rightColumn;
		grid-row: center;
		overflow: scroll;
		-ms-overflow-style: none;
		scrollbar-width: none;
		z-index: 5;
		padding: 0vh 1vh;
	}
	.right-item::-webkit-scrollbar {
		display: none;
	}
	.canvas-container {
		position: absolute;
		left: -12.5vw;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
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

	h2 {
		margin: 0 auto;
	}
</style>
<div class="container">
	<div class="header-item">
		<h2>Julius Mapmaker</h2>
	</div>
	<div class="left-item">
		<Canvas bind:this={utilityCanvas} canvasType={CanvasTypeEnum.utility}/>
	</div>
	<div class="center-item">
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
	<div class="right-item">
		<Canvas bind:this={tilesheetCanvasLeft} canvasType={CanvasTypeEnum.tilesheet}/>	
		<Canvas bind:this={tilesheetCanvasRight} canvasType={CanvasTypeEnum.tilesheet}/>	
	</div>
</div>