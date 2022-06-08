<script>
	import { user } from '../../stores.ts'
</script>

<div>
	<label for="neighbourhoodselect">Choose neighbourhood for overview:</label>
	<select id="neighbourhoodselect">
		{#each $user.neighbourhoods as neighbourhood}
			<option>{neighbourhood.name}</option>
		{/each}	
	</select>
</div>