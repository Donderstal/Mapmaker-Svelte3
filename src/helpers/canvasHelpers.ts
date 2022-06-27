import type { ImageModel } from "../models/ImageModel";
import type { SpriteFrameModel } from "../models/SpriteFrameModel"
import type { Tile } from "../canvas/Tile";
import { GRID_BLOCK_IN_SHEET_PX, MAP_SPRITE_HEIGHT_IN_SHEET, MAP_SPRITE_WIDTH_IN_SHEET, SIZE_DIVIDER, TILE_SIZE } from "../resources/constants";
import type { CharacterModel } from "../models/CharacterModel";
import type { MapObjectModel } from "../models/MapObjectModel";
import { mapObjectSpriteModels } from "../resources/mapObjectResources";
import { characterSpriteModels } from "../resources/classProfileResources";
import type { CharacterSpriteModel } from "../models/CharacterSpriteModel";
import type { MapObjectSpriteModel } from "../models/MapObjectSpriteModel";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import { SpriteSheetAlignmentEnum } from "../enumerables/SpriteSheetAlignmentEnum";
import type { TileModel } from "../models/TileModel";

export const drawToFittingCanvas = ( imageModel: ImageModel, canvas: HTMLCanvasElement, sX, sY, sWidth, sHeight, dX, dY ) : void => {
    canvas.width = sWidth / SIZE_DIVIDER;
    canvas.height = sHeight / SIZE_DIVIDER;
    drawToCanvas( imageModel, canvas, sX, sY, sWidth, sHeight, dX, dY );
}

export const drawToCanvas = ( imageModel: ImageModel, canvas: HTMLCanvasElement, sX, sY, sWidth, sHeight, dX, dY ): void => {
    const context = canvas.getContext( "2d" );
    context.drawImage(
        imageModel.image,
        sX, sY, sWidth, sHeight,
        dX, dY, sWidth / SIZE_DIVIDER, sHeight / SIZE_DIVIDER
    );
}

export const drawSpriteToTileOnCanvas = ( imageModel: ImageModel, canvas: HTMLCanvasElement, frame: SpriteFrameModel, tile: Tile ): void => {
    const context = canvas.getContext( "2d" );
    const xyInCanvas = getCanvasXyForSprite( tile, frame );
    context.drawImage(
        imageModel.image,
        frame.x, frame.y,
        frame.width, frame.height,
        xyInCanvas.x, xyInCanvas.y,
        frame.width / SIZE_DIVIDER, frame.height / SIZE_DIVIDER
    );
}

export const getImageModelForCharacter = ( character: CharacterModel ): ImageModel => {
    return getCharacterImageModelFromSpriteModel(
        characterSpriteModels.filter( ( e: CharacterSpriteModel ) => { return character.sprite == e.src } )[0]
    );
}

export const getImageModelForObject = ( mapObject: MapObjectModel ): ImageModel => {
    return getMapObjectImageModelFromSpriteModel(
        mapObjectSpriteModels.filter( ( e: MapObjectSpriteModel ) => { return mapObject.type == e.key } )[0]
    );
}

export const getCharacterImageModelFromSpriteModel = ( characterSprite: CharacterSpriteModel ): ImageModel => {
    const image: ImageModel = {
        image: new Image(),
        dataObject: characterSprite
    }
    image.image.src = "/png-files/sprites/" + characterSprite.src;
    return image;
}

export const getMapObjectImageModelFromSpriteModel = ( mapObjectSprite: MapObjectSpriteModel ): ImageModel => {
    const image: ImageModel = {
        image: new Image(),
        dataObject: mapObjectSprite
    }
    image.image.src = "/png-files/sprite-assets/" + mapObjectSprite.src;
    return image;
}

export const getSpriteFrame = ( imageModel: ImageModel, direction: DirectionEnum ): SpriteFrameModel => {
    if ( (imageModel.dataObject as CharacterSpriteModel).hasOwnProperty("className") ) {
        return getCharacterSpriteFrame( direction );
    }
    else {
        if ( ( imageModel.dataObject as MapObjectSpriteModel ).dimensionalAlignment === SpriteSheetAlignmentEnum.standard ) {
            return getStandardObjectSpriteFrame( imageModel.dataObject as MapObjectSpriteModel, direction );
        }
        else {
            return getVariableSizeObjectSpriteFrame( imageModel.dataObject as MapObjectSpriteModel, direction );
        }
    }
}

