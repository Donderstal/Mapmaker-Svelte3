<script lang="ts">
	import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
	import { CanvasTypeEnum } from "../enumerables/CanvasTypeEnum";
	import Canvas from "./partials/Canvas.svelte";
	import { GridWrapper } from "../canvas/GridWrapper";
	import { onMount } from "svelte";
	export let activeNeighbourhood: NeighbourhoodModel;

	let overviewCanvasWrapper;
	let isScrollActive;
	let scrollXCounter;
	let scrollYCounter;
	let scrollTop;
	let scrollLeft;

	let gridWrapper = new GridWrapper(
		activeNeighbourhood.horizontalSlots, activeNeighbourhood.verticalSlots, activeNeighbourhood.mapDictionary
	);

	onMount(()=>{	
		overviewCanvasWrapper.addEventListener('mousedown', (e) => {
			initMapOverviewScrollOnClick(e)
		});
		overviewCanvasWrapper.addEventListener('mouseleave', () => {
			stopMapOverviewScroll();
		});
		overviewCanvasWrapper.addEventListener('mouseup', () => { 
			stopMapOverviewScroll(); 
		});
		overviewCanvasWrapper.addEventListener('mousemove', (e) => {
			e.preventDefault();
			if ( isScrollActive ) {
				mapOverviewHorizontalScroll( e ) 
			} else {
				return;
			}
		});
	})

	const stopMapOverviewScroll = ( ) => {
		isScrollActive = false;
	}

	const initMapOverviewScrollOnClick = ( event ) => {
		isScrollActive = true;
		scrollYCounter = event.pageY - overviewCanvasWrapper.offsetTop;
		scrollXCounter = event.pageX - overviewCanvasWrapper.offsetLeft;
		scrollTop = overviewCanvasWrapper.scrollTop;    
		scrollLeft = overviewCanvasWrapper.scrollLeft;    
	}

	const mapOverviewHorizontalScroll = ( event ) => {
		const x = event.pageX - overviewCanvasWrapper.offsetLeft;
		const stepHori = x - scrollXCounter;
		overviewCanvasWrapper.scrollLeft = scrollLeft - stepHori;

		const y = event.pageY - overviewCanvasWrapper.offsetTop;
		const stepVert = y - scrollYCounter;
		overviewCanvasWrapper.scrollTop = scrollTop - stepVert;
	}

	console.log(activeNeighbourhood);
</script>
<style>
	div {
		background-color: navajowhite;
		overflow: hidden;
	}
	.map-overview-canvas-wrapper {
		-ms-overflow-style: none;  /* IE and Edge */
		scrollbar-width: none;  /* Firefox */
		white-space: nowrap;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: repeat(3, 1fr);
		width: 100vw;
		height: 100vh;
	}

	.map-overview-canvas-wrapper:hover {
		cursor: grab;
	}

	.map-overview-canvas-wrapper:active {
		cursor: grabbing;
	}
</style>
<div>
	<div bind:this={overviewCanvasWrapper} class="map-overview-canvas-wrapper">
		{#each gridWrapper.slotsInOrder as map, index}
			<Canvas canvasType={CanvasTypeEnum.overview} map={map} slot={gridWrapper.slotCells[index]}/>
		{/each}
	</div>
</div>
