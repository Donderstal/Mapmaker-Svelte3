import type { MapModel } from "../models/MapModel";

export class GridWrapper {
    horizontalSlots: string[];
    verticalSlots: string[];
    mapDictionary: { [name: string]: MapModel }

    slotsInOrder: MapModel[];
    slotCells: {column: number, row: number}[]

    constructor( horizontalSlots: string[], verticalSlots: string[], mapDictionary: { [name: string]: MapModel } ) {
        this.horizontalSlots = horizontalSlots;
        this.verticalSlots = verticalSlots;
        this.mapDictionary = mapDictionary;

        this.slotsInOrder = [];
        this.slotCells = [];
        this.initMaps();
        console.log( this.slotsInOrder );
    }

    initMaps(): void {
        for ( var j = 0; j < this.verticalSlots.length; j++ ) {
            let vertChar = this.verticalSlots[j];
            for ( var i = 0; i < this.horizontalSlots.length; i++ ) {
                let horiChar = this.horizontalSlots[i]
                let slotKey = horiChar + vertChar;
                if ( this.mapDictionary.hasOwnProperty( slotKey ) ) {
                    this.slotsInOrder.push( this.mapDictionary[slotKey] )
                }
                else {
                    this.slotsInOrder.push( null );
                }
                this.slotCells.push( { column: i + 1, row: j + 1 } );
            }
        }
    }
}