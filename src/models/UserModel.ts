import type { ImageModel } from "./ImageModel"
import type { MapModel } from "./MapModel"
import type { NeighbourhoodModel } from "./NeighbourhoodModel"

export type UserModel = {
    name: string,

    characterPngs: ImageModel[],
    assetPngs: ImageModel[],
    tilesets: ImageModel[],

    maps: MapModel[],
    neighbourhoods: NeighbourhoodModel[],
}