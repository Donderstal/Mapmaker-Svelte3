<script>
	import { MainMenuEnum } from "../enumerables/MainMenuEnum";
	import Button from "./partials/Button.svelte";
	import SelectOverview from "./views/SelectOverview.svelte";
	import NewMap from "./views/NewMap.svelte";
	import LoadMap from "./views/LoadMap.svelte";

	let activeForm = false;

	const resetForm = ( ) => {
		activeForm = false;
	}

	const activateForm = ( formType ) => {
		resetForm( );
		activeForm = formType;
	} 

	const getFormOptions = ( ) => {
		switch( activeForm ) {
			case MainMenuEnum.createMap :
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
		grid-column: middleColumn / rightMargin;
		grid-row: topRow / bottomRow;
	}
	.button-container {
		margin-bottom: 5vh;
	}
</style>
<div class="container">
	<div class="header-item">
		<h2>Julius Mapmaker</h2>
	</div>
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
	<div class="right-item">
		{#if activeForm == MainMenuEnum.createMap }
			<NewMap/>
		{:else if activeForm == MainMenuEnum.loadMap }
			<LoadMap/>
		{:else if activeForm == MainMenuEnum.neighbourhoodOverview }
			<SelectOverview/>
		{/if}
		{#if activeForm !== false}
			<Button elementId={"Lets_go_button"} action={() => {
				getFormOptions( );
			}} buttonText={"Let's go!"}/>
		{/if}
	</div>
</div>