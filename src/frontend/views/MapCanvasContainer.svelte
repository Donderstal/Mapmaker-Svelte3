<script lang="ts">
	import Canvas from "../partials/Canvas.svelte";

	import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';

	import type { ImageModel } from '../../models/ImageModel';
	import type { MapModel } from '../../models/MapModel';

	export let handleEditModeSwitch;

	let activeMap : MapModel;
	let activeSheet : ImageModel;

	let backTilesCanvas: Canvas;
	let backSpritesCanvas: Canvas;
	let frontTilesCanvas: Canvas;
	let frontSpritesCanvas: Canvas;
	let activeCanvas: CanvasTypeEnum = CanvasTypeEnum.frontSprites;

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
		canvas.drawTileBordersToCanvas( );
	}
	
	const activateCanvasEditMode = ( type : CanvasTypeEnum ) : void => {
		[ backSpritesCanvas, frontTilesCanvas, frontSpritesCanvas ].forEach( (e)=>{ e.hideCanvas(); } );
		activeCanvas = type;
		if ( type === CanvasTypeEnum.backSprites || type === CanvasTypeEnum.foreground || type === CanvasTypeEnum.frontSprites ) {
			backSpritesCanvas.showCanvas( );
		}
		if ( type === CanvasTypeEnum.foreground || type === CanvasTypeEnum.frontSprites ) {
			frontTilesCanvas.showCanvas( );
		}
		if (  type === CanvasTypeEnum.frontSprites ) {
			frontSpritesCanvas.showCanvas( );
		}
		handleEditModeSwitch(type);
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
	button {
		position: fixed;
		width: 2.5vw;
		height: 5vh;
		left: 2.5vw;
		float: left;
		padding: 0;

		background: #D82BBA 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        border: none;
        z-index: 5;
        box-shadow: .5vh .5vh .25vh #64005380;
        transition: transform .3s ease-out;
	}
	.button-1 { 
		top: 5vh;
	}
	.button-2 {
		top: 10vh;
	}
	.button-3 {
		top: 15vh;
	}
	.button-4 {
		top: 20vh;
	}
	.button-active {
		width: 5vw;
		left: 0vw;
		background: #64005380 0% 0% no-repeat padding-box;
		box-shadow: .5vh .5vh .25vh #D82BBA;
	}
	.button-inactive:hover {
        cursor: pointer;
        transition: transform .3s ease-out;
        transform: translateY(-.5vh) translateX(-.5vh);
        box-shadow: 1vh 1vh .25vh #64005380;
    }
</style>
<div>
	<div class="canvas-container back-tiles-container">
		<button 
			class="{activeCanvas === CanvasTypeEnum.background ? "button-active": "button-inactive"} button-1" 
			on:click={()=>{activateCanvasEditMode(CanvasTypeEnum.background)}}
		>Bt</button>
		<Canvas bind:this={backTilesCanvas} canvasType={CanvasTypeEnum.background}/>
	</div>
	<div class="canvas-container back-sprites-container">
		<button 
			class="{activeCanvas === CanvasTypeEnum.backSprites ? "button-active": "button-inactive"} button-2" 
			on:click={()=>{activateCanvasEditMode(CanvasTypeEnum.backSprites)}}
		>Bs</button>
		<Canvas bind:this={backSpritesCanvas} canvasType={CanvasTypeEnum.backSprites}/>
	</div>
	<div class="canvas-container front-tiles-container">
		<button 
			class="{activeCanvas === CanvasTypeEnum.foreground ? "button-active": "button-inactive"} button-3" 
			on:click={()=>{activateCanvasEditMode(CanvasTypeEnum.foreground)}}
		>Ft</button>
		<Canvas bind:this={frontTilesCanvas} canvasType={CanvasTypeEnum.foreground}/>
	</div>
	<div class="canvas-container front-sprites-container">
		<button 
			class="{activeCanvas === CanvasTypeEnum.frontSprites ? "button-active": "button-inactive"} button-4"
			on:click={()=>{activateCanvasEditMode(CanvasTypeEnum.frontSprites)}}
		>Fs</button>
		<Canvas bind:this={frontSpritesCanvas} canvasType={CanvasTypeEnum.frontSprites}/>
	</div>
</div>