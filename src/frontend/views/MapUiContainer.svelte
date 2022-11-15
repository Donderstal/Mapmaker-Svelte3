<script lang="ts">
	import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
	import Canvas from '../partials/Canvas.svelte';
	import { SHEET_XY_VALUES, TILE_SIZE } from '../../resources/constants';
	import Button from '../partials/Button.svelte';
	import type { TileModel } from '../../models/TileModel';
    import type { CanvasObjectModel } from '../../models/CanvasObjectModel';
    import type { TilesheetModel } from '../../models/TilesheetModel';

	let utilityCanvas;

	export let turnableSelection;
	export let saveGame;
	export let exportGame;

	export let mapKey;
	export let updateMapName;

	export let mapLocation;
	export let updateMapLocation;

	export const initializeUiColumn = ( ) : void => {
		utilityCanvas.initializeGrid( 2, 2 );
		utilityCanvas.fillRect( 0, 0, TILE_SIZE * 2, TILE_SIZE * 2, "black" );	
	}
	
	export const setSpriteToUtilityCanvas = ( canvasObjectModel: CanvasObjectModel ): void => {
		utilityCanvas.setSpriteDataModelToCanvas(canvasObjectModel.spriteDataModel, canvasObjectModel.direction)
	}

	export const setTileToUtilityCanvas = ( tileModel: TileModel, activeSheet: TilesheetModel ) => {
		const xy: {x: number, y: number} = SHEET_XY_VALUES[tileModel.id];
		utilityCanvas.drawTileToFittingCanvas( activeSheet, tileModel, xy );
	}

	const updateMapNameValue = ( ) => {
		updateMapName( mapKey );
	} 

	const updateMapLocationValue = ( ) => {
		updateMapLocation( mapLocation );
	} 
</script>
<style>
	.ui-container-grid {
		display: grid;
		grid-template-columns: [leftUiColumn] 10vw [centerLeftUiColumn] 15vw [centerRightUiColumn] 20vw [rightUiColumn] 20vw;
		grid-template-rows: [uiRow] 22.5vh;
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
	}
	h4 {
		margin: 0 auto 1vh auto;
		font-size: 3vh;
	}
	input { 
		max-width: 10vw;
	}
</style>
<div class="ui-container-grid">
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
		<Button buttonText={"Save map"} action={saveGame}/>
		<br/>
		<br/>			
		<Button buttonText={"Export map"} action={exportGame}/>
	</div>
	<div class="center-right-ui-item">
		<table>
			<tr>
				<td><label for="standard">Map key: </label></td>
				<td><input name="map-name" bind:value={mapKey} on:change={updateMapNameValue}/></td>
			</tr>
						<tr>
				<td><label for="standard">Location: </label></td>
				<td><input name="map-name" bind:value={mapLocation} on:change={updateMapLocationValue}/></td>
			</tr>
		</table>
	</div>
	<div class="right-ui-item">
		<Canvas bind:this={utilityCanvas} canvasType={CanvasTypeEnum.utility}/>
		{#if turnableSelection}
			<p>Turn or mirror your selection with w a s d</p>
		{/if}
	</div>
</div>