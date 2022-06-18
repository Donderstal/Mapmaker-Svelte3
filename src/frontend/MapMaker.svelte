<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../stores';
	import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum';
	import type { ImageModel } from '../models/ImageModel';
	import type { MapModel } from '../models/MapModel';
	import Canvas from './partials/Canvas.svelte';
	import { TILE_SIZE, GRID_BLOCK_IN_SHEET_PX } from '../resources/constants';
import Button from './partials/Button.svelte';

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
		utilityCanvas.initializeGrid( 2, 2 );
		utilityCanvas.fillRect( 0, 0, TILE_SIZE * 2, TILE_SIZE * 2,"black" )
;	}
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
		display: grid;
		grid-template-columns: [leftUiColumn] 10vw [centerLeftUiColumn] 15vw [centerRightUiColumn] 20vw [rightUiColumn] 20vw;
		grid-template-rows: [uiRow] 25vh;
		grid-column: leftColumn;
		grid-row:	bottomRow;
		font-size: 2vh;
	}
	.left-ui-item {
		grid-column: leftUiColumn;
		grid-row: uiRow
	}
	.center-left-ui-item {
		grid-column: centerLeftUiColumn;
		grid-row: uiRow
	}
	.center-right-ui-item {
		grid-column: centerRightUiColumn;
		grid-row: uiRow;
	}
	.right-ui-item {
		grid-column: rightUiColumn;
		grid-row: uiRow;
		display: grid;
		grid-template-columns: [leftTileColumn] 7.5vw [rightTileColumn] 12.5vw;
		grid-template-rows: [headerRow] 5vh [uiRow] 20vh;
	}
	.header-tile-column {
		grid-column: rightTileColumn;
		grid-row: headerRow;
	}
	.left-tile-column {
		grid-column: leftTileColumn;
		grid-row: uiRow
	}
	.right-tile-column {
		grid-column: rightTileColumn;
		grid-row: uiRow;
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

	h2 {
		margin: 0 auto;
	}
	h4 {
		margin: 0 auto 1vh auto;
		font-size: 3vh;
	}
	input { 
		max-width: 10vw;
	}
	img {
		max-width: 2.5vw;
	}
	.flipped-img { 
		transform: scaleX(-1);
	}
</style>
<div class="container">
	<div class="header-item">
		<h2>Julius Mapmaker</h2>
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
	<div class="bottom-item">
		<div class="left-ui-item">
			<h4>Edit mode</h4>
			<table>
				<tr>
					<td><label for="standard">Standard</label></td>
					<td><input type="radio" name="edit-mode" value="standard" checked/></td>
				</tr>
				<tr>
					<td><label for="roads">Roads</label></td>
					<td><input type="radio" name="edit-mode" value="roads" disabled/></td>					
				</tr>
				<tr>
					<td><label for="spawn-points">Spawn point</label></td>
					<td><input type="radio" name="edit-mode" value="spawn-points" disabled/></td>			
				</tr>
				<tr>
					<td><label for="neighbours">Neighbours</label></td>
					<td><input type="radio" name="edit-mode" value="neighbours" disabled/></td>		
				</tr>
				<tr>
					<td><label for="doors">Doors</label></td>
					<td><input type="radio" name="edit-mode" value="doors" disabled/></td>
				</tr>
			</table>
		</div>
		<div class="center-left-ui-item">
			<br/>
			<Button buttonText={"Save map"} action={()=>{console.log("Save map")}}/>
			<br/>
			<br/>			
			<Button buttonText={"Export map"} action={()=>{console.log("Export map")}}/>
		</div>
		<div class="center-right-ui-item">
			<table>
				<tr>
					<td><label for="standard">Map name: </label></td>
					<td><input name="map-name"/></td>
				</tr>
				<tr>
					<td><label for="neighbourhood-name">Neighbourhood: </label></td>
					<td><input name="neighbourhood-name"/></td>					
				</tr>
				<tr>
					<td><label for="outdoors">Outdoors: </label></td>
					<td><input name="outdoors"/></td>			
				</tr>
				<tr>
					<td><label for="coordinate">Coordinate: </label></td>
					<td><input name="coordinate"/></td>		
				</tr>
			</table>
		</div>
		<div class="right-ui-item">
			<div class="header-tile-column">
				<h4>Selection</h4>
			</div>
			<div class="left-tile-column">
				<p>Angle: <span> 0 </span></p>
				<p>Mirrored: <span> true </span></p>
			</div>
			<div class="right-tile-column">
				<div>
					<img src="/png-files/ui/Editing-Flip-Vertical-icon.png" alt="clickable icon for mirroring tile"/>
				</div>
				<img src="/png-files/ui/curved-arrow.png" alt="turn tile right"/>
				<Canvas bind:this={utilityCanvas} canvasType={CanvasTypeEnum.utility}/>		
				<img src="/png-files/ui/curved-arrow.png" alt="turn tile left" class="flipped-img"/>
			</div>
		</div>
	</div>
	<div class="right-item">
		<Canvas bind:this={tilesheetCanvasLeft} canvasType={CanvasTypeEnum.tilesheet}/>	
		<Canvas bind:this={tilesheetCanvasRight} canvasType={CanvasTypeEnum.tilesheet}/>	
	</div>
</div>