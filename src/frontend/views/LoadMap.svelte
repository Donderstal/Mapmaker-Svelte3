<script>
	import { user } from '../../stores.ts'
	export let optionListener;
	export let visible;
	let mapInput;

	export const getInputValues = ( ) => {
        console.log(mapInput.value)
		return mapInput.value;
    }
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
		<option hidden disabled selected value> -- select a map -- </option>
		{#each $user.maps as map}
			<option value="{map.name}" >{map.name}</option>
		{/each}		
	</select>
</div>