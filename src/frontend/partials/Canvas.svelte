<script lang="ts">
	import { onMount } from "svelte";
	import { Grid } from '../../canvas/Grid'
	import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
	import type { ImageModel } from "../../models/ImageModel";
	import type { MapModel } from "../../models/MapModel";
	import type { TileModel } from "../../models/TileModel";
	import { MAP_SPRITE_HEIGHT_IN_SHEET, MAP_SPRITE_WIDTH_IN_SHEET, TILE_SIZE } from "../../resources/constants";

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
			console.log(spriteModel);
			console.log(typeof spriteModel.dataObject);
			if ( spriteModel.dataObject.hasOwnProperty("className") ) {
				setCharacterToCanvas( spriteModel );
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

	export const setCharacterToCanvas = ( image: ImageModel ) : void => {
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