import type { TileModel } from "../models/TileModel";

export class Tile {
    index: number;
    x: number;
    y: number;
    row: number;
    column: number;
    tileModel?: TileModel;
    context: CanvasRenderingContext2D;

    constructor( index, x, y, column, row ) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.column = column;
        this.row = row;
        this.tileModel = {
            id: "E",
            angle: 0,
            mirrored: false
        } 
    }

    setModel( model: TileModel ): void {
        this.tileModel = model;
    }
}