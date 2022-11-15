<script lang="ts">
	import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
	import { SpriteTypesEnum } from '../../enumerables/SpriteTypesEnum';
	import type { CanvasObjectModel } from '../../models/CanvasObjectModel';
    import type { SpriteDataModel } from '../../models/SpriteDataModel';
	import { user } from '../../stores';
	import Canvas from '../partials/Canvas.svelte'

	export let hide;
	export let handleSpritesheetClick;

	let spriteFilterSelect : HTMLSelectElement;
	let selection : SpriteTypesEnum = SpriteTypesEnum.all;

	let allSprites : SpriteDataModel[] = $user.sprites;
	let cars : SpriteDataModel[] = allSprites.filter((e)=>{return e.src.includes("car") || e.src.includes("bus.png")});
	let characters : SpriteDataModel[] = allSprites.filter((e)=>{return e.isCharacter;});
	let doorsAndWindows : SpriteDataModel[] = allSprites.filter((e)=>{return e.src.includes("Door") || e.src.includes("Window") || e.src.includes("window") || e.src.includes("Stairs")  });
	let furnitureBar : SpriteDataModel[] = allSprites.filter((e)=>{
		return e.src.includes("Bar") || e.src.includes("bottle") || e.src.includes("Jukebox") || e.src.includes("glass") 
		|| e.src.includes("chair_red") || e.src.includes("brown_chair") || e.src.includes("magazine_rack_b") || e.src.includes("Can_Z")
		|| e.src.includes("crisps") || e.src.includes("rug01") || ( e.src.includes("table") && !e.src.includes("_") ) 
		|| e.src.includes("toilet") || e.src.includes("urinal");
	});
	let furnitureHouse : SpriteDataModel[] = allSprites.filter((e)=>{
		return e.src.includes("_bed") || e.src.includes("_chair_red") || e.src.includes("brown_chair") || e.src.includes("couch") 
		|| e.src.includes("Fridge") || e.src.includes("house_plant") || e.src.includes("inside_bin") || e.src.includes("plant_yo") 
		|| e.src.includes("lamp_red") || e.src.includes("tv") || e.src.includes("small_table") || e.src.includes("sink") 
		|| e.src.includes("rug") || e.src.includes("yellow_chair") || e.src.includes("yellow_lamp") || e.src.includes("toilet");
	});
	let furnitureOffice : SpriteDataModel[] = allSprites.filter((e)=>{
		return e.src.includes("computer_table") || e.src.includes("house_plant") || e.src.includes("plant_yo") || e.src.includes("couch_nice") 
		|| e.src.includes("bin_hop") || e.src.includes("office_chair") || e.src.includes("phone_table") || e.src.includes("small_table") 
		|| e.src.includes("wall_thing") || e.src.includes("blue_lamp") || e.src.includes("toilet") || e.src.includes("urinal")
		|| e.src.includes("elevator");
	});
	let furnitureShop : SpriteDataModel[] = allSprites.filter((e)=>{
		return e.src.includes("bin_x") || e.src.includes("boxes") || e.src.includes("cashier_desk") || e.src.includes("flowers_a")
		|| e.src.includes("shop_") || e.src.includes("thing_") || e.src.includes("vegetables_") || e.src.includes("yellow_stand")
		|| e.src.includes("magazine_") || e.src.includes("gate_left") || e.src.includes("gate_right") || e.src.includes("poster") 
		|| e.src.includes("wall_thing") || e.src.includes("water_puddle") || e.src.includes("shelves_") 
		|| e.src.includes("toilet") || e.src.includes("urinal") || e.src.includes("elevator");
	});
	let furnitureStreet : SpriteDataModel[] = allSprites.filter((e)=>{
		return e.src.includes("bench_") || e.src.includes("bin_a") || e.src.includes("bin_x") || e.src.includes("bolard")
		|| e.src.includes("bollard") || e.src.includes("Bus_Stop") || e.src.includes("detail_") || e.src.includes("pillar_")
		|| e.src.includes("no_entry") || e.src.includes("gate_s") || e.src.includes("fire_h") || e.src.includes("plants") 
		|| e.src.includes("pot_plant_a")  || e.src.includes("tree") || e.src.includes("wheelie") || e.src.includes("Vent")
		|| e.src.includes("lamppost");
	});
	let miscellaneous : SpriteDataModel[] = allSprites.filter((e)=>{
		return e.src.includes("Banana") || e.src.includes("Block") || e.src.includes("Can") || e.src.includes("coin")
		|| e.src.includes("cover") || e.src.includes("crisps") || e.src.includes("funz") || e.src.includes("gang_z")
		|| e.src.includes("Graff_Z1") || e.src.includes("juice_can") || e.src.includes("newspaper") || e.src.includes("Tires") 
		|| e.src.includes("Trash")  || e.src.includes("Vent") || e.src.includes("water_puddle") || e.src.includes("Shop_front_")
		|| e.src.includes("bar_lights");
	});
	let signsAndPosters : SpriteDataModel[] = allSprites.filter((e)=>{
		return e.src.includes("sign") || e.src.includes("poster") || e.src.includes("yum_mart") || e.src.includes("_coffee_cup_");
	});
	let structures : SpriteDataModel[] = allSprites.filter((e)=>{
		return e.src.includes("bar.png") || e.src.includes("bar_versionB") || e.src.includes("cafe");
	});

	const handleSpriteFilterChange = () => {
		selection = spriteFilterSelect.selectedIndex as SpriteTypesEnum;
	}

	const handleCanvasClick = ( canvasObject: CanvasObjectModel ) => {
		handleSpritesheetClick( canvasObject );
	}
