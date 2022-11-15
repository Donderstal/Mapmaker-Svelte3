import { Tile } from "./Tile";
import type { TileModel } from "../models/TileModel";
import { GRID_BLOCK_IN_SHEET_PX, SHEET_XY_VALUES, TILE_SIZE } from "../resources/constants";
import { mirrorOrFlipTile } from "../helpers/canvasHelpers";

export class Grid {
    x: number;
    y: number;
    columns: number;
    rows: number;
    tiles: Tile[];
    canvas: HTMLCanvasElement;
    startingIndex?: number;

    constructor( columns: number, rows: number, startingIndex: number = null ) {
        this.startingIndex = startingIndex
        this.columns = columns;
        this.rows = rows;
        this.tiles = [];

        this.initTiles();
        this.canvas = document.createElement("canvas");
        this.canvas.width = GRID_BLOCK_IN_SHEET_PX;
        this.canvas.height = GRID_BLOCK_IN_SHEET_PX;
    }

    initTiles(): void {
        for ( var row = 1; row <= this.rows; row++ ) {
            for ( var column = 1; column <= this.columns; column++ ) {
                this.tiles.push( new Tile(
                    this.getIndexOfTile( column, row ),
                    ( column - 1 ) * TILE_SIZE,
                    ( row - 1 ) * TILE_SIZE,
                    column, row
                ) );
            }
        }
    }

    getIndexOfTile( column, row ) {
        let index = ( ( row * this.columns ) - this.columns ) + ( column - 1 );
        if ( this.startingIndex !== null ) {
            index += this.startingIndex;
        }
        return index
    }

    getTileAtCell( column: number, row: number ): Tile {
        let filteredArray = this.tiles.filter( ( e ) => {
            return e.column === column && e.row === row;
        } );
        return filteredArray[0];
    }

    getTileAtXy( x: number, y: number ): Tile {
        let filteredArray = this.tiles.filter( ( e ) => {
            return x >= e.x && x < ( e.x + TILE_SIZE )
            && y >= e.y && y < ( e.y + TILE_SIZE );
        } );
        return filteredArray[0];
    }

    setTileModelsToTiles( tileModelList: TileModel[] ): void {
        tileModelList.forEach( ( model, index ) => {
            this.setTileModelToTile( model, index );
        } );
    }

    setTileModelToTile( tileModel: TileModel, index: number ): void {
        const tile = this.tiles[index];
        tile.setModel( tileModel );
    }

    drawTiles( context: CanvasRenderingContext2D, sheet: HTMLImageElement ): void {
        this.tiles.filter( ( tile ) => {
            return tile.tileModel.id !== "E";
        } ).forEach( ( tile ) => {
            this.drawTile( context, sheet, tile );
        } )
    }

    drawTile( context: CanvasRenderingContext2D, sheet: HTMLImageElement, tile: Tile ): void {
        let tileModel: TileModel = tile.tileModel;
        const sheetXy = SHEET_XY_VALUES[tile.tileModel.id];
        mirrorOrFlipTile( sheet, tileModel, this.canvas.getContext("2d"), sheetXy );
        context.drawImage(
            this.canvas,
            0, 0,
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