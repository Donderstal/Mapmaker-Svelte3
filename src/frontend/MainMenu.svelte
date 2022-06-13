<script>
	import { MainMenuEnum } from "../enumerables/MainMenuEnum";
	import { user } from '../stores.ts'

	import Button from "./partials/Button.svelte";
	import SelectOverview from "./views/SelectOverview.svelte";
	import NewMap from "./views/NewMap.svelte";
	import LoadMap from "./views/LoadMap.svelte";
	import { CanvasTypEnum } from "../enumerables/CanvasTypeEnum";
	import Canvas from "./partials/Canvas.svelte";

	let activeForm = false;
	let showPreviewCanvas = false;

	let previewCanvas;
	let activePreviewName;

	let newMapForm;
	let loadMapForm;
	let mapOverviewForm;

	const resetForm = ( ) => {
		activeForm = false;
	}

	const activateForm = ( formType ) => {
		resetForm( );
		hidePreviewCanvas( );
		activeForm = formType;
	} 

	const hidePreviewCanvas = ( ) => {
		showPreviewCanvas = false;
	}

	const getFormOptions = ( ) => {
		switch( activeForm ) {
			case MainMenuEnum.createMap :
				newMapForm.getInputValues( );
				break;
			case MainMenuEnum.loadMap :
				break;
			case MainMenuEnum.neighbourhoodOverview :
				break;
			default:
				alert('error processing form! Please reload the page')
				break;
		}
	}

	const getSelectedOption = ( event ) => {
		switch( activeForm ) {
			case MainMenuEnum.createMap :
				getTilesheetPreview( event );
				break;
			case MainMenuEnum.loadMap :
				getLoadMapPreview( event );
				break;
			case MainMenuEnum.neighbourhoodOverview :
				break;
			default:
				alert('error processing form! Please reload the page')
				break;
		}
	}

	const getLoadMapPreview = ( event ) => {
		showPreviewCanvas = true;
		activePreviewName = event.target.value;

		const map = $user.maps.filter((e)=>{return e.name === event.target.value})[0];
		const sheet = $user.tilesets.filter((e)=>{return e.dataObject.key === map.tileSet})[0];

		setTimeout(()=>{
			previewCanvas.setMapModel( map, sheet );
			previewCanvas.drawTileBordersToCanvas( );
			previewCanvas.drawGridToCanvas( );		
		}, 10)
	}

	const getTilesheetPreview = ( event ) => {
		showPreviewCanvas = true;
		activePreviewName = event.target.value;

		const sheet = $user.tilesets.filter((e)=>{return e.dataObject.key === event.target.value})[0];
		setTimeout(()=>{
			previewCanvas.setImageToCanvas( sheet );
		}, 10)
	}
</script>
<style>
	.container {
		display: grid;
		grid-template-columns: [leftMargin] 5vw [leftColumn] 30vw [middleColumn] 30vw [rightColumn] 30vw [rightMargin] 5vw;
		grid-template-rows: [topMargin] 20vh [topRow] 30vh [bottomRow] 30vh [bottomMargin] 20vh;
	}
	.header-item {
		grid-column: middleColumn / rightColumn;
		grid-row: topMargin;
	}
	.top-item {
		grid-column: leftColumn / rightColumn;
		grid-row:	topRow / middleRow;
	}
	.bottom-item {
		grid-column: leftColumn / rightColumn;
		grid-row:	bottomRow / bottomMargin;
	}
	.right-item {
		grid-column: rightColumn / rightMargin;
		grid-row: topRow / bottomRow;
	}
	.button-container {
		margin-bottom: 5vh;
	}
	.canvas-preview-div {
		max-width: 768px;
	}
	span {
		position: fixed;
		margin: 1vw;
		background: rgba(0, 56, 77, 0.5);
	}
	span:hover {
		color:#D82BBA;
		cursor: pointer;
	}
</style>
<div class="container">
	<div class="header-item">
		<h2>Julius Mapmaker</h2>
	</div>
	{#if showPreviewCanvas}
		<div class="top-item canvas-preview-div">
			<h3>{activePreviewName}</h3>
			<span on:click|preventDefault={hidePreviewCanvas}>&#10006</span>
			<Canvas bind:this={previewCanvas} canvastype={CanvasTypEnum.background}/>	
		</div>
	{:else}
		<div class="top-item">
			<div class="button-container">
				<Button action={()=>activateForm(MainMenuEnum.createMap)} buttonText={"New map"}/>
			</div>
			<div class="button-container">
				<Button action={()=>activateForm(MainMenuEnum.loadMap)} buttonText={"Load map"}/>
			</div>
		</div>
		<div class="bottom-item">
			<div class="button-container">
				<Button action={()=>activateForm(MainMenuEnum.neighbourhoodOverview)} buttonText={"Map overview"}/>
			</div>
		</div>
	{/if}
	<div class="right-item">
		{#if activeForm == MainMenuEnum.createMap }
			<NewMap bind:this={newMapForm} optionListener={getSelectedOption}/>
		{:else if activeForm == MainMenuEnum.loadMap }
			<LoadMap bind:this={loadMapForm} optionListener={getSelectedOption}/>
		{:else if activeForm == MainMenuEnum.neighbourhoodOverview }
			<SelectOverview bind:this={mapOverviewForm} optionListener={getSelectedOption}/>
		{/if}
		{#if activeForm !== false}
			<Button inputName={"Lets_go_button"} action={() => {
				getFormOptions( );
			}} buttonText={"Let's go!"}/>
		{/if}
	</div>
</div>