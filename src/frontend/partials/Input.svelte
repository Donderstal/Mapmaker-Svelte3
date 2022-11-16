<script>   
    export let inputName;
    export let type;
    export let placeholder;
    export let onChange;
    export let onKeyUp;

    let input;

    export const getValue = ( ) => {
        return input.value;
    }
    export const resetValue = ( ) => {
        input.value = "";
    }
</script>

<style>
    input {
        color:#D82BBA;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 4px solid #D82BBA;
        opacity: 1;
        font-size: 2.6vh
    }
</style>

<input bind:this={input} on:keyup={onKeyUp} type={type} placeholder={placeholder} name={inputName} on:input={onChange}/>