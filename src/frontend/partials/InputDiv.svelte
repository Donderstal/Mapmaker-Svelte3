<script>   
    import Input from "./Input.svelte";
    import Label from "./Label.svelte";
    import FormWarning	from "./FormWarning.svelte";

    export let elementId;
    export let type;
    export let placeholder;
    export let labelText;
    export let onChange;
    export let showWarning;
    export let warningText;
</script>

<div>
    <Label text={labelText} labelFor={elementId}/>
    <Input elementId={elementId} placeholder={placeholder} type={type} onChange={onChange}/>
    {#if showWarning}
        <br/>
        <FormWarning text={warningText} />
    {/if}
</div>