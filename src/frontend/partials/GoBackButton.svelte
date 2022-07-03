<script>
    export let action;
</script>

<style>
    button {
        background: #d82bba 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        width: 10vw;
        height: 4vh;
        margin: 0 auto;
        border: none;
        z-index: 5;
        box-shadow: .5vh .5vh .25vh #64005380;
        transition: transform .3s ease-out;
        position: fixed;
        padding: 0;
        top: 0.5vh;
        left: 0.5vw;
    }
    img {
        opacity: 1;
        color: #defff2;
        width: 1vw;
        height: 3vh;
        margin: 0 auto;
        border: none;
        z-index: 5;
        transition: transform .3s ease-out;
    }
    button:hover {
        cursor: pointer;
        transition: transform .3s ease-out;
        transform: translateY(-.5vh) translateX(-.5vh);
        box-shadow: 1vh 1vh .25vh #64005380;
    }
    @media only screen and (max-width: 600px) {
        button {
            top: 0vh;
            left: 0vw;
        }
    }
</style>

<button on:click={action}>
    <img id="left-arrow" class="arrow" src="/png-files/ui/arrow-left.png" alt="Left arrow"> Back
</button>