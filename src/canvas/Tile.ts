import type { TileModel } from "../models/TileModel";

export class Tile {
    x: number;
    y: number;
    row: number;
    column: number;
    tileModel?: TileModel;
    context: CanvasRenderingContext2D;

    constructor( x, y, column, row ) {
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