import type { MapObjectSpriteModel } from "../models/MapObjectSpriteModel";
import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import type { MapObjectModel } from "../models/MapObjectModel";

import { mapObjectSpriteModels } from "../resources/mapObjectResources";

export const orderCanvasObjectsByCellLocation = ( canvasObjects: CanvasObjectModel[] ): CanvasObjectModel[] => {
    let backSprites: CanvasObjectModel[] = [];
    let standardSprites: CanvasObjectModel[] = [];
    let frontSprites: CanvasObjectModel[] = [];

    canvasObjects.forEach( ( e: CanvasObjectModel ): void => {
        if ( ( e as MapObjectModel ).type ) {
            const spriteData = getAssociatedMapObjectSpriteModel( ( e as MapObjectModel ) );
            if ( spriteData.onBackground ) {
                backSprites.push( e );
            }
            else if ( spriteData.notGrounded ) {
                frontSprites.push( e )
            }
            else {
                standardSprites.push(e)
            }
        }
        else {
            standardSprites.push( e );
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

export const getAssociatedMapObjectSpriteModel = ( mapObject: MapObjectModel ): MapObjectSpriteModel => {
    return mapObjectSpriteModels.filter( ( e: MapObjectSpriteModel ) => { return mapObject.type == e.key } )[0];
}