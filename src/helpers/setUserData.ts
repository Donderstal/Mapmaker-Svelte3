import type { MapModel } from '../models/MapModel';
import type { UserModel } from "../models/UserModel";
import type { NeighbourhoodModel } from '../models/NeighbourhoodModel';
import type { TileModel } from '../models/TileModel';
import type { RoadModel } from '../models/RoadModel';
import type { SpawnPointModel } from '../models/SpawnPointModel';
import type { CharacterModel } from '../models/CharacterModel';
import type { MapObjectModel } from '../models/MapObjectModel';
import type { DoorModel } from '../models/DoorModel';
import type { ImageModel } from '../models/ImageModel';

import { RoadAlignmentEnum } from '../enumerables/RoadAlignmentEnum';
import { getTileSheetModels, sheets } from '../resources/tilesheetResources';
import { getClassProfiles } from '../resources/classProfileResources';
import { getMapObjectSpriteModels } from '../resources/mapObjectResources';

export const setUserData = ( characters, objects, maps, neighbourhoods ) => {
    const availableMaps = Object.keys( maps ).map( ( mapKey ) => {
        return initMapModel( maps[mapKey] );
    } )
    const returner: UserModel = {
        name: "test",
        characterPngs: initCharacterSprites(  ),
        assetPngs: initMapObjectSprites( ),
        tilesets: initTilesheets( ),

        maps: availableMaps,
        neighbourhoods: Object.keys( neighbourhoods ).map( ( neighbourhoodKey ) => {
            return initNeighbourhoodModel( neighbourhoods[neighbourhoodKey], availableMaps )
        } )
    };
    return returner;
}

const initCharacterSprites = ( ) => {
    const characters = getClassProfiles();
    return characters.map( ( character ) => {
        const image: ImageModel = {
            image: new Image( ),
            dataObject: character
        }
        image.image.src = character.src;
        return image;
    } )
}

const initMapObjectSprites = ( ) => {
    const mapObjectSprites = getMapObjectSpriteModels();
    return mapObjectSprites.map( ( spriteModel ) => {
        const image: ImageModel = {
            image: new Image( ),
            dataObject: spriteModel
        }
        image.image.src = spriteModel.src;
        return image;
    } )
}

const initTilesheets = () => {
    const tilesheetModels = getTileSheetModels();
    return tilesheetModels.map( ( sheetModel ) => {
        const image: ImageModel = {
            image: new Image(),
            dataObject: sheetModel
        }
        image.image.src = sheetModel.src;
        return image;
    } );
}

export const initMapModel = ( mapData ) => {
    const mapModel: MapModel = {
        name: mapData.name == undefined ? mapData.mapName : mapData.name,
        columns: mapData.columns == undefined ? mapData.cols : mapData.columns,
        rows: mapData.rows,

        tileSet: mapData.tileSet,
        outdoors: mapData.outdoors,
        music: mapData.music,

        grid: mapData.grid.map( ( tile ) => { return initTileModel( tile ) } ),
        frontGrid: mapData.frontGrid != undefined
            ? mapData.frontGrid.map( ( tile ) => { return initTileModel( tile ) } )
            : mapData.grid.map( ( tile ) => { return initTileModel( "E" ) } ),

        characters: mapData.characters != undefined 
            ? mapData.characters.map( ( character ) => { return initCharacterModel( character ) } )
            : [],
        mapObjects: mapData.mapObjects != undefined 
            ? mapData.mapObjects.map( ( mapObject ) => { return initMapObjectModel( mapObject ) } )
            : [],

        spawnPoints: mapData.spawnPoints != undefined 
            ? mapData.spawnPoints.map( ( spawnPoint ) => { return initSpawnPointModel( spawnPoint ) } )
            : [],
        roads: mapData.roads != undefined
            ? mapData.roads.map( ( road ) => { return initRoadModel( road ) } )
            : [],
        doors: mapData.doors != undefined
            ? mapData.doors.map( ( door ) => { return initDoorModel( door ) } )
            : []
    };
    return mapModel;
}

export const initNeighbourhoodModel = ( neighbourhoodData, availableMaps ) => {
    const mapKeys = Object.keys( neighbourhoodData.mapDictionary ) 
    const mapDictionary = {}

    mapKeys.forEach( ( key ) => {
        mapDictionary[key]  = availableMaps.filter( ( e ) => {
            return e.name.includes( neighbourhoodData.mapDictionary[key] )
        } )[0]
    } )

    const neighbourhoodModel: NeighbourhoodModel = {
        name: neighbourhoodData.name,

        horizontalSlots: neighbourhoodData.horizontal_slots,
        verticalSlots: neighbourhoodData.vertical_slots,

        mapDictionary: mapDictionary
    };
    return neighbourhoodModel;
}

export const initTileModel = ( tileData ) => {
    const isDataObject = typeof tileData !== "string" && typeof tileData !== "number"
    const tileModel: TileModel = {
        id: isDataObject ? tileData.id : tileData,
        angle: isDataObject ? tileData.angle : 0,
        mirrored: isDataObject ? tileData.mirrored : false,

    };
    return tileModel;
}

export const initRoadModel = ( roadData ) => {
    const roadModel: RoadModel = {
        direction: roadData.direction,
        alignment: roadData.alignment,
        hasStart: roadData.hasStart,

        primaryColumn: roadData.primaryColumn == undefined ?
            roadData.alignment == RoadAlignmentEnum.horizontal
                ? roadData.startCol
                : roadData.leftCol
            : roadData.primaryColumn,
        secondaryColumn: roadData.secondaryColumn == undefined ?
            roadData.alignment == RoadAlignmentEnum.horizontal
                ? roadData.endCol
                : roadData.rightCol
            : roadData.secondaryColumn,

        primaryRow: roadData.primaryRow == undefined ?
            roadData.alignment == RoadAlignmentEnum.horizontal
                ? roadData.startRow
                : roadData.topRow
            : roadData.primaryRow,
        secondaryRow: roadData.secondaryRow == undefined ?
            roadData.alignment == RoadAlignmentEnum.horizontal
                ? roadData.endRow
                : roadData.bottomRow
            : roadData.secondaryRow,
    };
    return roadModel;
}

export const initSpawnPointModel = ( spawnPointData ) => {
    const spawnPointModel: SpawnPointModel = {
        row: spawnPointData.row,
        column: spawnPointData.column == undefined ? spawnPointData.col : spawnPointData.column,
        direction: spawnPointData.direction
    };
    return spawnPointModel;
}

export const initCharacterModel = ( characterData ) => {
    const characterModel: CharacterModel = {
        animation_type: characterData.anim_type,
        sprite: characterData.sprite,
        row: characterData.row,
        column: characterData.column == undefined ? characterData.col : characterData.column,
        direction: characterData.direction
    };
    return characterModel;
}

export const initMapObjectModel = ( mapObjectData ) => {
    const mapObjectModel: MapObjectModel = {
        type: mapObjectData.type,
        row: mapObjectData.row,
        column: mapObjectData.column == undefined ? mapObjectData.col : mapObjectData.column,
        direction: mapObjectData.direction == undefined ? null : mapObjectData.direction
    };
    return mapObjectModel;
}

export const initDoorModel = ( doorData ) => {
    const doorModel: DoorModel = {
        row: doorData.row,
        column: doorData.column == undefined ? doorData.col : doorData.column,
        destination: doorData.destination,
        direction: doorData.direction
    };
    return doorModel;
}