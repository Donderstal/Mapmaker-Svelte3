import type { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum";
import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { DoorModel } from "./DoorModel";
import type { SpriteDataModel } from "./SpriteDataModel";

export type CanvasObjectModel = {
    type: string;
    row: number;
    column: number;
    spriteDataModel: SpriteDataModel;

    name?: string
    sfx?: string;
    animationType?: AnimationTypeEnum;
    animationName?: string;
    direction?: DirectionEnum;

    hasDoor: boolean;
    door?: DoorModel;
}