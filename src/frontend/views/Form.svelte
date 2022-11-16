<script>   
    import InputDiv	from "../partials/InputDiv.svelte"; 
	import { AccountScreenEnum } from "../../enumerables/AccountScreenEnum";

    export let visible;
    export let formType;
    export let onConfirm;

    const emailRegex = /\S+@\S+\.\S+/;
    let form;
    let usernameInput;
    let emailInput;
    let passwordInput;
    let passwordConfirmInput;
    let activationCodeInput;

    let passwordIsDirty = false;
    let passwordIsTooShort = false;
    let emailIsValid = false;
    let emailIsDirty = false;
    let userNameIsDirty = false;
    let userNameIsTooShort = false;
	let codeIsDirty = true;

	$: password = "";
    $: passwordConfirm = "";
    $: passwordsMatch = password == passwordConfirm;
	$: showUsernameWarning = userNameIsTooShort && userNameIsDirty;
	$: showEmailWarning = !emailIsValid && emailIsDirty;
	$: showPasswordWarning = passwordIsTooShort;
	$: showConfirmPasswordWarning = !passwordsMatch;
    
	const resetVariables = ( ) => {
		userNameIsTooShort = false;
		userNameIsDirty = false;
		emailIsValid = false;
        emailIsDirty = false;
		password = "";
		passwordIsTooShort = false;
		passwordIsDirty = false;
		passwordConfirm = "";
		codeIsDirty = false;
	}

	const onUsernameChange = ( ) => {
        userNameIsTooShort = getUsernameValue().length < 3;
        userNameIsDirty = getUsernameValue() !== "";
    }

	const onEmailAddressChange = ( ) => {
        emailIsValid = emailRegex.test(getEmailValue());
        emailIsDirty = getEmailValue() !== "";
    }

    const onPasswordChange = ( ) => {
		password = getPasswordValue( );
        passwordIsTooShort = getPasswordValue( ).length < 8;
        passwordIsDirty = getPasswordValue( ) !== "";
    }

    const onPasswordConfirmChange = ( ) => {
        passwordConfirm = getPasswordConfirmValue( );
    }

	const onActivationCodeChange = ( ) => {
        codeIsDirty = getActivationCodeValue( );
    }

    const getFormTypeString = ( ) => {
        switch(formType) {
			case AccountScreenEnum.loggingIn:
                return "LOG_IN";
			case AccountScreenEnum.validating:
                return "VALIDATE";
			case AccountScreenEnum.registering:
                return "REGISTER";
			case AccountScreenEnum.resettingPassword:
                return "RESET_PASSWORD";
			default:
				console.log("Error sending form data. Activeform: " + form);
		}
    }
    export const checkIfFormIsValid = ( ) => {
		switch(formType) {
			case AccountScreenEnum.loggingIn:
				return passwordIsDirty && userNameIsDirty;
			case AccountScreenEnum.registering:
				return passwordIsDirty && !passwordIsTooShort && passwordsMatch 
				&& emailIsValid && emailIsDirty && userNameIsDirty && !userNameIsTooShort;
			case AccountScreenEnum.validating:
				return passwordIsDirty && userNameIsDirty && codeIsDirty;
			case AccountScreenEnum.resettingPassword:
				return emailIsValid && emailIsDirty && userNameIsDirty;
			default:
				return false;
		}
    } 
    export const getFormData = ( ) => {
        const formData = new FormData(form);
		formData.append("form_type", getFormTypeString());
        return formData;
    }
    export const resetFormData = ( ) => {
        if ( usernameInput !== undefined ) {
            resetUsernameValue( );
        }
        if ( emailInput !== undefined ) {
            resetEmailValue( );
        }
        if ( passwordInput !== undefined ) {
            resetPasswordValue( );
        }
        if ( passwordConfirmInput !== undefined ) {
            resetPasswordConfirmValue( );
        }
        if ( activationCodeInput !== undefined ) {
            resetActivationCodeValue( );
        }
        resetVariables( );
    }
    export const getUsernameValue = ( ) => {
        return usernameInput.getInputValue( );
    }
    export const resetUsernameValue = ( ) => {
        usernameInput.resetInputValue( );
    }
    export const getEmailValue = ( ) => {
        return emailInput.getInputValue( );
    }
    export const resetEmailValue = ( ) => {
        emailInput.resetInputValue( );
    }
    export const getPasswordValue = ( ) => {
        return passwordInput.getInputValue( );
    }
    export const resetPasswordValue = ( ) => {
        passwordInput.resetInputValue( );
    }
    export const getPasswordConfirmValue = ( ) => {
        return passwordConfirmInput.getInputValue( );
    }
    export const resetPasswordConfirmValue = ( ) => {
        passwordConfirmInput.resetInputValue( );
    }
    export const getActivationCodeValue = ( ) => {
        return activationCodeInput.getInputValue( );
    }
    export const resetActivationCodeValue = ( ) => {
        activationCodeInput.resetInputValue( );
    }
    const onFormKeyUp = (e) =>{
        if (event.keyCode === 13) {
            onConfirm();
        }
    }
