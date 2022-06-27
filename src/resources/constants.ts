export const GRID_BLOCK_IN_SHEET_PX = 64
export const TILE_SIZE = window.innerHeight > 1000 ? 40 : 32;
export const CANVAS_COLUMNS                = 24
export const CANVAS_ROWS = 16
export const SIZE_DIVIDER = GRID_BLOCK_IN_SHEET_PX / TILE_SIZE;

export const getBasePixelBlockSize = ( ) => {
    let blockSize = Math.ceil(
        screen.width / CANVAS_COLUMNS    
    );
    if ( blockSize > GRID_BLOCK_IN_SHEET_PX ) {
        blockSize = GRID_BLOCK_IN_SHEET_PX;
    }
    return blockSize;
}

// for use in movement animation
// first row of a spritesheet will always face down
// second row is always left etc...
export const FACING_DOWN                   = 0
export const FACING_LEFT                   = 1
export const FACING_RIGHT                  = 2
export const FACING_UP                     = 3

export const FACING_DOWN_FLYING            = 7
export const FACING_LEFT_FLYING            = 4
export const FACING_RIGHT_FLYING           = 5
export const FACING_UP_FLYING              = 6

//
export const SHEET_COLUMN_ONE          = 0
export const SHEET_COLUMN_TWO          = 1
export const SHEET_COLUMN_THREE        = 2
export const SHEET_COLUMN_FOUR         = 3

export const SHEET_BATTLE_FACING_LEFT         = 4;
export const SHEET_BATTLE_FACING_RIGHT        = 5;
export const SHEET_BATTLE_PUNCH                    = 6;

// 'enum' values for NPC sprite animation availability
export const NPC_ANIM_TYPE_IDLE            = "IDLE";
export const NPC_ANIM_TYPE_SEMI_IDLE       = "SEMI-IDLE";
export const NPC_ANIM_TYPE_MOVING          = "MOVING";
export const NPC_ANIM_TYPE_MOVING_IN_LOOP  = "MOVING_IN_LOOP";
export const NPC_ANIM_TYPE_ANIMATION_LOOP  = "ANIMATION_LOOP";

// 'enum' to handle different movement anims in Sprite.drawSprite();
export const NPC_MOVE_TYPE_WALKING         = "WALKING";
export const NPC_MOVE_TYPE_FLYING          = "FLYING";

export const STATE_IDLE                    = "IDLE";
export const STATE_WAITING                 = "WAITING";
export const STATE_BLOCKED                 = "BLOCKED";
export const STATE_MOVING                  = "MOVING";
export const STATE_PATHFINDING             = "PATHFINDING"
// animation frame limit
export const FRAME_LIMIT                   = 8
export const FRAMES_PER_SECOND             = 60

// dynamic measurements for canvas
export const GRID_BLOCK_PX                 = getBasePixelBlockSize()
export const MOVEMENT_SPEED                = GRID_BLOCK_PX / ( 60 / 8 )

export const CANVAS_WIDTH                  = GRID_BLOCK_PX * (CANVAS_COLUMNS);
export const CANVAS_HEIGHT                 = GRID_BLOCK_PX * (CANVAS_ROWS);

// sheet dimensions
export const MAP_SPRITE_WIDTH_IN_SHEET     = 64
export const MAP_SPRITE_HEIGHT_IN_SHEET    = 112
// sprite dimensions
export const STRD_SPRITE_WIDTH             = GRID_BLOCK_PX
export const STRD_SPRITE_HEIGHT            = STRD_SPRITE_WIDTH * 1.75

// Item categories
export const ITEM_CATEGORY_WEARABLE = "W";
export const ITEM_CATEGORY_KEY = "K";
export const ITEM_CATEGORY_MISC = "M";

const setSheetXyValues = ( tilesInSheet ) => {
    let tileX = 0; let tileY = 0;
    let tilesheetXyValues = []

    for ( var i = 0; i <= tilesInSheet; i++ ) {
        tilesheetXyValues.push( { 'x': tileX, 'y': tileY } )
        tileX += GRID_BLOCK_IN_SHEET_PX
        if ( i % 4 == 3 ) {
            tileX = 0
            tileY += GRID_BLOCK_IN_SHEET_PX
        }
    }

    return tilesheetXyValues;
}

export const SHEET_XY_VALUES = setSheetXyValues( 10000 );

export const PNG_DICTIONARY = {};
export const AUDIO_DICTIONARY = {};

export const OUT_LEFT = "O-L";
export const OUT_UP   = "O-T";
export const OUT_RIGHT= "O-R";
export const OUT_DOWN = "O-D";