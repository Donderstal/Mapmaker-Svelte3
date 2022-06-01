import type { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum"
import type { DirectionEnum } from "../enumerables/DirectionEnum";

export type CharacterModel = {
    animation_type: AnimationTypeEnum;
    row: number;
    column: number;
    sprite: string;
    direction: DirectionEnum;
}