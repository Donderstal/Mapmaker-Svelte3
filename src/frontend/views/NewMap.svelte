<script lang="ts">
    import InputDiv from "../partials/InputDiv.svelte";
    import { user } from '../../stores'
    import { TilesheetTypeEnum } from "../../enumerables/TilesheetTypeEnum";
    import type { TilesheetModel } from "../../models/TilesheetModel";

    export let optionListener;
    export let visible;

    let nameInput;
    let columnsInput;
    let rowsInput;
    let tilesheetInput

    export const getInputValues = ( ) => {
        return {
            "name": nameInput.getInputValue(),
            "columns": columnsInput.getInputValue(),
            "rows": rowsInput.getInputValue(),
            "tilesheet": tilesheetInput.value
        }
    }
    const tileSets: TilesheetModel[] = Object.values($user.tilesets as {[key in string]: TilesheetModel});
    const outdoorSheets = tileSets.filter((e)=>{return e.category === TilesheetTypeEnum.outdoors});
    const indoorSheets = tileSets.filter((e)=>{return e.category === TilesheetTypeEnum.indoors});
    const obsoleteSheets  = tileSets.filter((e)=>{return e.category === TilesheetTypeEnum.obsolete});

    export const checkIfFormIsValid = (): boolean => {
		return nameInput.getInputValue() && columnsInput.getInputValue() && rowsInput.getInputValue() 
        && tilesheetInput.value !== "EMPTY";
	}
</script>
<style>
    .invisible {
        display: none;
        visibility: hidden;
    }
</style>
<div class:invisible={!visible}>
	<InputDiv
        bind:this={nameInput} onInputKeyUp={false}
	    inputName={"name-input"} placeholder={"Name your map:"} type={"text"} labelText={"Map name:"}
        onChange={false} showWarning={false} warningText={""}
	/>
    <InputDiv  onInputKeyUp={false}
        bind:this={columnsInput}
        inputName={"columns-input"} placeholder={"Max columns: 24"} type={"number"} labelText={"Columns:"}
        onChange={false} showWarning={false} warningText={""}
    />
    <InputDiv  onInputKeyUp={false}
        bind:this={rowsInput}
        inputName={"rows-input"} placeholder={"Max rows: 16"} type={"number"} labelText={"Rows:"}
        onChange={false} showWarning={false} warningText={""}
    />
    <label for="tilesheet-select">Choose a tilesheet:</label>
	<select name="tilesheet-select" bind:this={tilesheetInput} on:change={optionListener}>
        <option hidden disabled selected value="EMPTY"> -- select a tilesheet -- </option>
        <optgroup label="Outdoor sheets">
            {#each outdoorSheets as outdoorSheet}
                <option value="{outdoorSheet.key}">{outdoorSheet.key}</option>
            {/each}
        </optgroup>
        <optgroup label="Indoor sheets">
            {#each indoorSheets as indoorSheet}
                <option value="{indoorSheet.key}">{indoorSheet.key}</option>
            {/each}
        </optgroup>
        <optgroup label="Obsolete sheets">
            {#each obsoleteSheets as obsoleteSheet}
                <option value="{obsoleteSheet.key}">{obsoleteSheet.key}</option>
            {/each}
        </optgroup>
	</select>
</div>