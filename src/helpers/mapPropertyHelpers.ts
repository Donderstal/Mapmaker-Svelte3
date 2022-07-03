import type { Tile } from "../canvas/Tile";
import type { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum";
import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import type { CharacterModel } from "../models/CharacterModel";
import type { MapModel } from "../models/MapModel";
import type { MapObjectModel } from "../models/MapObjectModel";
import type { MapObjectSpriteModel } from "../models/MapObjectSpriteModel";
import type { TileModel } from "../models/TileModel";
import { initTileModel } from "./setUserData";
import { getAssociatedMapObjectSpriteModel } from "./sortHelpers";

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
	if ( !sprite.hasOwnProperty( "type" ) ) {
		let spriteAsCharacter = sprite as CharacterModel;
		let char: CharacterModel = {
			animation_type: spriteAsCharacter.animation_type as AnimationTypeEnum,
			column: location.column,
			row: location.row,
			direction: spriteAsCharacter.direction,
			sprite: spriteAsCharacter.sprite,
		}
		front ? map.frontCharacters.push( char ) : map.characters.push( char );
	}
	else {
		let spriteAsObject = sprite as MapObjectModel;
		let obj: MapObjectModel = {
			row: location.row,
			column: location.column,
			direction: spriteAsObject.direction,
			type: spriteAsObject.type,
		}
		front ? map.frontMapObjects.push( obj ) : map.mapObjects.push( obj );
	}
}

export const clearExistingSpritesAtNewSpriteLocation = ( sprite: CanvasObjectModel, location: Tile, map: MapModel, front: boolean ): void => {
	let spriteModel: MapObjectSpriteModel = undefined;
	if ( sprite.hasOwnProperty( "type" ) ) {
		spriteModel = getAssociatedMapObjectSpriteModel( sprite as MapObjectModel );
    }

	let newSpriteIsBackground = spriteModel === undefined ? false : spriteModel.onBackground;
	let newSpriteIsForeground = spriteModel === undefined ? false : spriteModel.notGrounded;
	let newSpriteIsStandard = !newSpriteIsBackground && !newSpriteIsForeground;

	if ( newSpriteIsStandard ) {
		if ( front ) {
			map.frontCharacters = map.frontCharacters.filter( ( e ) => { return filterCharacter( e, location ) } );
			map.frontMapObjects = map.frontMapObjects.filter( ( e ) => { return filterStandardMapObject( e, location ) } );
		}
		else {
			map.characters = map.characters.filter( ( e ) => { return filterCharacter( e, location ) } );
			map.mapObjects = map.mapObjects.filter( ( e ) => { return filterStandardMapObject( e, location ) } );
		}
	}
	else if ( newSpriteIsBackground ) {
		if ( front ) {
			map.frontMapObjects = map.frontMapObjects.filter( ( e ) => { return filterBackMapObject( e, location ) } );
		}
		else {
			map.mapObjects = map.mapObjects.filter( ( e ) => { return filterBackMapObject( e, location ) } );
		}
	}
	else {
		if ( front ) {
			map.frontMapObjects = map.frontMapObjects.filter( ( e ) => { return filterFrontMapObject( e, location ) } );
		}
		else {
			map.mapObjects = map.mapObjects.filter( ( e ) => { return filterFrontMapObject( e, location ) } );
		}
	}
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
		map.frontCharacters = map.frontCharacters.filter( ( e ) => { return !( e.column == location.column && e.row == location.row ); } );
		map.frontMapObjects = map.frontMapObjects.filter( ( e ) => { return !( e.column == location.column && e.row == location.row ); } );
	}
	else {
		map.characters = map.characters.filter( ( e ) => { return !(e.column == location.column && e.row == location.row); } );
		map.mapObjects = map.mapObjects.filter( ( e ) => { return !( e.column == location.column && e.row == location.row ); } );
    }
}

const filterCharacter = ( e: CharacterModel, location: Tile ): boolean => {
	return !( e.column == location.column && e.row == location.row )
}

const filterBackMapObject = ( e: MapObjectModel, location: Tile ): boolean => {
	let model = getAssociatedMapObjectSpriteModel( e );
	return !( e.column == location.column && e.row == location.row && model.onBackground );
}

const filterStandardMapObject = ( e: MapObjectModel, location: Tile ): boolean => {
	let model = getAssociatedMapObjectSpriteModel( e );
	return !( e.column == location.column && e.row == location.row && ( !model.onBackground && !model.notGrounded ) );
}

const filterFrontMapObject = ( e: MapObjectModel, location: Tile ): boolean => {
	let model = getAssociatedMapObjectSpriteModel( e );
	return !( e.column == location.column && e.row == location.row && model.notGrounded );
}