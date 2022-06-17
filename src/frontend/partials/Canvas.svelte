<script lang="ts">
	import { onMount } from "svelte";
	import { Grid } from '../../canvas/Grid'
	import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
	import type { ImageModel } from "../../models/ImageModel";
	import type { MapModel } from "../../models/MapModel";
	import type { TileModel } from "../../models/TileModel";
	import { TILE_SIZE } from "../../resources/constants";

	export let canvasType;

	let grid : Grid;
	let canvas : HTMLCanvasElement
	let context : CanvasRenderingContext2D
	let model : MapModel
	let sheet : ImageModel;

	onMount(() => {
		context = canvas.getContext("2d");
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
</script>

<style>

</style>

<canvas 
	bind:this={canvas}
	on:click={registerClick}
/>