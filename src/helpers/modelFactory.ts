import { AnimationTypeEnum } from '../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../enumerables/DirectionEnum';

import { initTileModel } from './setUserData';

import type { CharacterModel } from '../models/CharacterModel';
import type { CharacterSpriteModel } from '../models/CharacterSpriteModel';
import type { MapModel } from '../models/MapModel';
import type { MapObjectModel } from '../models/MapObjectModel';
import type { MapObjectSpriteModel } from '../models/MapObjectSpriteModel';


export const getMapModelForNewMap = ( menuData: object ) => {
    let mapModel: MapModel = {
        key: menuData["name"],
        columns: parseInt( menuData["columns"] ),
        rows: parseInt( menuData["rows"] ),
        tileSet: menuData["tilesheet"],
        outdoors: menuData["columns"] == 24 && menuData["rows"] == 16,

        grid: getEmptyGrid( menuData["columns"], menuData["rows"] ),
        frontGrid: getEmptyGrid( menuData["columns"], menuData["rows"] ),
        spawnPoints: [],
        characters: [],
        frontCharacters: [],
        mapObjects: [],
        frontMapObjects: [],
        roads: [],
        doors: []
    }

    return mapModel;
}

const getEmptyGrid = ( columns: number, rows: number ) => {
    const tileInGrid = columns * rows;
    let gridArray = []
    for ( var index = 0; index < tileInGrid; index++ ) {
        gridArray.push( initTileModel( "E" ) );
    }
    return gridArray
}

export const getCharacterModelFromSpriteModel = ( characterSprite: CharacterSpriteModel ): CharacterModel => {
    const model: CharacterModel = {
        sprite: characterSprite.src,
        animation_type: AnimationTypeEnum.semiIdle,
        direction: DirectionEnum.down,
        row: 0,
        column: 0
    }
    return model;
}

export const getMapObjectModelFromSpriteModel = ( mapObjectSprite: MapObjectSpriteModel ): MapObjectModel => {
    const model: MapObjectModel = {
        type: mapObjectSprite.key,
        direction: DirectionEnum.down,
        row: 0,
        column: 0
    }
    return model;
}