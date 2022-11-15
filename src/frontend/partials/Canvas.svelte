<script lang="ts">
	import { onMount } from "svelte";

	import type { MapModel } from "../../models/MapModel";
	import type { TileModel } from "../../models/TileModel";

	import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
	import { GRID_BLOCK_IN_SHEET_PX, TILE_SIZE } from "../../resources/constants";
	import { Grid } from '../../canvas/Grid'
	import { drawSpriteToTileOnCanvas, drawToFittingCanvas, mirrorOrFlipTile } from "../../helpers/canvasHelpers";
	import { getSpriteFrame } from "../../helpers/modelConversionHelpers";
	import type { Tile } from "../../canvas/Tile";
	import type { SpriteFrameModel } from "../../models/SpriteFrameModel";
	import { orderCanvasObjectsByCellLocation } from "../../helpers/sortHelpers";
	import type { CanvasObjectModel } from "../../models/CanvasObjectModel";
	import { user } from "../../stores";
    import type { SpriteDataModel } from "../../models/SpriteDataModel";
    import type { TilesheetModel } from "../../models/TilesheetModel";
    import { DirectionEnum } from "../../enumerables/DirectionEnum";

	export let canvasType : CanvasTypeEnum;
	export let spriteModel : SpriteDataModel = undefined;
	export let handleCanvasClick = undefined;
	export let registerMouseClickStart = undefined;
	export let registerMouseClickEnd = undefined;
	export let map : MapModel = undefined;
	export let slot : {column: number, row: number} = undefined;

	let grid : Grid;
	let canvas : HTMLCanvasElement;
	let invisibleCanvas : HTMLCanvasElement;
	let context : CanvasRenderingContext2D;
	let model : MapModel;
	let sheet : TilesheetModel

	let invisible : boolean = false;

	onMount(() => {
		context = canvas.getContext("2d");
		if ( canvasType == CanvasTypeEnum.spriteCanvas ) {
			setSpriteDataModelToCanvas( spriteModel );	
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
			sheet = Object.values($user.tilesets as TilesheetModel[]).filter((e)=>{return e.key === model.tileSet})[0];
			setSlot(slot);
			initializeGrid( model.columns, model.rows );
			setTileModelsToGridTiles( model.grid );
			grid.drawTiles(context, sheet.image);

			drawSpritesToCanvasGrid( model.sprites );

			let frontGrid = new Grid( model.columns, model.rows );
			frontGrid.setTileModelsToTiles( model.frontGrid );
			frontGrid.drawTiles(context, sheet.image);

			drawSpritesToCanvasGrid( model.frontSprites )
;			drawBorders();
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
		context.fillText( model.key, canvas.width -  context.measureText(model.key).width, TILE_SIZE )
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

	export const drawTileToFittingCanvas = ( activeSheet: TilesheetModel, tileModel: TileModel, xy: {x: number, y: number} ): void => {
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

	export const setMapModel = ( mapModel: MapModel, tilesheet: TilesheetModel, isBackground: boolean ): void => {
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
		grid.drawTiles( context, sheet.image );
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
			handleCanvasClick( spriteModel );
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

	export const drawSpritesToCanvasGrid = ( canvasObjects: CanvasObjectModel[]): void => {
		const sortedSprites = orderCanvasObjectsByCellLocation( canvasObjects );
		sortedSprites.forEach(drawCanvasObjectToCanvasGrid);
	}

	const drawCanvasObjectToCanvasGrid = (canvasObject: CanvasObjectModel): void => {
		const tile = grid.getTileAtCell(canvasObject.column, canvasObject.row);
		const spriteFrame : SpriteFrameModel = getSpriteFrame( canvasObject.spriteDataModel, canvasObject.direction );
		drawSpriteToTileOnCanvas( canvasObject.spriteDataModel.image, canvas, spriteFrame, tile );
	}

	export const setSpriteDataModelToCanvas = (model: SpriteDataModel, direction: DirectionEnum = DirectionEnum.down ) => {
		const frame = getSpriteFrame(model, direction);
		try {
			drawToFittingCanvas( model.image, canvas, frame.x, frame.y, frame.width, frame.height, 0, 0);
		}
		catch(ex) {
			console.log(ex);
			console.log(model)
		}
	}

	export const setTilesetToCanvas = ( tileSheet: TilesheetModel, index: number, parts: number ) : void => {
		let imageHeight = tileSheet.image.height / parts;
		try {
			drawToFittingCanvas( tileSheet.image, canvas, 0, imageHeight * index, tileSheet.image.width, imageHeight, 0, 0);
		}
		catch(ex) {
			console.log(ex);
			console.log(tileSheet)
		}
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