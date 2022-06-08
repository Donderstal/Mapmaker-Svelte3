import type { MapModel } from "./MapModel"
import type { NeighbourhoodModel } from "./NeighbourhoodModel"

export type UserModel = {
    name: string,

    characterPngs: string[],
    assetPngs: string[],
    tilesets: object,

    maps: MapModel[],
    neighbourhoods: NeighbourhoodModel[],

    activeMap?: MapModel
}