</script>
<style>
    .invisible {
        display: none;
        visibility: hidden;
    }
</style>
<form bind:this={form} class:invisible={!visible}>
    {#if formType === AccountScreenEnum.registering}
        <InputDiv 
            bind:this={usernameInput} onInputKeyUp={onFormKeyUp}
            inputName={"username-input"} placeholder={"Get a cheeky username."} type={"text"} labelText={"Username:"}
            onChange={onUsernameChange} showWarning={showUsernameWarning} warningText={"Your username must be at least 3 characters long"}
        />
        <InputDiv 
            bind:this={emailInput} onInputKeyUp={onFormKeyUp}
            inputName={"email-input"} placeholder={"Fill in your email address."} type={"email"} labelText={"Email:"}
            onChange={onEmailAddressChange} showWarning={showEmailWarning} warningText={"This is not a valid email address"}
        />
        <InputDiv
            bind:this={passwordInput} onInputKeyUp={onFormKeyUp}
            inputName={"password-input"} placeholder={"Think of a good password."} type={"password"} labelText={"Password:"} 
            onChange={onPasswordChange} showWarning={showPasswordWarning} warningText={"Your password must be at least 8 characters long."}
        />
        <InputDiv 
            bind:this={passwordConfirmInput} onInputKeyUp={onFormKeyUp}
            inputName={"password-confirmation-input"} placeholder={"Repeat your password."} type={"password"} labelText={"Repeat password:"} 
            onChange={onPasswordConfirmChange} showWarning={showConfirmPasswordWarning} warningText={"The passwords you inputted do not match."}
        />
    {:else}
        <InputDiv 
            bind:this={usernameInput} onInputKeyUp={onFormKeyUp}
            inputName={"username-input"} placeholder={"Fill in your username"} type={"text"} labelText={"Username:"}
            onChange={onUsernameChange} showWarning={false} warningText={""}
        />
        {#if formType === AccountScreenEnum.loggingIn || formType === AccountScreenEnum.validating }
            <InputDiv 
                bind:this={passwordInput} onInputKeyUp={onFormKeyUp}
                inputName={"password-input"} placeholder={"Fill in your password"} type={"password"} labelText={"Password:"}
                onChange={onPasswordChange} showWarning={false} warningText={""}
        />
        {/if}
        {#if formType === AccountScreenEnum.validating }
            <InputDiv 
                bind:this={activationCodeInput} onInputKeyUp={onFormKeyUp}
                inputName={"activation-code-input"} placeholder={"Fill in your code"} type={"text"} labelText={"Activation code:"}
                onChange={onActivationCodeChange} showWarning={false} warningText={""}
            />
        {:else if formType === AccountScreenEnum.resettingPassword }
            <InputDiv 
                bind:this={emailInput} onInputKeyUp={onFormKeyUp}
                inputName={"email-input"} placeholder={"Fill in your email address."} type={"email"} labelText={"Email:"}
                onChange={onEmailAddressChange} showWarning={showEmailWarning} warningText={"This is not a valid email address"}
            />
        {/if}
    {/if}
</form>