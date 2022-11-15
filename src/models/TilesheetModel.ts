import type { TilesheetTypeEnum } from "../enumerables/TilesheetTypeEnum"

export type TilesheetModel = {
    name: string,
    key: string,
    src: string,
    uniqueTiles: number,
    image: HTMLImageElement;
    category: TilesheetTypeEnum,
    blocked: []
}