</script>
<style>
	.invisible {
		display: none;
		visibility: hidden;
	}
</style>
<div class:invisible={hide}>
	<div>
		<!-- This select corresponds to the SpriteTypeEnum -->
		<!-- Selecting a option will trigger the selection of the SpriteTypeEnum at that index -->
		<select name="sprite-type-select" bind:this={spriteFilterSelect} on:change={()=>{handleSpriteFilterChange()}}>
			<option selected>All</option>
			<option >Cars</option>
			<option >Characters</option>
			<option >Doors, Windows, Stairs</option>
			<option >Furniture (bar)</option>
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
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
	<!--Cars-->
	<div class:invisible={selection !== SpriteTypesEnum.cars}>
		{#each cars as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick} />
		{/each}			
	</div>
	<!--Characters-->
	<div class:invisible={selection !== SpriteTypesEnum.characters}>
		{#each characters as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
	<!--Doors & Windows-->
	<div class:invisible={selection !== SpriteTypesEnum.doorsAndWindows}>
		{#each doorsAndWindows as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
		<!--Furniture bar-->
	<div class:invisible={selection !== SpriteTypesEnum.furnitureBar}>
		{#each furnitureBar as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
	<!--Furniture house-->
	<div class:invisible={selection !== SpriteTypesEnum.furnitureHouse}>
		{#each furnitureHouse as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
	<!--Furniture office-->
	<div class:invisible={selection !== SpriteTypesEnum.furnitureOffice}>
		{#each furnitureOffice as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
	<!--Furniture shop-->
	<div class:invisible={selection !== SpriteTypesEnum.furnitureShop}>
		{#each furnitureShop as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
	<!--Furniture street-->
	<div class:invisible={selection !== SpriteTypesEnum.furnitureStreet}>
		{#each furnitureStreet as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
	<!--Miscellaneous-->
	<div class:invisible={selection !== SpriteTypesEnum.miscellaneous}>
		{#each miscellaneous as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
	<!--Signs & Posters-->
	<div class:invisible={selection !== SpriteTypesEnum.signsAndPosters}>
		{#each signsAndPosters as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
	<!--Structures-->
	<div class:invisible={selection !== SpriteTypesEnum.structures}>
		{#each structures as sprite}
			<Canvas canvasType={CanvasTypeEnum.spriteCanvas} spriteModel={sprite} handleCanvasClick={handleCanvasClick}/>
		{/each}			
	</div>
</div>