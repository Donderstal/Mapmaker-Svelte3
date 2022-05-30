<script>   
    export let text;
    export let labelFor;
</script>

<style>
    label {
        color:#FFFFFF;
        opacity: 1;
        font-size: 2.6vh
    }
</style>

<label for={labelFor}>
    {text}
</label>