import type { CanvasObjectModel } from "./CanvasObjectModel";
import type { DoorModel } from "./DoorModel";
import type { RoadModel } from "./RoadModel";
import type { SpawnPointModel } from "./SpawnPointModel";
import type { TileModel } from "./TileModel";

export type MapModel = {
    key: string;
    columns: number;
    rows: number;
    tileSet: string;

    outdoors: boolean;
    music?: string;
    location?: string;

    grid: TileModel[];
    frontGrid: TileModel[];

    sprites: CanvasObjectModel[];
    frontSprites: CanvasObjectModel[];

    spawnPoints: SpawnPointModel[];
    roads: RoadModel[];
    doors: DoorModel[];
}