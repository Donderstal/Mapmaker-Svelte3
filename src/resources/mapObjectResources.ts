import { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } from "./constants";
import { COLLECTABLE_COIN, COLLECTABLE_JUICE_CAN } from "./interactionGlobals";
import type { MapObjectSpriteModel } from "../models/MapObjectSpriteModel";
import { SpriteSheetAlignmentEnum } from "../enumerables/SpriteSheetAlignmentEnum";

const ONE_BLOCK_SPRITE = {
    "dimensional_alignment": "STANDARD",
    "height_blocks": 1, "width_blocks": 1
}

const TWO_WIDE_SPRITE = { 
    "dimensional_alignment": "STANDARD",
    "height_blocks": 1, "width_blocks": 2
}

const getTwoHighSprite = ( isGrounded ) => {
    return {
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": isGrounded,
        "height_blocks": 2,
        "width_blocks": 1
    }
}

const getGroundedAtBottom = ( width, height ) => {
    return {
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "height_blocks": height,
        "width_blocks": width
    }
}

const THREE_HIGH_SPRITE = {
    "dimensional_alignment": "STANDARD",
    "height_blocks": 3, "width_blocks": 1
}

const POSTER_SPRITE = {
    "dimensional_alignment": "STANDARD", "not_grounded": true,
    "height_blocks": 1.75, "width_blocks": 1.75,
}

const STANDARD_CAR = {
    "dimensional_alignment": "HORI_VERT", "isCar" : true,
    "hori_height_blocks": 3, "hori_width_blocks": 4,
    "vert_height_blocks": 3, "vert_width_blocks": 2,
    "movement_frames" : { 
        [FACING_LEFT] : [
            { "x": 0, "y": 384 },
            { "x": 0, "y": 576 }
        ],
        [FACING_UP] : [
            { "x": 0, "y": 960 },
            { "x": 128, "y": 960 }
        ],
        [FACING_RIGHT] : [
            { "x": 0, "y": 0 },
            { "x": 0, "y": 192 }
        ],
        [FACING_DOWN] : [
            { "x": 0, "y": 768 },
            { "x": 128, "y": 768 }
        ]
    }
}

const BUS = {
    "dimensional_alignment": "HORI_VERT", "isCar" : true,
    "hori_height_blocks": 3, "hori_width_blocks": 4,
    "vert_height_blocks": 4, "vert_width_blocks": 2,
    "movement_frames" : {
        [FACING_LEFT] : [
            { "x": 0, "y": 384 },
            { "x": 0, "y": 576 }
        ],
        [FACING_UP] : [
            { "x": 0, "y": 1024 },
            { "x": 128, "y": 1024 }
        ],
        [FACING_RIGHT] : [
            { "x": 0, "y": 0 },
            { "x": 0, "y": 192 }
        ],
        [FACING_DOWN] : [
            { "x": 0, "y": 768 },
            { "x": 128, "y": 768 }
        ]
    }
}

const STANDARD_SHELVE = {
    "dimensional_alignment": "STANDARD",
    "width_blocks": 2,
    "height_blocks": 2,
    "grounded_at_bottom": true
}

const getBackgroundItem = ( width, height ) => {
    return {
        "dimensional_alignment": "STANDARD",
        "on_background": true,
        "height_blocks": height,
        "width_blocks": width
    }
}

const getDoorOrWindow = ( width, height ) => { 
    return { 
        ...getBackgroundItem( width, height ),
        "door_or_window": true
    }
}


const getSignData = ( widthInBlocks, heightInBlocks ) => {
    return {
        "dimensional_alignment": "STANDARD",
        "width_blocks": widthInBlocks,
        "height_blocks": heightInBlocks,
        "not_grounded": true,
        "idle_animation": true
    }
}

const getCollectible = ( widthInBlocks, heightInBlocks, frames, collectable_type ) => {
    return {
        "dimensional_alignment": "STANDARD",
        "height_blocks": heightInBlocks,
        "width_blocks": widthInBlocks,
        "collectable_type": collectable_type,
        "idle_animation": true,
        "idle_animation_frames": frames
    }
}