const getCharacterSpriteFrame = ( direction: DirectionEnum ): SpriteFrameModel => {
    const frame: SpriteFrameModel = {
        x: 0, y: MAP_SPRITE_HEIGHT_IN_SHEET * direction,
        width: MAP_SPRITE_WIDTH_IN_SHEET, height: MAP_SPRITE_HEIGHT_IN_SHEET,
        direction: direction
    }
    return frame;
}

const getStandardObjectSpriteFrame = ( mapObjectModel: MapObjectSpriteModel, direction: DirectionEnum ): SpriteFrameModel => {
    const frame: SpriteFrameModel = {
        x: 0, y: 0,
        width: mapObjectModel.widthBlocks * GRID_BLOCK_IN_SHEET_PX, height: mapObjectModel.heightBlocks * GRID_BLOCK_IN_SHEET_PX,
        direction: direction
    }
    return frame;
}

const getVariableSizeObjectSpriteFrame = ( mapObjectModel: MapObjectSpriteModel, direction: DirectionEnum ): SpriteFrameModel => {
    const widthInSheet = ( ( direction == DirectionEnum.down || direction == DirectionEnum.up ) ? mapObjectModel.vertWidthBlocks : mapObjectModel.horiWidthBlocks ) * GRID_BLOCK_IN_SHEET_PX;
    const heightInSheet = ( ( direction == DirectionEnum.down || direction == DirectionEnum.up ) ? mapObjectModel.vertHeightBlocks : mapObjectModel.horiHeightBlocks ) * GRID_BLOCK_IN_SHEET_PX;
    const frames: { x: number, y: number }[] = mapObjectModel.movementFrames[direction];
    const frame: SpriteFrameModel = {
        x: frames[0].x, y: frames[0].y,
        width: widthInSheet, height: heightInSheet,
        direction: direction
    }
    return frame;
}

const getCanvasXyForSprite = ( tile: Tile, frame: SpriteFrameModel ): { x: number, y: number } => {
    return { x: tile.x, y: frame.height > TILE_SIZE ? tile.y - ( (frame.height / SIZE_DIVIDER) - TILE_SIZE ): tile.y };
}

export const mirrorOrFlipTile = ( sheetImage: HTMLImageElement, tileModel: TileModel, ctx: CanvasRenderingContext2D, tilesheetXy: { x: number, y: number } ): void=> {
    ctx.clearRect( 0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX )
    tileModel.mirrored ? ctx.setTransform( -1, 0, 0, 1, GRID_BLOCK_IN_SHEET_PX, 0 ) : ctx.setTransform( 1, 0, 0, 1, 0, 0 );
    switch ( tileModel.angle ) {
        case 0:
            ctx.drawImage(
                sheetImage,
                tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX
            );
            break;
        case 90:
            ctx.translate( 0 + GRID_BLOCK_IN_SHEET_PX, 0 );
            ctx.rotate( 90 * ( Math.PI / 180 ) );
            ctx.drawImage(
                sheetImage,
                tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX
            );
            ctx.rotate( -( 90 * ( Math.PI / 180 ) ) )
            ctx.setTransform( 1, 0, 0, 1, 0, 0 );
            break;
        case 180:
            ctx.translate( 0 + GRID_BLOCK_IN_SHEET_PX, 0 + GRID_BLOCK_IN_SHEET_PX );
            ctx.rotate( Math.PI );
            ctx.drawImage(
                sheetImage,
                tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX
            );
            ctx.rotate( -Math.PI )
            ctx.setTransform( 1, 0, 0, 1, 0, 0 );
            break;
        case 270:
            ctx.translate( 0, 0 + GRID_BLOCK_IN_SHEET_PX );
            ctx.rotate( 270 * ( Math.PI / 180 ) )
            ctx.drawImage(
                sheetImage,
                tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX
            );
            ctx.rotate( -( 270 * ( Math.PI / 180 ) ) )
            ctx.setTransform( 1, 0, 0, 1, 0, 0 );
            break;
        default:
            alert( 'Error in flipping tile. Call the police!' )
    }
}