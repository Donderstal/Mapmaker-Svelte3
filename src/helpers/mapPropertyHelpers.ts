import type { Tile } from "../canvas/Tile";
import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import type { MapModel } from "../models/MapModel";
import type { TileModel } from "../models/TileModel";
import { initCanvasObjectModel, initTileModel } from "./modelFactory";

export const addTileToMapModel = ( tile: TileModel, location: Tile, map: MapModel, front: boolean ): void => {
	let newTileModel: TileModel = {
		id: tile.id,
		angle: tile.angle,
		mirrored: tile.mirrored
	}
	front
		? map.frontGrid[location.index] = newTileModel
		: map.grid[location.index] = newTileModel;
}

export const addSpriteToMapModel = ( sprite: CanvasObjectModel, location: Tile, map: MapModel, front: boolean ): void => {
	clearExistingSpritesAtNewSpriteLocation( sprite, location, map, front );
	const canvasObject = initCanvasObjectModel( sprite, location );
	front ? map.frontSprites.push( canvasObject ) : map.sprites.push( canvasObject );
}

export const clearExistingSpritesAtNewSpriteLocation = ( sprite: CanvasObjectModel, location: Tile, map: MapModel, front: boolean ): void => {
	let spriteModel = sprite.spriteDataModel;
	let callback: Function = null;

	if ( !spriteModel.onBackground && !spriteModel.notGrounded ) {
		callback = filterStandardMapObject;
	}
	else if ( spriteModel.onBackground ) {
		callback = filterBackMapObject;
	}
	else {
		callback = filterFrontMapObject;
	}

	map.frontSprites = !front ? map.frontSprites : map.frontSprites.filter( ( e ) => { return callback( e, location ) } );
	map.sprites = front ? map.sprites : map.sprites.filter( ( e ) => { return callback( e, location ) } );
}

export const removeTileModelFromMap = ( location: Tile, map: MapModel, front: boolean ): void => {
	let emptyTile = initTileModel( "E" );
	if ( front ) {
		map.frontGrid[location.index] = emptyTile;
	}
	else {
		map.grid[location.index] = emptyTile;
    }
}

export const removeSpriteModelFromMap = ( location: Tile, map: MapModel, front: boolean ): void => {
	if ( front ) {
		map.frontSprites = map.frontSprites.filter( ( e ) => { return !( e.column == location.column && e.row == location.row ); } );
	}
	else {
		map.sprites = map.sprites.filter( ( e ) => { return !( e.column == location.column && e.row == location.row ); } );
    }
}

const filterBackMapObject = ( e: CanvasObjectModel, location: Tile ): boolean => {
	return !( e.column == location.column && e.row == location.row && e.spriteDataModel.onBackground );
}

const filterStandardMapObject = ( e: CanvasObjectModel, location: Tile ): boolean => {
	return !( e.column == location.column && e.row == location.row && ( !e.spriteDataModel.onBackground && !e.spriteDataModel.notGrounded ) );
}

const filterFrontMapObject = ( e: CanvasObjectModel, location: Tile ): boolean => {
	return !( e.column == location.column && e.row == location.row && e.spriteDataModel.notGrounded );
}