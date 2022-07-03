import type { ImageModel } from "../models/ImageModel";
import type { SpriteFrameModel } from "../models/SpriteFrameModel";
import type { Tile } from "../canvas/Tile";
import { GRID_BLOCK_IN_SHEET_PX, SIZE_DIVIDER, TILE_SIZE } from "../resources/constants";
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