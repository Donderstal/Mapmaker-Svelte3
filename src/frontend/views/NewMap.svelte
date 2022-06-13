<script>
    import InputDiv from "../partials/InputDiv.svelte";
    import { user } from '../../stores.ts'
    import { TilesheetTypeEnum } from "../../enumerables/TilesheetTypeEnum";

    export let optionListener;

    const outdoorSheets = Object.values($user.tilesets).filter((e)=>{return e.dataObject.category === TilesheetTypeEnum.outdoors});
    const indoorSheets = Object.values($user.tilesets).filter((e)=>{return e.dataObject.category === TilesheetTypeEnum.indoors});
    const obsoleteSheets  = Object.values($user.tilesets).filter((e)=>{return e.dataObject.category === TilesheetTypeEnum.obsolete});
</script>
<div>
	<InputDiv
	    elementId={"name-input"} placeholder={"Name your map:"} type={"text"} labelText={"Map name:"}
        onChange={false} showWarning={false} warningText={""}
	/>
    <InputDiv 
        elementId={"columns-input"} placeholder={"Max columns: 24"} type={"number"} labelText={"Columns:"}
        onChange={false} showWarning={false} warningText={""}
    />
    <InputDiv 
        elementId={"rows-input"} placeholder={"Max rows: 16"} type={"number"} labelText={"Rows:"}
        onChange={false} showWarning={false} warningText={""}
    />
    <label for="tilesheet-select">Choose a tilesheet:</label>
	<select id="tilesheet-select" on:change={optionListener}>
        <option hidden disabled selected value> -- select a tilesheet -- </option>
        <optgroup label="Outdoor sheets">
            {#each outdoorSheets as outdoorSheet}
                <option value="{outdoorSheet.dataObject.key}">{outdoorSheet.dataObject.name}</option>
            {/each}
        </optgroup>
        <optgroup label="Indoor sheets">
            {#each indoorSheets as indoorSheet}
                <option value="{indoorSheet.dataObject.key}">{indoorSheet.dataObject.name}</option>
            {/each}
        </optgroup>
        <optgroup label="Obsolete sheets">
            {#each obsoleteSheets as obsoleteSheet}
                <option value="{obsoleteSheet.dataObject.key}">{obsoleteSheet.dataObject.name}</option>
            {/each}
        </optgroup>
	</select>
</div>