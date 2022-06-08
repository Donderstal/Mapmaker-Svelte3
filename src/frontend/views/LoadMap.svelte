<script>
	import { user } from '../../stores.ts'
</script>

<div>
	<label for="load-map-select">Choose a map to load:</label>
	<select id="load-map-select">
		{#each $user.maps as map}
			<option value="{map.name}">{map.name}</option>
		{/each}		
	</select>
</div>