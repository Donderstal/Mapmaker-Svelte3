<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { MapModel } from '../models/MapModel';
	import { onUserLogin, user } from '../stores';
	import MapCanvasContainer from './views/MapCanvasContainer.svelte';
	import MapTilesheetsContainer from './views/MapTilesheetsContainer.svelte';
	import MapUiContainer from './views/MapUiContainer.svelte';
	import SpriteCanvasContainer from './views/SpriteCanvasContainer.svelte';
	import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum';
	import type { Tile } from '../canvas/Tile';
	import type { TileModel } from '../models/TileModel';
	import type { CanvasObjectModel } from '../models/CanvasObjectModel';
	import { DirectionEnum } from '../enumerables/DirectionEnum';
	import { addSpriteToMapModel, addTileToMapModel, removeSpriteModelFromMap, removeTileModelFromMap } from '../helpers/mapPropertyHelpers';
	import { getJsonFromMapModel } from '../helpers/exportHelpers';
    import type { TilesheetModel } from '../models/TilesheetModel';
    import type { SpriteDataModel } from '../models/SpriteDataModel';
    import { initCanvasObjectModelFromSpriteDataModel } from '../helpers/modelFactory';

	export let activeMap : MapModel;
	let activeSheet : TilesheetModel

	let selection : TileModel | CanvasObjectModel;
	let selectionIsTile : boolean;
	let selectionIsSprite : boolean;
	let selectionIsTurnable : boolean;

	let mapCanvasContainer : MapCanvasContainer;
	let mapTilesheetsContainer : MapTilesheetsContainer;
	let mapUiContainer : MapUiContainer;

	let hideTilesheets = false;
	let hideSprites = false;
	
	let clickStartColumn;
	let clickStartRow;

	onMount(()=>{
		let tileSheets : TilesheetModel[] = Object.values($user.tilesets);
		activeSheet = tileSheets.filter((e)=>{return e.key === activeMap.tileSet})[0];

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

	const registerMouseClickStartInMap = ( tile: Tile ): void => {
		clickStartColumn = tile.column;
		clickStartRow = tile.row;
	}

	const registerMouseClickEndInMap = ( tile: Tile, type: CanvasTypeEnum, shiftKeyIsDown: boolean ): void => {
		const clickEndColumn = tile.column;
		const clickEndRow = tile.row;

		const clickRangeSquare = {
			left: clickStartColumn > clickEndColumn ? clickEndColumn : clickStartColumn,
			top: clickStartRow > clickEndRow ? clickEndRow : clickStartRow,
			right: clickStartColumn < clickEndColumn ? clickEndColumn : clickStartColumn,
			bottom: clickStartRow < clickEndRow ? clickEndRow : clickStartRow
		}

		const tilesInRange = [];
		if ( selectionIsTile ) {
			let column = clickRangeSquare.left;
			while( column <= clickRangeSquare.right ) {
				let row = clickRangeSquare.top;
				while( row <= clickRangeSquare.bottom ) {
					const tile = mapCanvasContainer.getTileAtCell( column, row, type );
					tilesInRange.push(tile);
					row++;
				}
				column++;
			}
		}
		tilesInRange.forEach((e)=>{
			shiftKeyIsDown 
				? removeTileModelFromMap( e, activeMap, type === CanvasTypeEnum.foreground ) 
				: addTileToMapModel( selection as TileModel, e, activeMap, type === CanvasTypeEnum.foreground );
		})
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

	const handleSpritesheetClick = (dataModel: SpriteDataModel): void => {
		setSelection(initCanvasObjectModelFromSpriteDataModel(dataModel))
		mapUiContainer.setSpriteToUtilityCanvas(selection as CanvasObjectModel);
		selectionIsTile = false;
		selectionIsSprite = true;
		selectionIsTurnable = dataModel.isCar || dataModel.isCharacter;
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
		selectedSprite.direction = direction;
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
		form.append("map_name", activeMap.key);
		form.append("map_json", JSON.stringify(getJsonFromMapModel(activeMap)));
		form.append("form_type", "POST_MAP")
		fetch( "catch_http_request.php", {
			method: "POST",
			body: form
		}).then( response => { 
			return response.json()
		}).then( json => { 
			let object = JSON.parse(json);
			if( object["save-map-success"] ) {
				alert("Map saved!");
				onUserLogin();
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
		aElement.setAttribute('download', activeMap.key + '.json');
		aElement.click();
	}

	const updateMapName = ( name: string ): void => {
		activeMap.key = name;
	}

	const updateMapLocation = ( location: string ): void => {
		activeMap.location = location;
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
			registerMouseClickStartInMap={registerMouseClickStartInMap} registerMouseClickEndInMap={registerMouseClickEndInMap}
		/>
	</div>
	<div class="bottom-item">
		<MapUiContainer 
			bind:this={mapUiContainer}
			turnableSelection={selection != null && selectionIsTurnable}
			saveGame={saveGame} exportGame={exportGame}
			mapKey={activeMap.key} updateMapName={updateMapName}
			mapLocation={activeMap.location} updateMapLocation={updateMapLocation}
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