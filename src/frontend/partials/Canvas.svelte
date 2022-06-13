<script lang="ts">
	import { onMount } from "svelte";
	import { Grid } from '../../canvas/Grid'
	import type { ImageModel } from "../../models/ImageModel";
	import type { MapModel } from "../../models/MapModel";
	import type { TileModel } from "../../models/TileModel";
	import { GRID_BLOCK_IN_SHEET_PX, TILE_SIZE } from "../../resources/constants";

	export let canvasType;

	let grid;
	let canvas;
	let context;
	let model;
	let sheet;

	onMount(() => {
		context = canvas.getContext("2d");
	})

	const initializeGrid = ( columns: number, rows: number ): void => {
		canvas.width = columns * TILE_SIZE;
		canvas.height = rows * TILE_SIZE;
        grid = new Grid( columns, rows );
    }
	
	export const setImageToCanvas = ( image: ImageModel ) : void => {
		canvas.width = image.image.width / 2;
		canvas.height = image.image.height / 2;
		grid = new Grid( canvas.width / GRID_BLOCK_IN_SHEET_PX, canvas.height / GRID_BLOCK_IN_SHEET_PX );
		context.drawImage(
			image.image, 
			0, 0,
			image.image.width, image.image.height,
			0, 0,
			canvas.width, canvas.height
		);
	}

	export const setMapModel = ( mapModel: MapModel, tilesheet: ImageModel ): void => {
		model = mapModel;
		sheet = tilesheet;
		initializeGrid( model.columns, model.rows );
		setTileModelsToGridTiles( model.grid );
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
</script>

<style>

</style>

<canvas 
	bind:this={canvas}
>

</canvas>