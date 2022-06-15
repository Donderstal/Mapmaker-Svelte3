<script>
	import { user } from '../../stores.ts';
	export let optionListener;
	export let visible;

	let neighbourhoodInput;

	export const getInputValues = ( ) => {
		console.log(neighbourhoodInput.value)
		return neighbourhoodInput.value;
    }
</script>
<style>
    .invisible {
        display: none;
        visibility: hidden;
    }
</style>
<div class:invisible={!visible}>
	<label for="neighbourhood-select">Choose neighbourhood for overview:</label>
	<select name="neighbourhood-select" bind:this={neighbourhoodInput} on:change={optionListener}>
		<option hidden disabled selected value> -- select a neighbourhood -- </option>
		{#each $user.neighbourhoods as neighbourhood}
			<option>{neighbourhood.name}</option>
		{/each}	
	</select>
</div>