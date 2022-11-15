import type { MapModel } from "./MapModel"
import type { NeighbourhoodModel } from "./NeighbourhoodModel"
import type { SpriteDataModel } from "./SpriteDataModel"
import type { TilesheetModel } from "./TilesheetModel"

export type UserModel = {
    name: string,

    sprites: SpriteDataModel[],
    tilesets: TilesheetModel[],

    maps: MapModel[],
    neighbourhoods: NeighbourhoodModel[],
}