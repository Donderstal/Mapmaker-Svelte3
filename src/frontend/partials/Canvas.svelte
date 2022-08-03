<script lang="ts">
	import { onMount } from "svelte";

	import type { ImageModel } from "../../models/ImageModel";
	import type { MapModel } from "../../models/MapModel";
	import type { MapObjectSpriteModel } from "../../models/MapObjectSpriteModel";
	import type { TileModel } from "../../models/TileModel";

	import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
	import { SpriteSheetAlignmentEnum } from "../../enumerables/SpriteSheetAlignmentEnum";
	import { GRID_BLOCK_IN_SHEET_PX,MAP_SPRITE_HEIGHT_IN_SHEET, MAP_SPRITE_WIDTH_IN_SHEET, TILE_SIZE } from "../../resources/constants";
	import { Grid } from '../../canvas/Grid'
	import { drawSpriteToTileOnCanvas, drawToFittingCanvas, mirrorOrFlipTile } from "../../helpers/canvasHelpers";
	import { getImageModelForCharacter, getImageModelForObject, getSpriteFrame } from "../../helpers/modelConversionHelpers";
	import type { MapObjectModel } from "../../models/MapObjectModel";
	import type { CharacterModel } from "../../models/CharacterModel";
	import type { Tile } from "../../canvas/Tile";
	import type { SpriteFrameModel } from "../../models/SpriteFrameModel";
	import { orderCanvasObjectsByCellLocation } from "../../helpers/sortHelpers";
	import type { CanvasObjectModel } from "../../models/CanvasObjectModel";
	import { DirectionEnum } from "../../enumerables/DirectionEnum";
	import { user } from "../../stores";

	export let canvasType : CanvasTypeEnum;
	export let spriteModel : ImageModel = undefined;
	export let handleCanvasClick = undefined;
	export let registerMouseClickStart = undefined;
	export let registerMouseClickEnd = undefined;
	export let map : MapModel = undefined;
	export let slot : {column: number, row: number} = undefined;

	let grid : Grid;
	let canvas : HTMLCanvasElement;
	let invisibleCanvas : HTMLCanvasElement;
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
		if ( canvasType == CanvasTypeEnum.utility ) {
			invisibleCanvas = document.createElement("canvas");
			invisibleCanvas.width = GRID_BLOCK_IN_SHEET_PX;
			invisibleCanvas.height = GRID_BLOCK_IN_SHEET_PX;
		}
		if ( canvasType === CanvasTypeEnum.overview ) {
			if ( map === null ) {
				initializeGrid( 24, 16 );
				return;
			}
			model = map;
			sheet = Object.values($user.tilesets).filter((e)=>{return e.dataObject.key === model.tileSet})[0];
			setSlot(slot);
			initializeGrid( model.columns, model.rows );
			setTileModelsToGridTiles( model.grid );
			grid.drawTiles(context, sheet);

			drawSpritesToCanvas( [ ...model.characters, ...model.mapObjects ] );

			let frontGrid = new Grid( model.columns, model.rows );
			frontGrid.setTileModelsToTiles( model.frontGrid );
			frontGrid.drawTiles(context, sheet);

			drawSpritesToCanvas( [ ...model.frontCharacters, ...model.frontMapObjects ] );
			drawBorders();
		}
	})

	const setSlot = (slot) => {
		canvas.style.gridRow = slot.row;
        canvas.style.gridColumn = slot.column;
	} 

	const drawBorders = ()=> {
		context.beginPath();
        context.lineWidth = .5
        context.strokeStyle = 'black'
        context.moveTo( 0, 0 );
        context.lineTo( canvas.width, 0 );
        context.moveTo( canvas.width, 0 );
        context.lineTo( canvas.width, canvas.height );
        context.moveTo( canvas.width, canvas.height );
        context.lineTo( 0, canvas.height );
        context.moveTo( 0, canvas.height );
        context.lineTo( 0, 0 );
        context.stroke();
		context.fillStyle = 'white';
		context.font = 'bold 48px serif';
		context.fillText( model.name, canvas.width -  context.measureText(model.name).width, TILE_SIZE )
	}

	export const initializeGrid = ( columns: number, rows: number, startingIndex: number = null ): void => {
		context.clearRect(0, 0, canvas.width, canvas.height);
		canvas.width = columns * TILE_SIZE;
		canvas.height = rows * TILE_SIZE;
        grid = new Grid( columns, rows, startingIndex );
    }

	export const clearGrid = ( ): void => {
		context.clearRect(0, 0, canvas.width, canvas.height);
		canvas.width = 0;
		canvas.height = 0;
        grid = null;
	}

	export const drawTileToFittingCanvas = ( activeSheet: ImageModel, tileModel: TileModel, xy: {x: number, y: number} ): void => {
		mirrorOrFlipTile( activeSheet.image, tileModel, invisibleCanvas.getContext("2d"), xy );
		canvas.width = GRID_BLOCK_IN_SHEET_PX;
		canvas.height = GRID_BLOCK_IN_SHEET_PX;
		context.drawImage(
            invisibleCanvas,
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX
        )
	}

	export const getTileAtCell = ( column: number, row: number ): Tile => {
		return grid.getTileAtCell( column, row );
	}
	
	export const setImageToCanvas = ( image: ImageModel ) : void => {
		drawToFittingCanvas( image, canvas, 0, 0, image.image.width, image.image.height, 0, 0);
	}

	export const setCharacterToCanvas = ( image: ImageModel, direction: DirectionEnum = DirectionEnum.down ) : void => {
		drawToFittingCanvas( image, canvas, 0, direction * MAP_SPRITE_HEIGHT_IN_SHEET, MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET, 0, 0);
	}

	export const setSpriteFrameToCanvas = ( image: ImageModel ) : void => {
		const objectSpriteModel : MapObjectSpriteModel = image.dataObject as MapObjectSpriteModel;
		const widthInSheet = objectSpriteModel.widthBlocks * GRID_BLOCK_IN_SHEET_PX;
		const heightInSheet = objectSpriteModel.heightBlocks * GRID_BLOCK_IN_SHEET_PX;
		drawToFittingCanvas( image, canvas, 0, 0, widthInSheet, heightInSheet, 0, 0);
	}

	export const setAlignedSpriteFrameToCanvas = ( image: ImageModel, direction: DirectionEnum = DirectionEnum.down ) : void => {
		const objectSpriteModel : MapObjectSpriteModel = image.dataObject as MapObjectSpriteModel;
		const widthInSheet = ((direction == DirectionEnum.down || direction == DirectionEnum.up) ? objectSpriteModel.vertWidthBlocks : objectSpriteModel.horiWidthBlocks) * GRID_BLOCK_IN_SHEET_PX;
		const heightInSheet = ((direction == DirectionEnum.down || direction == DirectionEnum.up) ? objectSpriteModel.vertHeightBlocks : objectSpriteModel.horiHeightBlocks) * GRID_BLOCK_IN_SHEET_PX;
		const frames : {x: number, y: number}[] = objectSpriteModel.movementFrames[direction];
		drawToFittingCanvas( image, canvas, frames[0].x, frames[0].y, widthInSheet, heightInSheet, 0, 0);
	}

	export const setTilesetToCanvas = ( image: ImageModel, index: number, parts: number ) : void => {
		let imageHeight = image.image.height / parts;
		drawToFittingCanvas( image, canvas, 0, imageHeight * index, image.image.width, imageHeight, 0, 0);
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

	export const drawTileBordersToCanvas = ( ): void => {
		grid.drawTileBorders( context );
	}

	export const drawGridToCanvas = ( ) : void => {
		grid.drawTiles( context, sheet );
	}

	export const fillRect = ( x:number, y:number, width:number, height:number, color:string ): void => {
		context.fillStyle = color;
		context.fillRect( x, y, width, height );
	}

	const registerClick = (e: MouseEvent) => {
		if ( canvasType === CanvasTypeEnum.tilesheet ) { 
			const tile = grid.getTileAtXy(e.offsetX, e.offsetY);
			handleCanvasClick( tile );
		}
		else if ( canvasType === CanvasTypeEnum.spriteCanvas ) {
			handleCanvasClick( spriteModel.dataObject );
		}
		else if ( canvasType !== CanvasTypeEnum.overview && canvasType !== CanvasTypeEnum.utility ) {
			const tile = grid.getTileAtXy(e.offsetX, e.offsetY);
			handleCanvasClick( tile, e.shiftKey );
		}	
	}
	const mouseDown = (e: MouseEvent) => {
		if ( canvasType == CanvasTypeEnum.background || canvasType === CanvasTypeEnum.foreground ) {
			const tile = grid.getTileAtXy(e.offsetX, e.offsetY);
			registerMouseClickStart( tile );
		}
	}
	const mouseUp = (e: MouseEvent) => {
		if ( canvasType == CanvasTypeEnum.background || canvasType === CanvasTypeEnum.foreground ) {
			const tile = grid.getTileAtXy(e.offsetX, e.offsetY);
			registerMouseClickEnd( tile, canvasType, e.shiftKey );
		}
	}
	export const hideCanvas = ( ) =>{
		invisible = true;
	}

	export const showCanvas = ( ) => {
		invisible = false;
	}

	export const drawSpritesToCanvas = ( canvasObjects: CanvasObjectModel[]): void => {
		console.log(model);
		const sortedSprites = orderCanvasObjectsByCellLocation( canvasObjects );
		sortedSprites.forEach( (model: CanvasObjectModel): void => {
			console.log(model);
			const tile = grid.getTileAtCell(model.column, model.row);
			if ( model.hasOwnProperty('sprite') ) {
				drawCharacterToCanvas( model as CharacterModel, tile );
			}
			else {
				drawMapObjectToCanvas( model as MapObjectModel, tile );
			}
		});
	}

	const drawCharacterToCanvas = ( character: CharacterModel, tile: Tile ) : void => {
		const imageModel : ImageModel = getImageModelForCharacter( character );
		const spriteFrame : SpriteFrameModel = getSpriteFrame( imageModel, character.direction );
		drawSpriteToTileOnCanvas( imageModel, canvas, spriteFrame, tile );
	}

	const drawMapObjectToCanvas = ( mapObject: MapObjectModel, tile: Tile ) : void => {
		const imageModel : ImageModel = getImageModelForObject( mapObject );
		const spriteFrame : SpriteFrameModel = getSpriteFrame( imageModel, mapObject.direction );
		drawSpriteToTileOnCanvas( imageModel, canvas, spriteFrame, tile );
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
	canvas {
		pointer-events: all;
	}
</style>

<canvas 
	bind:this={canvas}
	on:click={registerClick}
	on:mousedown={mouseDown}
	on:mouseup={mouseUp}
	class:invisible={invisible}
	class:margin={canvasType === CanvasTypeEnum.spriteCanvas}
/>