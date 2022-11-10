import type { CharacterModel } from "../models/CharacterModel";
import type { DoorModel } from "../models/DoorModel";
import type { MapModel } from "../models/MapModel";
import type { MapObjectModel } from "../models/MapObjectModel";
import type { RoadModel } from "../models/RoadModel";
import type { SpawnPointModel } from "../models/SpawnPointModel";
import type { TileModel } from "../models/TileModel";

export const getJsonFromMapModel = ( model: MapModel ): object => {
    return {
        "key": model.key,
        "location": model.location,
        "columns": model.columns,
        "rows": model.rows,
        "tileSet": model.tileSet,
        "outdoors": model.outdoors,
        "music": model.music,

        "grid": model.grid.map( mapTileToObject ),
        "frontGrid": model.frontGrid.map( mapTileToObject ),

        "characters": model.characters.map( mapCharacterToObject ),
        "frontCharacters": model.frontCharacters.map( mapCharacterToObject ),

        "mapObjects": model.mapObjects.map( mapMapObjectToObject ),
        "frontMapObjects": model.frontMapObjects.map( mapMapObjectToObject ),

        "spawnPoints": model.spawnPoints.map( mapSpawnPointToObject ),
        "roads": model.roads.map( mapRoadToObject ),
        "doors": model.doors.map( mapDoorToObject )
    };
}

const mapTileToObject = ( tile: TileModel ): object => {
    return {
        "id": tile.id,
        "angle": tile.angle,
        "mirrored": tile.mirrored
    }
}

const mapCharacterToObject = ( character: CharacterModel ): object => {
    return {
        "animation_type": character.animation_type,
        "direction": character.direction,
        "sprite": character.sprite,
        "row": character.row,
        "column": character.column
    }
}

const mapMapObjectToObject = ( mapObject: MapObjectModel ): object => {
    return {
        "type": mapObject.type,
        "direction": mapObject.direction,
        "row": mapObject.row,
        "column": mapObject.column
    }
}

const mapSpawnPointToObject = ( spawnPoint: SpawnPointModel ): object => {
    return {
        "direction": spawnPoint.direction,
        "row": spawnPoint.row,
        "column": spawnPoint.column
    }
}

const mapRoadToObject = ( road: RoadModel ): object => {
    return {
        "direction": road.direction,
        "alignment": road.alignment,
        "hasStart": road.hasStart,
        "primaryColumn": road.primaryColumn,
        "secondaryColumn": road.secondaryColumn,
        "primaryRow": road.primaryRow,
        "secondaryRow": road.secondaryRow
    }
}

const mapDoorToObject = ( door: DoorModel ): object => {
    return {
        "direction": door.direction,
        "destination": door.destination,
        "row": door.row,
        "col": door.column
    }
}