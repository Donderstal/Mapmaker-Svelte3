import { AnimationTypeEnum } from '../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../enumerables/DirectionEnum';
import type { MapModel } from '../models/MapModel';
import type { CanvasObjectModel } from '../models/CanvasObjectModel';
import { getSpriteDataModel, getSpriteDataModelBySrc } from '../resources/spriteDataResources';
import type { SpriteDataModel } from '../models/SpriteDataModel';
import type { Tile } from '../canvas/Tile';
import type { TileModel } from '../models/TileModel';
import type { DoorModel } from '../models/DoorModel';
import type { SpawnPointModel } from '../models/SpawnPointModel';
import { RoadAlignmentEnum } from '../enumerables/RoadAlignmentEnum';
import type { RoadModel } from '../models/RoadModel';
import type { NeighbourhoodModel } from '../models/NeighbourhoodModel';


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
        sprites: [],
        frontSprites: [],
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

export const initCanvasObjectModel = ( canvasObject: { [key in string]: any }, tile: Tile = null ): CanvasObjectModel => {
    const spriteTypeKey = canvasObject["type"] !== undefined ? canvasObject["type"] : canvasObject["sprite"]
    const spriteDataModel = canvasObject["type"] !== undefined
        ? getSpriteDataModel( canvasObject["type"] )
        : getSpriteDataModelBySrc( canvasObject["sprite"] )
    const model: CanvasObjectModel = {
        type: spriteTypeKey,
        row: tile != null ? tile.row : canvasObject.row,
        column: tile != null ? tile.column : canvasObject.column != null ? canvasObject.column : canvasObject.col,
        spriteDataModel: spriteDataModel,
        direction: canvasObject["direction"] !== undefined ? correctDirection( canvasObject["direction"] ) : DirectionEnum.down,
        hasDoor: canvasObject["door"] !== undefined
    }
    return model;
}

export const initCanvasObjectModelFromSpriteDataModel = ( dataModel: SpriteDataModel ): CanvasObjectModel => {
    const model: CanvasObjectModel = {
        type: dataModel.key,
        direction: DirectionEnum.down,
        row: 0,
        column: 0,
        hasDoor: false,
        spriteDataModel: dataModel
    };
    if ( dataModel.isCharacter ) {
        model.animationType = AnimationTypeEnum.idle;
    }

    return model;
}

export const initMapModel = ( mapData ): MapModel => {
    const mapModel: MapModel = {
        key: mapData.key != undefined ? mapData.key : mapData.name == undefined ? mapData.mapName : mapData.name,
        columns: mapData.columns == undefined ? mapData.cols : mapData.columns,
        rows: mapData.rows,
        location: mapData.location != undefined ? mapData.location : "",

        tileSet: mapData.tileSet,
        outdoors: mapData.outdoors,
        music: mapData.music,

        grid: mapData.grid.map( ( tile ): TileModel => { return initTileModel( tile ) } ),
        frontGrid: mapData.frontGrid != undefined
            ? mapData.frontGrid.map( ( tile ): TileModel => { return initTileModel( tile ) } )
            : mapData.grid.map( (): TileModel => { return initTileModel( "E" ) } ),

        sprites: getSprites( mapData ),
        frontSprites: getFrontSprites( mapData ),

        spawnPoints: mapData.spawnPoints != undefined
            ? mapData.spawnPoints.map( ( spawnPoint ): SpawnPointModel => { return initSpawnPointModel( spawnPoint ) } )
            : [],
        roads: mapData.roads != undefined
            ? mapData.roads.map( ( road ): RoadModel => { return initRoadModel( road ) } )
            : [],
        doors: mapData.doors != undefined
            ? mapData.doors.map( ( door ): DoorModel => { return initDoorModel( door ) } )
            : []
    };
    return mapModel;
}

const getSprites = ( mapData ) => {
    if ( mapData.sprites != undefined ) {
        return mapData.sprites.map( ( spriteJson ): CanvasObjectModel => { return initCanvasObjectModel( spriteJson ) } );
    }
    let sprites = [];
    if ( mapData.characters !== undefined ) {
        sprites = [...mapData.characters]
    }
    if ( mapData.mapObjects !== undefined ) {
        sprites = [...mapData.mapObjects, ...sprites]
    }
    return sprites.map( ( spriteJson ): CanvasObjectModel => { return initCanvasObjectModel( spriteJson ) } );
}

const getFrontSprites = ( mapData ) => {
    if ( mapData.frontSprites != undefined ) {
        return mapData.frontSprites.map( ( spriteJson ): CanvasObjectModel => { return initCanvasObjectModel( spriteJson ) } );
    }
    let sprites = [];
    if ( mapData.frontCharacters !== undefined ) {
        sprites = [...mapData.frontCharacters]
    }
    if ( mapData.frontMapObjects !== undefined ) {
        sprites = [...mapData.frontMapObjects, ...sprites]
    }
    return sprites.map( ( spriteJson ): CanvasObjectModel => { return initCanvasObjectModel( spriteJson ) } );
}

export const initNeighbourhoodModel = ( neighbourhoodData, availableMaps ): NeighbourhoodModel => {
    const mapKeys = Object.keys( neighbourhoodData.mapDictionary )
    const mapDictionary = {}

    mapKeys.forEach( ( key ) => {
        mapDictionary[key] = availableMaps.filter( ( e ) => {
            return e.key.includes( neighbourhoodData.mapDictionary[key] )
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

export const initTileModel = ( tileData ): TileModel => {
    const isDataObject = typeof tileData !== "string" && typeof tileData !== "number"
    const tileModel: TileModel = {
        id: isDataObject ? tileData.id : tileData,
        angle: isDataObject ? tileData.angle : 0,
        mirrored: isDataObject ? tileData.mirrored : false,

    };
    return tileModel;
}

const initRoadModel = ( roadData ): RoadModel => {
    const roadModel: RoadModel = {
        direction: correctDirection( roadData.direction),
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

const initSpawnPointModel = ( spawnPointData ): SpawnPointModel => {
    const spawnPointModel: SpawnPointModel = {
        row: spawnPointData.row,
        column: spawnPointData.column == undefined ? spawnPointData.col : spawnPointData.column,
        direction: correctDirection( spawnPointData.direction)
    };
    return spawnPointModel;
}

const initDoorModel = ( doorData ): DoorModel => {
    const doorModel: DoorModel = {
        row: doorData.row,
        column: doorData.column == undefined ? doorData.col : doorData.column,
        destination: doorData.destination,
        direction: correctDirection(doorData.direction)
    };
    return doorModel;
}

const correctDirection = (direction) => {
    if ( direction === "FACING_DOWN" ) {
        return DirectionEnum.down;
    }
    if ( direction === "FACING_LEFT" ) {
        return DirectionEnum.left;
    }
    if ( direction === "FACING_UP" ) {
        return DirectionEnum.up;
    }
    if ( direction === "FACING_RIGHT" ) {
        return DirectionEnum.right;
    }
    return direction
}