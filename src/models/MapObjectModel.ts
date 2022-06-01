import type { DirectionEnum } from "../enumerables/DirectionEnum";

export type MapObjectModel = {
    type: string;
    row: number;
    column: number;
    direction?: DirectionEnum;
}