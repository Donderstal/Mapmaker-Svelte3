import { Tile } from "./Tile";
import type { ImageModel } from "../models/ImageModel";
import type { TileModel } from "../models/TileModel";
import { GRID_BLOCK_IN_SHEET_PX, SHEET_XY_VALUES, TILE_SIZE } from "../resources/constants";

export class Grid {
    x: number;
    y: number;
    columns: number;
    rows: number;
    tiles: Tile[];

    constructor( columns: number, rows: number ) {
        this.columns = columns;
        this.rows = rows;
        this.tiles = [];

        this.initTiles();
    }

    initTiles(): void {
        for ( var row = 1; row <= this.rows; row++ ) {
            for ( var column = 1; column <= this.columns; column++ ) {
                this.tiles.push( new Tile(
                    ( column - 1 ) * TILE_SIZE,
                    ( row - 1 ) * TILE_SIZE,
                    column, row
                ) );
            }
        }
    }

    setTileModelsToTiles( tileModelList: TileModel[] ) {
        tileModelList.forEach( ( model, index ) => {
            this.setTileModelToTile( model, index );
        } );
    }

    setTileModelToTile( tileModel: TileModel, index: number ): void {
        const tile = this.tiles[index];
        tile.setModel( tileModel );
    }

    drawTiles( context: CanvasRenderingContext2D, sheet: ImageModel ): void {
        this.tiles.filter( ( tile ) => {
            return tile.tileModel.id !== "E";
        } ).forEach( ( tile ) => {
            this.drawTile( context, sheet, tile );
        } )
    }

    drawTile( context: CanvasRenderingContext2D, sheet: ImageModel, tile: Tile ): void {
        const sheetXy = SHEET_XY_VALUES[tile.tileModel.id];
        context.drawImage(
            sheet.image,
            sheetXy.x, sheetXy.y,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            tile.x, tile.y,
            TILE_SIZE, TILE_SIZE
        )
    }

    drawTileBorders( context: CanvasRenderingContext2D ): void  {
        this.tiles.forEach( ( e ) => {
            context.beginPath();
            context.lineWidth = .5
            context.strokeStyle = 'black'
            context.moveTo( e.x, e.y );
            context.lineTo( e.x + TILE_SIZE, e.y );
            context.moveTo( e.x + TILE_SIZE, e.y );
            context.lineTo( e.x + TILE_SIZE, e.y + TILE_SIZE );
            context.moveTo( e.x + TILE_SIZE, e.y + TILE_SIZE );
            context.lineTo( e.x, e.y + TILE_SIZE );
            context.moveTo( e.x, e.y + TILE_SIZE );
            context.lineTo( e.x, e.y );
            context.stroke();
        } )
    }
}