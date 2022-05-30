<script>   
    import InputDiv	from "../partials/InputDiv.svelte"; 

    export let userNameValidator;
    export let emailAddressValidator;

    export let showUsernameWarning;
    export let showEmailWarning;
</script>

<form id="restore-password-form">
    <InputDiv 
        elementId={"username-input"} placeholder={"Fill in your username"} type={"text"} labelText={"Username:"}
        onChange={userNameValidator} showWarning={showUsernameWarning} warningText={"Your username must be at least three characters long"}
    />
    <InputDiv 
        elementId={"email-input"} placeholder={"Fill in your email address."} type={"email"} labelText={"Email:"}
        onChange={emailAddressValidator} showWarning={showEmailWarning} warningText={"This is not a valid email address"}
    />
</form>