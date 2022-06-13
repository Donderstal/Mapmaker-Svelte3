<script>
	import { user } from '../../stores.ts'
	export let optionListener;
</script>

<div>
	<label for="load-map-select">Choose a map to load:</label>
	<select id="load-map-select" on:change={optionListener}>
		<option hidden disabled selected value> -- select a map -- </option>
		{#each $user.maps as map}
			<option value="{map.name}" >{map.name}</option>
		{/each}		
	</select>
</div>