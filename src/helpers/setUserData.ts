import type { UserModel } from "../models/UserModel";
import { getTileSheetModels } from '../resources/tilesheetResources';
import { getSpriteDataModels } from '../resources/spriteDataResources';
import { initMapModel, initNeighbourhoodModel } from './modelFactory';

export const setUserData = ( maps: object[], neighbourhoods: object[] ) => {
    const availableMaps = Object.keys( maps ).map( ( mapKey ) => {
        return initMapModel( maps[mapKey] );
    } )
    const returner: UserModel = {
        name: "test",

        sprites: getSpriteDataModels(),
        tilesets: getTileSheetModels(),

        maps: availableMaps,
        neighbourhoods: Object.keys( neighbourhoods ).map( ( neighbourhoodKey ) => {
            return initNeighbourhoodModel( neighbourhoods[neighbourhoodKey], availableMaps )
        } )
    };
    return returner;
}