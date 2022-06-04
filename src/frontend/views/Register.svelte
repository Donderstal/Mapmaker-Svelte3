<script>   
    import InputDiv	from "../partials/InputDiv.svelte"; 

    export let userNameValidator;
    export let emailAddressValidator;
    export let passwordValidator;
    export let passwordConfirmValidator;

    export let showUsernameWarning;
    export let showEmailWarning;
    export let showPasswordWarning;
    export let showConfirmPasswordWarning;
</script>

<form id="sign-up-form">
    <InputDiv 
        elementId={"username-input"} placeholder={"Get a cheeky username."} type={"text"} labelText={"Username:"}
        onChange={userNameValidator} showWarning={showUsernameWarning} warningText={"Your username must be at least 3 characters long"}
    />
    <InputDiv 
        elementId={"email-input"} placeholder={"Fill in your email address."} type={"email"} labelText={"Email:"}
        onChange={emailAddressValidator} showWarning={showEmailWarning} warningText={"This is not a valid email address"}
    />
    <InputDiv 
        elementId={"password-input"} placeholder={"Think of a good password."} type={"password"} labelText={"Password:"} 
        onChange={passwordValidator} showWarning={showPasswordWarning} warningText={"Your password must be at least 8 characters long."}
    />
    <InputDiv 
        elementId={"password-confirmation-input"} placeholder={"Repeat your password."} type={"password"} labelText={"Repeat password:"} 
        onChange={passwordConfirmValidator} showWarning={showConfirmPasswordWarning} warningText={"The passwords you inputted do not match."}
    />
</form>