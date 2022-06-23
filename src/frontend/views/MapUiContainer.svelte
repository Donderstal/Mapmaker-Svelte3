<script lang="ts">
	import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
	import Canvas from '../partials/Canvas.svelte';
	import { TILE_SIZE } from '../../resources/constants';
	import type { MapModel } from '../../models/MapModel';
	import Button from '../partials/Button.svelte';

	let activeMap : MapModel;
	let utilityCanvas;

	export const initializeUiColumn = ( mapModel : MapModel ) : void => {
		activeMap = mapModel;
		utilityCanvas.initializeGrid( 2, 2 );
		utilityCanvas.fillRect( 0, 0, TILE_SIZE * 2, TILE_SIZE * 2,"black" )
;	}
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
		grid-template-columns: [tileColumn] 20vw;
		grid-template-rows: [headerRow] 5vh [uiRow] 17.5vh;
	}
	.header-tile-row {
		grid-column: tileColumn;
		grid-row: headerRow;
	}
	.tile-row {
		grid-column: tileColumn;
		grid-row: uiRow
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
		<div class="header-tile-row">
			<h4>Selection</h4>
		</div>
		<div class="tile-row">
			<img src="/png-files/ui/curved-arrow.png" alt="turn tile right"/>
			<Canvas bind:this={utilityCanvas} canvasType={CanvasTypeEnum.utility}/>		
			<img src="/png-files/ui/curved-arrow.png" alt="turn tile left" class="flipped-img"/>
		</div>
	</div>
</div>