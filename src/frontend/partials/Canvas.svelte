<script lang="ts">
	import { onMount } from "svelte";

	import type { ImageModel } from "../../models/ImageModel";
	import type { MapModel } from "../../models/MapModel";
	import type { MapObjectSpriteModel } from "../../models/MapObjectSpriteModel";
	import type { TileModel } from "../../models/TileModel";

	import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
	import { SpriteSheetAlignmentEnum } from "../../enumerables/SpriteSheetAlignmentEnum";
	import { FACING_DOWN, FACING_UP, GRID_BLOCK_IN_SHEET_PX, MAP_SPRITE_HEIGHT_IN_SHEET, MAP_SPRITE_WIDTH_IN_SHEET, TILE_SIZE } from "../../resources/constants";
	import { Grid } from '../../canvas/Grid'

	export let canvasType : CanvasTypeEnum;
	export let spriteModel : ImageModel = undefined;

	let grid : Grid;
	let canvas : HTMLCanvasElement
	let context : CanvasRenderingContext2D
	let model : MapModel
	let sheet : ImageModel;

	let invisible : boolean = false;

	onMount(() => {
		context = canvas.getContext("2d");
		if ( canvasType == CanvasTypeEnum.spriteCanvas ) {
			if ( spriteModel.dataObject.hasOwnProperty("className") ) {
				setCharacterToCanvas( spriteModel );
			}
			else if ( (spriteModel.dataObject as MapObjectSpriteModel).idleAnimation ) {
				setSpriteFrameToCanvas( spriteModel );
			}
			else if ( (spriteModel.dataObject as MapObjectSpriteModel).dimensionalAlignment === SpriteSheetAlignmentEnum.horiVert ) {
				setAlignedSpriteFrameToCanvas( spriteModel );
			}
			else {
				setImageToCanvas( spriteModel );
			}
		}
	})

	export const initializeGrid = ( columns: number, rows: number ): void => {
		canvas.width = columns * TILE_SIZE;
		canvas.height = rows * TILE_SIZE;
        grid = new Grid( columns, rows );
    }
	
	export const setImageToCanvas = ( image: ImageModel ) : void => {
		canvas.width = image.image.width / 2;
		canvas.height = image.image.height / 2;
		context.drawImage(
			image.image, 
			0, 0,
			image.image.width, image.image.height,
			0, 0,
			canvas.width, canvas.height
		);
	}

	const setCharacterToCanvas = ( image: ImageModel ) : void => {
		canvas.width = MAP_SPRITE_WIDTH_IN_SHEET;
		canvas.height = MAP_SPRITE_HEIGHT_IN_SHEET;
		context.drawImage(
			image.image, 
			0, 0,
			MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET,
			0, 0,
			MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET,
		);
	}

	const setSpriteFrameToCanvas = ( image: ImageModel ) : void => {
		const objectSpriteModel : MapObjectSpriteModel = image.dataObject as MapObjectSpriteModel;
		const widthInSheet = objectSpriteModel.widthBlocks * GRID_BLOCK_IN_SHEET_PX;
		const heightInSheet = objectSpriteModel.heightBlocks * GRID_BLOCK_IN_SHEET_PX;
		canvas.width = widthInSheet / 2;
		canvas.height = heightInSheet / 2;
		context.drawImage(
			image.image, 
			0, 0,
			widthInSheet, heightInSheet,
			0, 0,
			canvas.width, canvas.height
		);
	}

	const setAlignedSpriteFrameToCanvas = ( image: ImageModel, direction: number = FACING_DOWN ) : void => {
		const objectSpriteModel : MapObjectSpriteModel = image.dataObject as MapObjectSpriteModel;
		const widthInSheet = ((direction == FACING_DOWN || direction == FACING_UP) ? objectSpriteModel.vertWidthBlocks : objectSpriteModel.horiWidthBlocks) * GRID_BLOCK_IN_SHEET_PX;
		const heightInSheet = ((direction == FACING_DOWN || direction == FACING_UP) ? objectSpriteModel.vertHeightBlocks : objectSpriteModel.horiHeightBlocks) * GRID_BLOCK_IN_SHEET_PX;
		const frame : {x: number, y: number}[] = objectSpriteModel.movementFrames[direction];
		canvas.width = widthInSheet / 2;
		canvas.height = heightInSheet / 2;
		context.drawImage(
			image.image, 
			frame[0].x, frame[0].y,
			widthInSheet, heightInSheet,
			0, 0,
			canvas.width, canvas.height
		);
	}

	export const setTilesetToCanvas = ( image: ImageModel, index: number, parts: number ) : void => {
		let imageWidth = image.image.width;
		let imageHeight = image.image.height / parts;
		canvas.width = imageWidth / 2;
		canvas.height = imageHeight / 2;
		context.drawImage(
			image.image, 
			0, imageHeight * index,
			imageWidth, imageHeight,
			0, 0,
			canvas.width, canvas.height
		);
	}

	export const setMapModel = ( mapModel: MapModel, tilesheet: ImageModel, isBackground: boolean ): void => {
		model = mapModel;
		sheet = tilesheet;
		initializeGrid( model.columns, model.rows );
		setTileModelsToGridTiles( isBackground ? model.grid : model.frontGrid );
	}

    const setTileModelsToGridTiles = ( tileModelList: TileModel[] ): void => {
        grid.setTileModelsToTiles( tileModelList );
    }

    const setTileModelToGridTile = ( tileModel: TileModel, index: number ): void => {
        grid.setTileModelToTile( tileModel, index );
    }

	export const drawTileBordersToCanvas = ( ): void => {
		grid.drawTileBorders( context );
	}

	export const drawGridToCanvas = ( ): void => {
		grid.drawTiles( context, sheet );
	}

	export const fillRect = ( x:number, y:number, width:number, height:number, color:string ): void => {
		context.fillStyle = color;
		context.fillRect( x, y, width, height );
	}

	const registerClick = (e) => {
		console.log("x: " + e.offsetX);
		console.log("y: " + e.offsetY);
	}

	export const hideCanvas = ( ) =>{
		invisible = true;
	}

	export const showCanvas = ( ) => {
		invisible = false;
	}
</script>

<style>
	.invisible {
		display: none;
		visibility: hidden;
		pointer-events: none;
	}
	.margin { 
		margin: 1vh;
	}
</style>

<canvas 
	bind:this={canvas}
	on:click={registerClick}
	class:invisible={invisible}
	class:margin={canvasType === CanvasTypeEnum.spriteCanvas}
/>