const getStandardDoorEast = ( src ) => {
    return {
        "src": src,
        "tile_alignment": "E",
        ...getDoorOrWindow( 0.34375, 2.0625 )
    }
}

const getStandardDoorNorth = ( src ) => {
    return {
        "src": src,
        "tile_alignment": "N",
        ...getDoorOrWindow( 1, .25 )
    }
}

const getStandardDoorWest = ( src ) => {
    return {
        "src": src,
        "tile_alignment": "W",
        ...getDoorOrWindow( 0.34375, 2.0625 )
    }
}

const getStandardDoorSouth = ( src ) => {
    return {
        "src": src,
        "tile_alignment": "S",
        ...getDoorOrWindow( 1, 1.53125 )
    }
}

export const spriteData = {
    "banana" : {
        "src": "Banana.png",
        ...getBackgroundItem( .5, .40625 )
    },
    "bar": {
        "src": "bar.png",
        ...getGroundedAtBottom( 9, 9 )
    },
    "bar_versionB": {
        "src": "bar_versionB.png",
        ...getGroundedAtBottom( 9, 4 )
    },
    "bar_lights": {
        "src": "bar_lights.png",
        ...getSignData( 4, 1 )
    },
    "bar_sign": {
        "src": "bar_sign.png",
        ...getSignData( 3, 2 )
    },
    "bar_sign_old": {
        "dimensional_alignment": "STANDARD",
        "src": "bar_sign_old.png",
        "height_blocks": 1,
        "width_blocks": 1.8125,
        "not_grounded": true,
        "idle_animation": true
    },
    "bench_a" :{
        "src": "bench_a.png",
        ...TWO_WIDE_SPRITE
    },
    "Bench_Green" :{
        "src": "bench_green.png",
        ...TWO_WIDE_SPRITE
    },
    "big_coffee_cup_left": {
        "src": "big_coffee_cup_left.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 2,
        "width_blocks": 2,
        "not_grounded": true
    },
    "big_coffee_cup_right": {
        "src": "big_coffee_cup_right.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 2,
        "width_blocks": 2,
        "not_grounded": true
    },
    "bin_a" :{
        "src": "bin_a.png",
        ...ONE_BLOCK_SPRITE
    },
    "bin_hop" :{
        "src": "bin_hop.png",
        ...ONE_BLOCK_SPRITE
    },
    "bin_x" :{
        "src": "bin_x.png",
        ...ONE_BLOCK_SPRITE
    },
    "block" : {
        "src": "Block.png",
        ...getBackgroundItem( 0.4375, 0.46875 )
    },
    "blue_couch_right" : {
        "src": "blue_couch_right.png",
        ...THREE_HIGH_SPRITE
    },
    "blue_couch_north" : {
        "src": "blue_couch_north.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 1.3125, "width_blocks": 2.53125
    },
    "blue_couch_south" : {
        "src": "blue_couch_south.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 1.65625, "width_blocks": 2.53125
    },
    "blue_double_bed" : {
        "src": "blue_double_bed.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 2, "width_blocks": 2
    },
    "blue_lamp_left" : {
        "src": "blue_lamp_left.png",
        ...getTwoHighSprite( true )
    },
    "blue_lamp_right" : {
        "src": "blue_lamp_right.png",
        ...getTwoHighSprite( true )
    },
    "blue_single_bed" : {
        "src": "blue_single_bed.png",
        ...getTwoHighSprite( false )
    },
    "boarded_window": {
        "src": "Boarded_Window.png",
        ...getBackgroundItem( 1.15625, 1.34375 )
    },
    "bolard_x" :{
        "src": "bolard_x.png",
        ...ONE_BLOCK_SPRITE
    },
    "Bollard" :{
        "src": "bollard.png",
        ...ONE_BLOCK_SPRITE
    },
    "boxes": {
        "src": "boxes.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 2.09375,
        "height_blocks": 1.46875,
        "grounded_at_bottom": true
    },
    "brown_chair" :{
        "src": "brown_chair.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "brown_chair_east" :{
        "src": "brown_chair_east.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "brown_chair_south" :{
        "src": "brown_chair_south.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "brown_chair_west" :{
        "src": "brown_chair_west.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "Bus_Stop" : {
        "src": "Bus_Stop.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "height_blocks": 4,
        "width_blocks": 1,
    },   
    "cafe": {
        "src": "cafe.png",
        ...getGroundedAtBottom( 8, 8 )
    },
    "can_red_1" : {
        "src": "Can_Z1.png",
        ...getBackgroundItem( 0.28125, 0.3125 )
    },
    "can_orange_1" : {
        "src": "Can_Z2.png",
        ...getBackgroundItem( 0.28125, 0.3125 )
    },
    "cashier_desk_a": {
        "src": "cashier_desk_a.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 1,
        "height_blocks": 2.5625,
    },
    "cashier_desk_b": {
        "src": "cashier_desk_b.png",
        ...getGroundedAtBottom( 3, 1.75 ),
    },
    "cashier_desk_c": {
        "src": "cashier_desk_c.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 1,
        "height_blocks": 2.5625,
    },
    "chair_red_cushion" :{
        "src": "chair_red_cushion.png",
        ...ONE_BLOCK_SPRITE
    },
    "computer_table" : {
        "src": "computer_table.png",
        ...getTwoHighSprite( true )
    },
    "computer_table_with_chair": {
        "src": "computer_table_with_chair.png",
        ...getGroundedAtBottom(1, 3)
    },
    "Couch_Blue" : {
        "src": "couch.png",
        ...THREE_HIGH_SPRITE
    },
    "couch_nice_left" : {
        "src": "couch_nice_left.png",
        ...THREE_HIGH_SPRITE
    },
    "couch_nice_north" : {
        "src": "couch_nice_north.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "width_blocks": 2.28125,
        "height_blocks": 1.34375
    },
    "couch_nice_right" : {
        "src": "couch_nice_right.png",
        ...THREE_HIGH_SPRITE
    },
    "couch_nice_south" : {
        "src": "couch_nice_south.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "width_blocks": 2.28125,
        "height_blocks": 1.59375
    },
    "couch_yello" : {
        "src": "couch_yello.png",
        ...THREE_HIGH_SPRITE
    },
    "cover" : {
        "src": "cover.png",
        ...getBackgroundItem( 0.8125, 0.78125 )
    },
    "crisps": { 
        "src": "crisps.png",
        ...getBackgroundItem( 0.5, 0.46875 )
    },
    "detail": { 
        "src": "detail.png",
        ...getBackgroundItem( 3.71875, 0.28125 )
    },
    "detail_door_top_left": { 
        "src": "detail_Z2.png",
        ...getBackgroundItem( 0.3125, 0.78125 )
    },
    "detail_door_top_right": { 
        "src": "detail_Z3.png",
        ...getBackgroundItem( 0.3125, 0.78125 )
    },
    "door_1": {
        "src": "Door_Z1.png",
        ...getDoorOrWindow( 1, 1.625 )
    },
    "door_2": {
        "src": "Door_Z2.png",
        ...getDoorOrWindow( 1, 1.8125 )
    },
    "door_3": {
        "src": "Door_Z3.png",
        ...getDoorOrWindow( 1, 1.75 )
    },
    "door_4": {
        "src": "Door_Z4.png",
        ...getDoorOrWindow( 1, 1.625 )
    },
    "door_5": {
        "src": "Door_Z5.png",
        ...getDoorOrWindow( 1.96875, 2.84375 )
    },
    "door_6": {
        "src": "Door_Z6.png",
        ...getDoorOrWindow( 1.96875, 2.4375 )
    },
    "door_7": {
        "src": "Door_Z7.png",
        ...getDoorOrWindow( 1.875, 2.09375 )
    },
    "flowers_a": {
        "src": "flowers_a.png",
        ...getGroundedAtBottom( 1.9375, 1.96875 ),
    },
    "Fire_Hydrant" :{
        "src": "fire_hydrant.png",
        ...ONE_BLOCK_SPRITE
    },
    "Fridge" : {
        "src": "Fridge.png",
        ...getTwoHighSprite( true )
    },
    "funz": { 
        "src": "funz.png",
        ...getBackgroundItem( 2.375, 1.46875 )
    },
    "gang_z": { 
        "src": "gang_z.png",
        ...getBackgroundItem( 3.46875, 1.6875 )
    },
    "gate_left" : {
        "src": "gate_left.png",
        ...ONE_BLOCK_SPRITE
    },
    "gate_right" : {
        "src": "gate_right.png",
        ...ONE_BLOCK_SPRITE
    },
    "gate_stuk1" : { 
        "src": "gate_stuk1.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.6875,
            "right": 1,
            "bottom": 1
        }
        // border - bottom = h20px w100%
    },
    "gate_stuk2" : { 
        "src": "gate_stuk2.png",
        ...TWO_WIDE_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.6875,
            "right": 2,
            "bottom": 1
        }
        // border - bottom = h20px w100%
    },
    "gate_stuk3" : { 
        "src": "gate_stuk3.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0,
            "right": 1,
            "bottom": 1
        }
        // border - bottom/right = h100% w20px
    },
    "gate_stuk4" : { 
        "src": "gate_stuk4.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0,
            "right": 1,
            "bottom": 1
        }
        // border - right = h100% w20px
    },
    "gate_stuk5" : {
        "src": "gate_stuk5.png",
        ...getTwoHighSprite( false ),
        "blockedArea": {
            "left": 0.6875,
            "top": 0,
            "right": 1,
            "bottom": 2
        }
        // border - right = h100% w20px
    },
    "gate_stuk6" : { 
        "src": "gate_stuk6.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0.875,
            "right": 1,
            "bottom": 1
        }
        // border - right/bottom = h8px w20px
    },
    "gate_stuk7" : { 
        "src": "gate_stuk7.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0.375,
            "right": 1,
            "bottom": 1
        }
        // border - right/bottom = h40px w20px
    },
    "gate_stuk8" : { 
        "src": "gate_stuk8.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0.6875,
            "right": 1,
            "bottom": 1
        }
        // border - right/bottom = h20px w20px
    },
    "gate_stuk9" : { 
        "src": "gate_stuk9.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left/bottom = h100% w20px
    },
    "gate_stuk10" : { 
        "src": "gate_stuk10.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left = h100% w20px
    },
    "gate_stuk11" : {
        "src": "gate_stuk11.png",
        ...getTwoHighSprite( false ),
        "blockedArea": {
            "left": 0,
            "top": 0,
            "right": 0.3125,
            "bottom": 2
        }
        // border - left = h100% w20px
    },
    "gate_stuk12" : { 
        "src": "gate_stuk12.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.875,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left = h8px w20px
    },
    "gate_stuk13" : { 
        "src": "gate_stuk13.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.375,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left = h40px w20px
    },
    "gate_stuk14" : { 
        "src": "gate_stuk14.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.6875,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left/top = h20px w20px
    },
    "graff_z1": { 
        "src": "graff_z1.png",
        ...getBackgroundItem( 1.3125, 1.125 )
    },
    "hotel_sign" : {
        "src": "hotel_sign.png",
        ...getSignData( 1, 2.21875 )
    },
    "house_plant" : {
        "src": "house_plant.png",
        ...getTwoHighSprite( false )
    },
    "inside_bin" : {
        "src": "inside_bin.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "lamp_red" : {
        "src": "lamp_red.png",
        ...getTwoHighSprite( true )
    },
    "Lamppost_1" : {
        "src": "lamppost.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "height_blocks": 5,
        "width_blocks": 1,
    },
    "magazine_rack_a": {
        "src": "magazine_rack_a.png",
        ...getGroundedAtBottom( 2, 1.75 ),
    },
    "magazine_rack_b": {
        "src": "magazine_rack_b.png",
        ...getGroundedAtBottom( 1.78125, 1.15625 ),
    },
    "newspaper_trash": { 
        "src": "newspaper.png",
        ...getBackgroundItem( 0.625, 0.4375 )
    },
    "no_entry_sign": { 
        "src": "no_entry.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "height_blocks": 1.375,
        "width_blocks": 2,
    },
    "office_chair" : {
        "src": "office_chair.png",
        ...getTwoHighSprite( true )
    },
    "office_chair_south" : {
        "src": "office_chair_south.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "height_blocks": 1.21875,
        "width_blocks": 0.96875
    },
    "phone_table" : {
        "src": "phone_table.png",
        ...ONE_BLOCK_SPRITE
    },
    "pillar_round_bottom_shaft": { 
        "src": "pillar_z1.png",
        ...getGroundedAtBottom( 0.59375, 2.59375 )
    },
    "pillar_round_whole" : {
        "src": "pillar_z2.png",
        ...getGroundedAtBottom( 0.59375, 3.03125 )
     },
    "pillar_round_top_shaft": {
        "src": "pillar_z3.png",
        ...getGroundedAtBottom( 0.59375, 1.4375 )
     },
    "pillar_round_top_peak": {
        "src": "pillar_z4.png",
        ...getGroundedAtBottom( 0.59375, 0.4375 )
     },
    "pillar_square_bottom_shaft": {
        "src": "pillar_z6.png",
        ...getGroundedAtBottom( 0.59375, 1.5 )
     },
    "pillar_square_whole" : { 
        "src": "pillar_z5.png",
        ...getGroundedAtBottom( 0.59375, 2.875 )
    },
    "pillar_square_top_shaft": { 
        "src": "pillar_z7.png",
        ...getGroundedAtBottom( 0.59375, 1.4375 )
    },
    "pillar_square_middle_shaft": { 
        "src": "pillar_z8.png",
        ...getGroundedAtBottom( 0.59375, 1.46875 )
    },
    "plant_yo" : {
        "src": "plant_yo.png",
        ...getTwoHighSprite( true )
    },
    "plants" : {
        "src": "plants.png",
        ...getTwoHighSprite( false )
    },
    "pot_plant_a" : {
        "src": "pot_plant_a.png",
        ...ONE_BLOCK_SPRITE
    },
    "Poster_Cruise" : {
        "src": "poster1.png",
        ...POSTER_SPRITE
    },
    "Poster_Cola" : {
        "src": "poster2.png",
        ...POSTER_SPRITE
    },
    "Poster_Gronk" : {
        "src": "poster3.png",
        ...POSTER_SPRITE
    },
    "Rug_01" : { 
        "src": "rug01.png",
        "dimensional_alignment": "STANDARD",
        "on_background": true,
        ...getBackgroundItem( 3, 4 )
    },
    "rug_boo" : { 
        "src": "rug_boo.png",
        ...getBackgroundItem( 3, 2 )
    },
    "rug_g1" : { 
        "src": "rug_g1.png",
        ...getBackgroundItem( 2, 2 )
    },
    "rug_g2" : { 
        "src": "rug_g2.png",
        ...getBackgroundItem( 2, 2 )
    },
    "shelves_a": {
        "src": "shelves_a.png",
        ...STANDARD_SHELVE,
    },
    "shelves_b": {
        "src": "shelves_b.png",
        ...STANDARD_SHELVE,
    },
    "shelves_c": {
        "src": "shelves_c.png",
        ...STANDARD_SHELVE,
    },
    "shelves_d": {
        "src": "shelves_d.png",
        ...STANDARD_SHELVE,
    },
    "shelves_e": {
        "src": "shelves_e.png",
        ...STANDARD_SHELVE,
    },
    "shelves_f": {
        "src": "shelves_f.png",
        ...getGroundedAtBottom( 2, 2.40625 ),
    },
    "shelves_side_a": {
        "src": "shelves_side_a.png",
        ...getGroundedAtBottom( 0.84375, 3 ),
    },
    "shelves_side_b": {
        "src": "shelves_side_b.png",
        ...getGroundedAtBottom( 0.5, 3 ),
    },
    "shelves_side_c": {
        "src": "shelves_side_c.png",
        ...getGroundedAtBottom( 0.5, 5 ),
    },
    "shelves_side_d": {
        "src": "shelves_side_d.png",
        ...getGroundedAtBottom( 0.84375, 3 ),
    },
    "shop_cupboard_a" : {
        "src": "shop_cupboard_a.png",
        ...STANDARD_SHELVE
    },
    "shop_front": { 
        "src": "Shop_front_Z1.png",
        ...getBackgroundItem( 2.53125, 2.375 )
    },
    "shop_shelves_a" : {
        "src": "shop_shelves_a.png",
        ...STANDARD_SHELVE,
    },
    "shop_shelves_b" : {
        "src": "shop_shelves_b.png",
        ...STANDARD_SHELVE,
    },
    "shop_window": { 
        "src": "shop_window.png",
        ...getBackgroundItem( 3.53125, 1.96875 )
    },
    "Sign_01" : {
        "src": "sign1.png",
        ...getSignData( 1, 1.75 )
    },
    "Sign_02" : {
        "src": "sign2.png",
        "dimensional_alignment": "STANDARD",
        ...getSignData( 1, 1.75 )
    },
    "Sign_03" : {
        "src": "sign3.png",
        "dimensional_alignment": "STANDARD",
        ...getSignData( 1, 1 )
    },
    "Sign_04" : {
        "src": "sign4.png",
        "dimensional_alignment": "STANDARD",
        ...getSignData( 1, 1 )
    },
    "Single_Bed" : { 
        "src": "single_bed.png",
        ...getTwoHighSprite( false )
    },
    "single_bed_north" : { 
        "src": "single_bed_north.png",
        ...getTwoHighSprite( false )
    },
    "single_bed_side" : { 
        "src": "single_bed_side.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 1.5, 
        "height_blocks": 1.3125 
    },
    "Sink" : { 
        "src": "sink.png",
        ...THREE_HIGH_SPRITE
    },
    "Small_Table" : {
        "src": "small_table.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "tires_1" : {
        "src": "Tires_Z1.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 0.84375, 
        "height_blocks": 0.90625 
    },
    "tires_2" : {
        "src": "Tires_Z2.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 0.78125, 
        "height_blocks": 0.6875
    },
    "thing_a": {
        "src": "thing_a.png",
        ...getGroundedAtBottom( 1, 3 ),
    },
    "thing_b": {
        "src": "thing_b.png",
        ...getGroundedAtBottom( 1, 2.015625 ),
    },
    "trash_1" : {
        "src": "Trash_Z1.png",
        ...getBackgroundItem( 0.375, 0.28125 )
    },    
    "trash_2" : {
        "src": "Trash_Z2.png",
        ...getBackgroundItem( 0.40625, 0.21875 )
    },    
    "trash_3" : {
        "src": "Trash_Z3.png",
        ...getBackgroundItem( 0.46875, 0.3125 )
    },    
    "trash_4" : {
        "src": "Trash_Z4.png",
        ...getBackgroundItem( 0.5625, 0.53125 )
    },
    "tree" : {
        "src": "tree.png",
        ...getGroundedAtBottom( 2, 3 )
    },    
    "tree_plus_base" : {
        "src": "tree_plus_base.png",
        ...getGroundedAtBottom( 2, 3 )
    },  
    "tv" : {
        "src": "tv.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 1.34375, 
        "height_blocks": 1.5625
    }, 
    "tv_side" : {
        "src": "tv_side.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 0.625, 
        "height_blocks": 1.84375
    },
    "vegetables_a": {
        "src": "vegetables_a.png",
        ...getGroundedAtBottom( 1, 3 ),
    },
    "vegetables_b": {
        "src": "vegetables_b.png",
        ...getGroundedAtBottom( 1, 3 ),
    },
    "vegetables_c": {
        "src": "vegetables_c.png",
        ...getGroundedAtBottom( 1, 1.125 ),
    },
    "vegetables_d": {
        "src": "vegetables_d.png",
        ...getGroundedAtBottom( 1, 1.125 ),
    },
    "vent_1" : {
        "src": "Vent_Z1.png",
        ...getBackgroundItem( 0.65625, 0.40625 )
    },  
    "vent_2" : {
        "src": "Vent_Z2.png",
        ...getBackgroundItem( 0.46875, 0.375 )
    },   
    "vent_3" : {
        "src": "Vent_Z3.png",
        ...getBackgroundItem( 0.84375, 0.8125 )
    },
    "vent_4" : {
        "src": "Vent_Z4.png",
        ...getBackgroundItem( 0.84375, 0.8125 )
    },    
    "vent_5" : {
        "src": "Vent_Z5.png",
        ...getBackgroundItem( 0.65625, 0.5625 )
    },
    "wall_thing": {
        "src": "wall_thing.png",
        ...getGroundedAtBottom( 2, 1.625 ),
    },
    "wall_thing_b": {
        "src": "wall_thing_b.png",
        ...getGroundedAtBottom( 1, 1.625 ),
    },
    "wall_thing_c": {
        "src": "wall_thing_c.png",
        ...getGroundedAtBottom( 0.5, 1.625 ),
    },
    "water_puddle": {
        "src": "water_puddle.png",
        ...getBackgroundItem( 1, 1 )
    },
    "wheelie_bin_left": {
        "src": "wheelie_bin_Z1.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 1.25, 
        "height_blocks": 1.9375
    },
    "wheelie_bin_right": {
        "src": "wheelie_bin_Z2.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 1.25, 
        "height_blocks": 1.9375
    },
    "window_1": {
        "src": "Window_Z1.png",
        ...getDoorOrWindow( 1, 1.0625 )
    },
    "window_2": {
        "src": "Window_Z2.png",
        ...getDoorOrWindow( 1, 1.15625 )
    },
    "window_3": {
        "src": "Window_Z3.png",
        ...getDoorOrWindow( 1, 1.15625 )
    },
    "window_4": {
        "src": "Window_Z4.png",
        ...getDoorOrWindow( 1.59375, 1.15625 )
    },
    "window_5": {
        "src": "Window_Z5.png",
        ...getDoorOrWindow( 1, 1.15625 )
    },
    "window_6": {
        "src": "Window_Z6.png",
        ...getDoorOrWindow( 1, 1.15625 )
    },
    "window_7": {
        "src": "Window_Z7.png",
        ...getDoorOrWindow( 1.15625, 1 )
    },
    "window_8": {
        "src": "Window_Z8.png",
        ...getDoorOrWindow( 2.3125, 1.78125 )
    },
    "window_9": {
        "src": "Window_Z9.png",
        ...getDoorOrWindow( 1.15625, 1.3125 )
    },
    "window_10": {
        "src": "Window_Z10.png",
        ...getDoorOrWindow( 1, 1.3125 )
    },
    "yellow_chair" : {
        "src": "yellow_chair.png",
        ...STANDARD_SHELVE
    },
    "yellow_lamp" : {
        "src": "yellow_lamp.png",
        ...getTwoHighSprite( true )
    },
    "yellow_rug_a" : { 
        "src": "yellow_rug_a.png",
        ...getBackgroundItem( 4, 3 )
    },
    "yellow_rug_b" : { 
        "src": "yellow_rug_b.png",
        ...getBackgroundItem( 3, 2 )
    },
    "yellow_stand" : { 
        "src": "yellow_stand.png",
        ...ONE_BLOCK_SPRITE
    },
    "yum_mart_sign": {
        "src": "yum_mart.png",
        ...getBackgroundItem( 3.46875, 0.65625 )
    },

    // cars
    "car_a" : {
        "src": "car_a.png",
        ...STANDARD_CAR
    },
    "car_a_colour_b": {
        "src": "car_a_colour_b.png",
        ...STANDARD_CAR
    },
    "car_b": {
        "src": "car_b.png",
        ...STANDARD_CAR
    },
    "car_b_colour_b" : {
        "src": "car_b_colour_b.png",
        ...STANDARD_CAR
    },

    "car_c" : {
        "src": "car_c.png",
        ...STANDARD_CAR
    },
    "car_d" : {
        "src": "car_d.png",
        ...STANDARD_CAR
    },
    "bus" : {
        "src": "bus.png",
        ...BUS
    },

    // collectible
    "collectable_coin" : {
        "src": "coin.png",
        ...getCollectible( 0.75, 0.75, 4, COLLECTABLE_COIN )
    },
    "collectable_juice_can" : {
        "src": "juice_can.png",
        ...getCollectible( 0.5625, 0.78125, 4, COLLECTABLE_JUICE_CAN )
    },

    // doors new
    // West
    "door_interior_west_blue" : {
        ...getStandardDoorWest("Door_interior_west_blue.png")
    },
    "door_interior_west_green" : {
        ...getStandardDoorWest("Door_interior_west_green.png")
    },
    "door_interior_west_light" : {
        ...getStandardDoorWest("Door_interior_west_light.png")
    },

    // North
    "door_interior_north_blue" : {
        ...getStandardDoorNorth("Door_interior_north_blue.png")
    },
    "door_interior_north_green" : {
        ...getStandardDoorNorth("Door_interior_north_green.png")
    },
    "door_interior_north_light" : {
        ...getStandardDoorNorth("Door_interior_north_light.png")
    },

    // East
    "door_interior_east_blue" : {
        ...getStandardDoorEast("Door_interior_east_blue.png")
    },
    "door_interior_east_green" : {
        ...getStandardDoorEast("Door_interior_east_green.png")
    },
    "door_interior_east_light" : {
        ...getStandardDoorEast("Door_interior_east_light.png")
    },

    // South
    "door_interior_south_blue" : {
        ...getStandardDoorSouth("Door_interior_south_blue.png")
    },
    "door_interior_south_green" : {
        ...getStandardDoorSouth("Door_interior_south_green.png")
    },
    "door_interior_south_light" : {
        ...getStandardDoorSouth("Door_interior_south_light.png")
    }
}

