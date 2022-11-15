import type { CanvasObjectModel } from "../models/CanvasObjectModel";


export const orderCanvasObjectsByCellLocation = ( canvasObjects: CanvasObjectModel[] ): CanvasObjectModel[] => {
    let backSprites: CanvasObjectModel[] = [];
    let standardSprites: CanvasObjectModel[] = [];
    let frontSprites: CanvasObjectModel[] = [];

    canvasObjects.forEach( ( e: CanvasObjectModel ): void => {
        if ( e.spriteDataModel.onBackground ) {
            backSprites.push( e );
        }
        else if ( e.spriteDataModel.notGrounded ) {
            frontSprites.push( e )
        }
        else {
            standardSprites.push( e )
        }
    } )

    return [
        ...sortCanvasObjectArray( backSprites ),
        ...sortCanvasObjectArray( standardSprites ),
        ...sortCanvasObjectArray( frontSprites )
    ];
}

export const sortCanvasObjectArray = ( canvasObjects: CanvasObjectModel[] ): CanvasObjectModel[] => {
    return canvasObjects.sort( ( a, b ) => {
        if ( a.row > b.row || a.row === b.row ) {
            return 1
        }
        else if ( b.row > a.row || b.row === a.row ) {
            return -1
        }
        else {
            return 0
        }
    } )
}