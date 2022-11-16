<script>
	import { MainMenuEnum } from "../enumerables/MainMenuEnum";
	import { user } from '../stores.ts'

	import Button from "./partials/Button.svelte";
	import SelectOverview from "./views/SelectOverview.svelte";
	import NewMap from "./views/NewMap.svelte";
	import LoadMap from "./views/LoadMap.svelte";
	import Header from "./partials/Header.svelte";

	import MapCanvasContainer from "./views/MapCanvasContainer.svelte";
	import MapTilesheetsContainer from "./views/MapTilesheetsContainer.svelte";

	export let prepareMapMaker;
	export let prepareMapOveriew;

	let activeForm = false;
	let activeFormType = false;
	let showPreviewCanvas = false;

	let previewTilesheet;
	let previewMap;
	let activePreviewName;

	let newMapMenu;
	$: showNewMapMenu = activeFormType === MainMenuEnum.newMap;
	let loadMapMenu;
	$: showLoadMapMenu = activeFormType === MainMenuEnum.loadMap;
	let mapOverviewMenu;
	$: showMapOverviewMenu = activeFormType === MainMenuEnum.neighbourhoodOverview;

	const resetForm = ( ) => {
		activeForm = false;
	}

	const activateForm = ( formType ) => {
		resetForm( );
		hidePreviewCanvas( );
		activeFormType = formType;
		activeForm = getActiveForm( );
	} 

	const hidePreviewCanvas = ( ) => {
		showPreviewCanvas = false;
	}

	const getActiveForm = ( ) => {
		switch( activeFormType ) {
			case MainMenuEnum.newMap :
				return newMapMenu;
			case MainMenuEnum.loadMap :
				return loadMapMenu;
			case MainMenuEnum.neighbourhoodOverview :
				return mapOverviewMenu;
		}
	}

	const getFormOptions = ( ) => {
		const inputValues = activeForm.getInputValues( );
		switch( activeFormType ) {
			case MainMenuEnum.newMap :
				prepareMapMaker(inputValues, MainMenuEnum.newMap);
				break;
			case MainMenuEnum.loadMap :
				prepareMapMaker(inputValues, MainMenuEnum.loadMap);
				break;
			case MainMenuEnum.neighbourhoodOverview :
				prepareMapOveriew(inputValues);
				break;
			default:
				alert('error processing form! Please reload the page')
				break;
		}
	}

	const getSelectedOption = ( event ) => {
		switch( activeFormType ) {
			case MainMenuEnum.newMap :
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

		const map = $user.maps.filter((e)=>{return e.key === event.target.value})[0];
		const sheet = $user.tilesets.filter((e)=>{return e.key === map.tileSet})[0];

		setTimeout(()=>{
			previewMap.initializeMapMakerCanvases( map, sheet );		
		}, 10)
	}

	const getTilesheetPreview = ( event ) => {
		showPreviewCanvas = true;
		activePreviewName = event.target.value;

		const sheet = $user.tilesets.filter((e)=>{return e.key === event.target.value})[0];
		setTimeout(()=>{
			previewTilesheet.initializeTilesheetColumn( sheet );
		}, 10)
	}

	const validateForm = () =>{
		return activeForm.checkIfFormIsValid();
	}
</script>
<style>
	.container {
		display: grid;
		grid-template-columns: [leftMargin] 5vw [leftColumn] 30vw [middleColumn] 30vw [rightColumn] 30vw [rightMargin] 5vw;
		grid-template-rows: [topMargin] 15vh [topRow] 40vh [bottomRow] 40vh [bottomMargin] 5vh;
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
		z-index: 20;
	}
	span:hover {
		color:#D82BBA;
		cursor: pointer;
	}
	.invisible {
		display: none;
		visibility: hidden;
	}
	.sheetContainer {
		height: 65vh;
		overflow: scroll;
		-ms-overflow-style: none;
		scrollbar-width: none;
		z-index: 5;
		padding: 0vh 1vh;
	}
	.sheetContainer::-webkit-scrollbar {
		display: none;
	}
</style>
<div class="container">
	<div class="header-item">
		<Header/>
	</div>
	{#if showPreviewCanvas}
		<div class="top-item canvas-preview-div">
			<h3>{activePreviewName}</h3>
			<span on:click|preventDefault={hidePreviewCanvas}>&#10006</span>
			<div class:invisible={activeFormType !== MainMenuEnum.newMap} class="sheetContainer">
				<MapTilesheetsContainer bind:this={previewTilesheet} hide={false} handleTilesheetClick={()=>{}}/>
			</div>
			<div class:invisible={activeFormType !== MainMenuEnum.loadMap}>
				<MapCanvasContainer bind:this={previewMap} handleEditModeSwitch={()=>{}} handleMapCanvasClick={()=>{}}/>
			</div>
		</div>
	{:else}
		<div class="top-item">
			<div class="button-container">
				<Button action={()=>activateForm(MainMenuEnum.newMap)} buttonText={"New map"}/>
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
		<NewMap bind:this={newMapMenu} visible={showNewMapMenu} optionListener={getSelectedOption}/>
		<LoadMap bind:this={loadMapMenu} visible={showLoadMapMenu} optionListener={getSelectedOption}/>
		<SelectOverview bind:this={mapOverviewMenu} visible={showMapOverviewMenu} optionListener={getSelectedOption}/>
		{#if activeForm !== false}
			<Button inputName={"Lets_go_button"} action={() => {
				if ( validateForm( ) ) {
					getFormOptions( );
				}
			}} buttonText={"Let's go!"}/>
		{/if}
	</div>
</div>