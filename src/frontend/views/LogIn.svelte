<script>
    import InputDiv from "../partials/InputDiv.svelte";

    export let userNameValidator;
    export let passwordValidator;

    export let showUsernameWarning;
</script>
<form id="log-in-form">
	<InputDiv
	    elementId={"username-input"} placeholder={"Fill in your username"} type={"text"} labelText={"Username:"}
        onChange={userNameValidator} showWarning={showUsernameWarning} warningText={"Your username must be at least three characters long"}
	/>
    <InputDiv 
        elementId={"password-input"} placeholder={"Fill in your password"} type={"password"} labelText={"Password:"}
        onChange={passwordValidator} showWarning={false} warningText={""}
    />
</form>