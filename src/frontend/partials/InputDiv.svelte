<script>   
    import Input from "./Input.svelte";
    import Label from "./Label.svelte";
    import FormWarning	from "./FormWarning.svelte";

    export let inputName;
    export let type;
    export let placeholder;
    export let labelText;
    export let onChange;
    export let showWarning;
    export let warningText;
    export let onInputKeyUp

    let input;

    export const getInputValue = ( ) => {
        return input.getValue( );
    }
    export const resetInputValue = ( ) => {
        input.resetValue( );
    }
</script>

<div>
    <Label text={labelText} labelFor={inputName}/>
    <Input bind:this={input} onKeyUp={onInputKeyUp} inputName={inputName} placeholder={placeholder} type={type} onChange={onChange}/>
    {#if showWarning}
        <br/>
        <FormWarning text={warningText} />
    {/if}
</div>