import type { MapModel } from '../models/MapModel';
import { initTileModel } from './setUserData';

export const getMapModelForNewMap = ( menuData: object ) => {
    let mapModel: MapModel = {
        name: menuData["name"],
        columns: parseInt( menuData["columns"] ),
        rows: parseInt( menuData["rows"] ),
        tileSet: menuData["tilesheet"],
        outdoors: menuData["columns"] == 24 && menuData["rows"] == 16,

        grid: getEmptyGrid( menuData["columns"], menuData["rows"] ),
        frontGrid: getEmptyGrid( menuData["columns"], menuData["rows"] ),
        spawnPoints: [],
        characters: [],
        mapObjects: [],
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