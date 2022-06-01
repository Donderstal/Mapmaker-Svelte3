﻿import type { CharacterModel } from "./CharacterModel";
import type { MapObjectModel } from "./MapObjectModel";
import type { RoadModel } from "./RoadModel";
import type { SpawnPointModel } from "./SpawnPointModel";
import type { TileModel } from "./TileModel";

export type MapModel = {
    name: string;
    columns: number;
    rows: number;
    tileSet: string;

    outdoors: boolean;
    music?: string;

    grid: TileModel[];
    frontGrid: TileModel[];

    characters: CharacterModel[];
    mapObjects: MapObjectModel[];

    spawnPoints: SpawnPointModel[];
    roads: RoadModel[];
}