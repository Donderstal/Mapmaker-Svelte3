<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { MapModel } from '../models/MapModel';
	import { user } from '../stores';
	import MapCanvasContainer from './views/MapCanvasContainer.svelte';
	import MapTilesheetsContainer from './views/MapTilesheetsContainer.svelte';
	import type { ImageModel } from '../models/ImageModel';
	import MapUiContainer from './views/MapUiContainer.svelte';
	import SpriteCanvasContainer from './views/SpriteCanvasContainer.svelte';
	import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum';
	import type { Tile } from '../canvas/Tile';
	import type { TileModel } from '../models/TileModel';
	import type { CanvasObjectModel } from '../models/CanvasObjectModel';
	import type { CharacterSpriteModel } from '../models/CharacterSpriteModel';
	import type { MapObjectSpriteModel } from '../models/MapObjectSpriteModel';
	import { getCharacterModelFromSpriteModel, getMapObjectModelFromSpriteModel } from '../helpers/modelFactory';
	import { DirectionEnum } from '../enumerables/DirectionEnum';
	import type { CharacterModel } from '../models/CharacterModel';
	import type { MapObjectModel } from '../models/MapObjectModel';
	import { addSpriteToMapModel, addTileToMapModel, removeSpriteModelFromMap, removeTileModelFromMap } from '../helpers/mapPropertyHelpers';
	import { getJsonFromMapModel } from '../helpers/exportHelpers';

	export let activeMap : MapModel;
	let activeSheet : ImageModel;

	let selection : TileModel | CanvasObjectModel;
	let selectionIsTile : boolean;
	let selectionIsSprite : boolean;
	let selectionIsTurnable : boolean;

	let mapCanvasContainer : MapCanvasContainer;
	let mapTilesheetsContainer : MapTilesheetsContainer;
	let mapUiContainer : MapUiContainer;

	let hideTilesheets = false;
	let hideSprites = false;

	onMount(()=>{
		let tileSheets : ImageModel[] = Object.values($user.tilesets);
		activeSheet = tileSheets.filter((e)=>{return e.dataObject.key === activeMap.tileSet})[0];

		mapTilesheetsContainer.initializeTilesheetColumn( activeSheet );
		mapCanvasContainer.initializeMapMakerCanvases( activeMap, activeSheet );
		mapUiContainer.initializeUiColumn( );
		handleEditModeSwitch( CanvasTypeEnum.frontSprites );
		document.addEventListener('keydown', handleKeyPress);
	})

	onDestroy(()=>{
		document.removeEventListener('keydown', handleKeyPress);
	})

	const setSelection = ( newSelection : TileModel | CanvasObjectModel )=> {
		selection = newSelection;
	}

	const handleEditModeSwitch = ( type : CanvasTypeEnum ) : void => {
		mapUiContainer.initializeUiColumn( );
		setSelection( null );
		selectionIsTile = false;
		selectionIsSprite = false;
		selectionIsTurnable = false;

		if ( type === CanvasTypeEnum.background || type === CanvasTypeEnum.foreground ) {
			hideTilesheets = false;
			hideSprites = true;
		}
		else {
			hideTilesheets = true;
			hideSprites = false;
		}
	}

	const handleMapCanvasClick = (tile: Tile, type: CanvasTypeEnum, shiftKeyIsDown: boolean): void => {
		if ( (selection === null || selection === undefined ) && !shiftKeyIsDown ) {
			return;
		}
		if ( type === CanvasTypeEnum.background ) {
			shiftKeyIsDown ? removeTileModelFromMap( tile, activeMap, false ) : addTileToMapModel( selection as TileModel, tile, activeMap, false );
		}
		if ( type === CanvasTypeEnum.backSprites ) {
			shiftKeyIsDown ? removeSpriteModelFromMap( tile, activeMap, false ) : addSpriteToMapModel( selection as CanvasObjectModel, tile, activeMap, false );
		}
		if ( type === CanvasTypeEnum.foreground ) {
			shiftKeyIsDown ? removeTileModelFromMap( tile, activeMap, true ) : addTileToMapModel( selection as TileModel, tile, activeMap, true );
		}
		if ( type === CanvasTypeEnum.frontSprites ) {
			shiftKeyIsDown ? removeSpriteModelFromMap( tile, activeMap, true ) : addSpriteToMapModel( selection as CanvasObjectModel, tile, activeMap, true );
		}
		mapCanvasContainer.initializeMapMakerCanvases( activeMap, activeSheet );
	}

	const handleTilesheetClick = (tile: Tile): void => {
		let tileModel : TileModel = tile.tileModel;
		tileModel.id = tile.index;
		mapUiContainer.setTileToUtilityCanvas(tileModel, activeSheet);
		setSelection(tileModel);
		selectionIsTile = true;
		selectionIsSprite = false;
		selectionIsTurnable = true;
	}

	const handleSpritesheetClick = (canvasObjectModel: CharacterSpriteModel|MapObjectSpriteModel): void => {
		setSelection((canvasObjectModel as CharacterSpriteModel).hasOwnProperty("className") 
			? getCharacterModelFromSpriteModel(canvasObjectModel as CharacterSpriteModel) 
			: getMapObjectModelFromSpriteModel(canvasObjectModel as MapObjectSpriteModel));
		mapUiContainer.setSpriteToUtilityCanvas(selection as CanvasObjectModel);
		selectionIsTile = false;
		selectionIsSprite = true;
		selectionIsTurnable = (canvasObjectModel as MapObjectSpriteModel).isCar || (canvasObjectModel as CharacterSpriteModel).hasOwnProperty("className");
	}

	const handleKeyPress = (event: KeyboardEvent): void => {
		if ( !selectionIsTurnable ) {
			return;
		}
		if ( selectionIsTile ) {
			switch( event.key ) {
				case "a":
					turnSelectedTile( DirectionEnum.left );
					break;
				case "w":
					mirrorSelectedTile()
					break;
				case "d":
					turnSelectedTile( DirectionEnum.right );
					break;
				case "s":
					mirrorSelectedTile();
					break;
			}
		}
		if ( selectionIsSprite ) {
			switch( event.key ) {
				case "a":
					turnSelectedSprite( DirectionEnum.left );
					break;
				case "w":
					turnSelectedSprite( DirectionEnum.up );
					break;
				case "d":
					turnSelectedSprite( DirectionEnum.right );
					break;
				case "s":
					turnSelectedSprite( DirectionEnum.down );
					break;
			}
		}
	}

	const turnSelectedSprite = (direction: DirectionEnum): void => {
		const selectedSprite = selection as CanvasObjectModel;
		if ( selectedSprite.hasOwnProperty("sprite") ) {
			(selectedSprite as CharacterModel).direction = direction;
		}
		else {
			(selectedSprite as MapObjectModel).direction = direction;
		}
		mapUiContainer.setSpriteToUtilityCanvas(selectedSprite);
	}

	const turnSelectedTile = (direction: DirectionEnum): void => {
		const selectedTile = selection as TileModel;
		if ( direction === DirectionEnum.left ) {
			selectedTile.angle === 0 ? selectedTile.angle = 270 : selectedTile.angle -= 90;
		}
		if ( direction === DirectionEnum.right ) {
			selectedTile.angle === 270 ? selectedTile.angle = 0 : selectedTile.angle += 90;
		}
		mapUiContainer.setTileToUtilityCanvas(selectedTile, activeSheet);
	}

	const mirrorSelectedTile = (): void => {
		const selectedTile = selection as TileModel;
		selectedTile.mirrored = !selectedTile.mirrored;
		mapUiContainer.setTileToUtilityCanvas(selectedTile, activeSheet);
	}

	const saveGame = (): void => {
		let form = new FormData();
		form.append("map_name", activeMap.name);
		form.append("map_json", JSON.stringify(getJsonFromMapModel(activeMap)));
		form.append("form_type", "POST_MAP")
		fetch( "catch_http_request.php", {
			method: "POST",
			body: form
		}).then( response => { 
			return response.json()
		}).then( json => { 
			if( json["save-map-success"] ) {
				alert("Map saved!");
				return;
			}
			console.log(getJsonFromMapModel(activeMap))
			alert("Error saving map!");
		}).catch(err => {
			console.trace( );
			console.log("Error Reading data " + err);
			alert("Error saving map!");
		} );
	}

	const exportGame = (): void => {
		let uri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(getJsonFromMapModel(activeMap)));
		let aElement = document.createElement('a');
		aElement.setAttribute('href', uri);
		aElement.setAttribute('download', activeMap.name + '.json');
		aElement.click();
	}
</script>
<style>
	.container {
		display: grid;
		grid-template-columns: [leftMargin] 5vw [leftColumn] 65vw [rightColumn] 25vw [rightMargin] 5vw;
		grid-template-rows: [topMargin] 2.5vh [center] 72.5vh [bottomRow] 22.5vh [bottomMargin] 2.5vh;
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
	<div class="center-item">
		<MapCanvasContainer 
			bind:this={mapCanvasContainer} 
			handleEditModeSwitch={handleEditModeSwitch} handleMapCanvasClick={handleMapCanvasClick}
		/>
	</div>
	<div class="bottom-item">
		<MapUiContainer 
			bind:this={mapUiContainer}
			turnableSelection={selection != null && selectionIsTurnable}
			saveGame={saveGame} exportGame={exportGame}
		/>
	</div>
	<div class="right-item">
		<SpriteCanvasContainer 
			hide={hideSprites}
			handleSpritesheetClick={handleSpritesheetClick}
		/>
		<MapTilesheetsContainer 
			bind:this={mapTilesheetsContainer} hide={hideTilesheets}
			handleTilesheetClick={handleTilesheetClick}
		/>
	</div>
</div>