export const getMapObjectSpriteModels = (): MapObjectSpriteModel[] => {
    return Object.entries( spriteData ).map( ( e ) => {
        const key = e[0];
        const value = e[1];

        let model: MapObjectSpriteModel = {
            key: key,
            src: value["src"],
            dimensionalAlignment: value["dimensional_alignment"],

            isCar: value["isCar"] !== undefined ? value["isCar"] : false,
            idleAnimation: value["idle_animation"] !== undefined ? value["idle_animation"] : false,
            onBackground: value["on_background"] !== undefined ? value["on_background"] : false,
            notGrounded: value["not_grounded"] !== undefined ? value["not_grounded"] : false,
            groundedAtBottom: value["grounded_at_bottom"] !== undefined ? value["grounded_at_bottom"] : false,
        };

        if ( value["dimensional_alignment"] == SpriteSheetAlignmentEnum.standard ) {
            model.widthBlocks = value["width_blocks"];
            model.heightBlocks = value["height_blocks"];
        }
        else if ( value["dimensional_alignment"] == SpriteSheetAlignmentEnum.horiVert ) {
            model.horiWidthBlocks = value["hori_width_blocks"];
            model.horiHeightBlocks = value["hori_height_blocks"];
            model.vertWidthBlocks = value["vert_width_blocks"];
            model.vertHeightBlocks = value["vert_height_blocks"];
            model.movementFrames = value["movement_frames"];
        }

        if ( value["idle_animation_frames"] !== undefined )
            model.idleAnimationFrames = value["idle_animation_frames"]; 
        if ( value["collectable_type"] !== undefined ) {
            model.collectableType = value["collectable_type"]; 
        }
        if ( value["tile_alignment"] !== undefined )
            model.tileAlignment = value["tile_alignment"];
        if ( value["blocked_area"] !== undefined ) {
            model.blockedArea = value["blocked_area"];
        }
        return model;
    } )
}

export const mapObjectSpriteModels = getMapObjectSpriteModels();