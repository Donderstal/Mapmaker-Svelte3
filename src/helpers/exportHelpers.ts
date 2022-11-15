import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import type { DoorModel } from "../models/DoorModel";
import type { MapModel } from "../models/MapModel";
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

        "sprites": model.sprites.map( mapCanvasObjectToJsonObject ),
        "frontSprites": model.frontSprites.map( mapCanvasObjectToJsonObject ),

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

const mapCanvasObjectToJsonObject = ( canvasObject: CanvasObjectModel ) => {
    return {
        "type": canvasObject.type,
        "column": canvasObject.column,
        "row": canvasObject.row,
        "direction": canvasObject.direction,
        "animation_type": canvasObject.animationType
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