<script lang="ts">
	import { user } from '../../stores'
	export let optionListener;
	export let visible;

	let mapInput: HTMLSelectElement;
	let emptyValue = "EMPTY";
	let splitMaps = {};
	let noLocationMaps = [];

	export const getInputValues = ( ) => {
        console.log(mapInput.value)
		return mapInput.value;
    }

	export const checkIfFormIsValid = (): boolean => {
		return mapInput.value !== emptyValue
	}

	const splitMapsOnLocations = ( ) => {
		$user.maps.forEach((e)=>{
			if ( e.location === undefined || e.location === null || e.location === "" ) {
				noLocationMaps.push( e );
				return;
			}
			if ( !splitMaps.hasOwnProperty(e.location) ) {
				splitMaps[e.location] = [];
			}
			splitMaps[e.location].push(e);
		})
	}

	splitMapsOnLocations();
</script>
<style>
    .invisible {
        display: none;
        visibility: hidden;
    }
</style>
<div class:invisible={!visible}>
	<label for="load-map-select">Choose a map to load:</label>
	<select name="load-map-select" bind:this={mapInput} on:change={optionListener}>
		<option hidden disabled selected value="{emptyValue}"> -- select a map -- </option>
		{#each Object.keys(splitMaps) as locationKey}
			<optgroup label={locationKey}>
				{#each splitMaps[locationKey] as map}
					<option value="{map.key}">{map.key}</option>
				{/each}	
			</optgroup>
		{/each}	
		{#each noLocationMaps as map}
			<option value="{map.key}">{map.key}</option>
		{/each}		
	</select>
</div>