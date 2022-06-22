<script lang="ts">
	import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
	import { SpriteTypesEnum } from '../../enumerables/SpriteTypesEnum';
	import type { ImageModel } from '../../models/ImageModel';
	import { user } from '../../stores';
	import Canvas from '../partials/Canvas.svelte'

	let spriteFilterSelect : HTMLSelectElement;
	let selection : SpriteTypesEnum = SpriteTypesEnum.all;

	let assets : ImageModel[] = [...$user.assetPngs];
	let characters : ImageModel[] = [...$user.characterPngs]
	let allSprites : ImageModel[] = [...assets, ...characters];
	let cars : ImageModel[] = assets.filter((e)=>{return e.dataObject.src.includes("car") || e.dataObject.src.includes("bus.png")});
	let doorsAndWindows : ImageModel[] = assets.filter((e)=>{return e.dataObject.src.includes("Door") || e.dataObject.src.includes("Window") || e.dataObject.src.includes("window")});
	let furnitureHouse : ImageModel[] = assets.filter((e)=>{
		return e.dataObject.src.includes("_bed") || e.dataObject.src.includes("_chair_red") || e.dataObject.src.includes("brown_chair") || e.dataObject.src.includes("couch") 
		|| e.dataObject.src.includes("Fridge") || e.dataObject.src.includes("house_plant") || e.dataObject.src.includes("inside_bin") || e.dataObject.src.includes("plant_yo") 
		|| e.dataObject.src.includes("lamp_red") || e.dataObject.src.includes("tv") || e.dataObject.src.includes("small_table") || e.dataObject.src.includes("sink") 
		|| e.dataObject.src.includes("rug") || e.dataObject.src.includes("yellow_chair") || e.dataObject.src.includes("yellow_lamp");
	});
	let furnitureOffice : ImageModel[] = assets.filter((e)=>{
		return e.dataObject.src.includes("computer_table") || e.dataObject.src.includes("house_plant") || e.dataObject.src.includes("plant_yo") || e.dataObject.src.includes("couch_nice") 
		|| e.dataObject.src.includes("bin_hop") || e.dataObject.src.includes("office_chair") || e.dataObject.src.includes("phone_table") || e.dataObject.src.includes("small_table") 
		|| e.dataObject.src.includes("wall_thing") || e.dataObject.src.includes("blue_lamp");
	});
	let furnitureShop : ImageModel[] = assets.filter((e)=>{
		return e.dataObject.src.includes("bin_x") || e.dataObject.src.includes("boxes") || e.dataObject.src.includes("cashier_desk") || e.dataObject.src.includes("flowers_a")
		|| e.dataObject.src.includes("shop_") || e.dataObject.src.includes("thing_") || e.dataObject.src.includes("vegetables_") || e.dataObject.src.includes("yellow_stand")
		|| e.dataObject.src.includes("magazine_") || e.dataObject.src.includes("gate_left") || e.dataObject.src.includes("gate_right") || e.dataObject.src.includes("poster") 
		|| e.dataObject.src.includes("wall_thing") || e.dataObject.src.includes("water_puddle");
	});
	let furnitureStreet : ImageModel[] = assets.filter((e)=>{
		return e.dataObject.src.includes("bench_") || e.dataObject.src.includes("bin_a") || e.dataObject.src.includes("bin_x") || e.dataObject.src.includes("bolard")
		|| e.dataObject.src.includes("bollard") || e.dataObject.src.includes("Bus_Stop") || e.dataObject.src.includes("detail_") || e.dataObject.src.includes("pillar_")
		|| e.dataObject.src.includes("no_entry") || e.dataObject.src.includes("gate_s") || e.dataObject.src.includes("fire_h") || e.dataObject.src.includes("plants") 
		|| e.dataObject.src.includes("pot_plant_a")  || e.dataObject.src.includes("tree") || e.dataObject.src.includes("wheelie") || e.dataObject.src.includes("Vent")
		|| e.dataObject.src.includes("lamppost");
	});
	let miscellaneous : ImageModel[] = assets.filter((e)=>{
		return e.dataObject.src.includes("Banana") || e.dataObject.src.includes("Block") || e.dataObject.src.includes("Can") || e.dataObject.src.includes("coin")
		|| e.dataObject.src.includes("cover") || e.dataObject.src.includes("crisps") || e.dataObject.src.includes("funz") || e.dataObject.src.includes("gang_z")
		|| e.dataObject.src.includes("Graff_Z1") || e.dataObject.src.includes("juice_can") || e.dataObject.src.includes("newspaper") || e.dataObject.src.includes("Tires") 
		|| e.dataObject.src.includes("Trash")  || e.dataObject.src.includes("Vent") || e.dataObject.src.includes("water_puddle") || e.dataObject.src.includes("Shop_front_")
		|| e.dataObject.src.includes("bar_lights");
	});
	let signsAndPosters : ImageModel[] = assets.filter((e)=>{
		return e.dataObject.src.includes("sign") || e.dataObject.src.includes("poster") || e.dataObject.src.includes("yum_mart") || e.dataObject.src.includes("_coffee_cup_");
	});
	let structures : ImageModel[] = assets.filter((e)=>{
		return e.dataObject.src.includes("bar.png") || e.dataObject.src.includes("bar_versionB") || e.dataObject.src.includes("cafe");
	});

	const handleSpriteFilterChange = () => {
		selection = spriteFilterSelect.selectedIndex as SpriteTypesEnum;
	}
</script>
<style>
	.invisible {
		display: none;
		visibility: hidden;
	}
</style>
<div>
	<div>
		<select name="sprite-type-select" bind:this={spriteFilterSelect} on:change={()=>{handleSpriteFilterChange()}}>
			<option selected>All</option>
			<option >Cars</option>
			<option >Characters</option>
			<option >Doors & Windows</option>
			<option >Furniture (house)</option>
			<option >Furniture (office)</option>
			<option >Furniture (shop)</option>
			<option >Furniture (street)</option>
			<option >Miscellaneous</option>
			<option >Signs & Posters</option>
			<option >Structures</option>
		</select>
	</div>
	<!--All-->
	<div class:invisible={selection !== SpriteTypesEnum.all}>
		{#each allSprites as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Cars-->
	<div class:invisible={selection !== SpriteTypesEnum.cars}>
		{#each cars as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Characters-->
	<div class:invisible={selection !== SpriteTypesEnum.characters}>
		{#each characters as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Doors & Windows-->
	<div class:invisible={selection !== SpriteTypesEnum.doorsAndWindows}>
		{#each doorsAndWindows as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Furniture house-->
	<div class:invisible={selection !== SpriteTypesEnum.furnitureHouse}>
		{#each furnitureHouse as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Furniture office-->
	<div class:invisible={selection !== SpriteTypesEnum.furnitureOffice}>
		{#each furnitureOffice as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Furniture shop-->
	<div class:invisible={selection !== SpriteTypesEnum.furnitureShop}>
		{#each furnitureShop as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Furniture street-->
	<div class:invisible={selection !== SpriteTypesEnum.furnitureStreet}>
		{#each furnitureStreet as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Miscellaneous-->
	<div class:invisible={selection !== SpriteTypesEnum.miscellaneous}>
		{#each miscellaneous as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Signs & Posters-->
	<div class:invisible={selection !== SpriteTypesEnum.signsAndPosters}>
		{#each signsAndPosters as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
	<!--Structures-->
	<div class:invisible={selection !== SpriteTypesEnum.structures}>
		{#each structures as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} />
		{/each}			
	</div>
</div>