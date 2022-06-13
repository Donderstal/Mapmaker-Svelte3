<script>
	import { user } from '../../stores.ts';
	export let optionListener;
</script>

<div>
	<label for="neighbourhoodselect">Choose neighbourhood for overview:</label>
	<select id="neighbourhoodselect" on:change={optionListener}>
		<option hidden disabled selected value> -- select a neighbourhood -- </option>
		{#each $user.neighbourhoods as neighbourhood}
			<option>{neighbourhood.name}</option>
		{/each}	
	</select>
</div>