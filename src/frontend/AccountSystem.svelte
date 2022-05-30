<script>
	//partials
	import Button from "./partials/Button.svelte";
	import FormWarning from "./partials/FormWarning.svelte";

	//views
	import Register from "./views/Register.svelte";
	import LogIn from "./views/LogIn.svelte";
	import Validate from "./views/Validate.svelte";
	import ResetPassword from './views/ResetPassword.svelte';

	//datamodels
	import { AccountScreenEnum } from "../models/AccountScreenEnum";
	
	//login system navigation
	const accountScreenEnum = new AccountScreenEnum();
	let activeForm = false;

	//form validation
	let invalidForm = false;
	let errorMessage = false;

	$: password = "";
    $: passwordConfirm = "";
    $: passwordsMatch = password == passwordConfirm;
    let passwordIsDirty = false;
    let passwordIsTooShort = false;

    let emailIsValid = false;
    let emailIsDirty = false;

    let userNameIsDirty = false;
    let userNameIsTooShort = false;

	let codeIsDirty = true;

	const resetForm = ( ) => {
		invalidForm = false;

		resetUsernameValidation();
		resetEmailValidation();
		resetPasswordValidation();
		resetConfirmPasswordValidation();
		resetSecretCodeValidation();
	}

	const activateForm = ( form ) => {
		resetForm();
		activeForm = form;
	}

    const checkIfFormIsValid = ( ) => {
		switch(activeForm) {
			case accountScreenEnum.loggingIn:
				return passwordIsDirty && userNameIsDirty;
			case accountScreenEnum.registering:
				return passwordIsDirty && !passwordIsTooShort && passwordsMatch 
				&& emailIsValid && emailIsDirty && userNameIsDirty && !userNameIsTooShort;
			case accountScreenEnum.validating:
				return passwordIsDirty && userNameIsDirty && codeIsDirty;
			case accountScreenEnum.resettingPassword:
				return emailIsValid && emailIsDirty && userNameIsDirty;
			default:
				return false;
		}
    }    

	const onUsernameChange = ( ) => {
        userNameIsTooShort = document.getElementById("username-input").value.length < 3;
        userNameIsDirty = document.getElementById("username-input") !== null && document.getElementById("username-input").value !== "";
    }
	$: showUsernameWarning = userNameIsTooShort && userNameIsDirty;
	const resetUsernameValidation = ( ) => {
		if ( document.getElementById("username-input") !== null ) {
			document.getElementById("username-input").value = "";
		}
		userNameIsTooShort = false;
		userNameIsDirty = false;
	}

	const onEmailAddressChange = ( ) => {
        const emailRegex = /\S+@\S+\.\S+/;
        emailIsValid = emailRegex.test(document.getElementById("email-input").value);
        emailIsDirty = document.getElementById("email-input") !== null && document.getElementById("email-input").value !== "";
    }
	$: showEmailWarning = !emailIsValid && emailIsDirty;
	const resetEmailValidation = ( ) => {
		if ( document.getElementById("email-input") !== null ) {
			document.getElementById("email-input").value = "";
		}
		emailIsValid = false;
        emailIsDirty = false;
	}

    const onPasswordChange = ( ) => {
		password = document.getElementById("password-input").value;
        passwordIsTooShort = document.getElementById("password-input").value.length < 8;
        passwordIsDirty = document.getElementById("password-input") !== null && document.getElementById("password-input").value !== "";
    }
	$: showPasswordWarning = passwordIsTooShort;
	const resetPasswordValidation = ( ) => {
		if ( document.getElementById("password-input") !== null ) {
			document.getElementById("password-input").value = "";
		}
		password = "";
		passwordIsTooShort = false;
		passwordIsDirty = false
	}

    const onPasswordConfirmChange = ( ) => {
        passwordConfirm = document.getElementById("password-confirmation").value;
    }
	$: showConfirmPasswordWarning = !passwordsMatch
	const resetConfirmPasswordValidation = ( ) => {
		if ( document.getElementById("password-confirmation") != null ) {
			document.getElementById("password-confirmation").value = "";
		}
		passwordConfirm = "";
	}

	const onSecretCodeChange = ( ) => {
        codeIsDirty = document.getElementById("activation-code") !== null && document.getElementById("activation-code").value !== "";
    }
	const resetSecretCodeValidation = ( ) => {
		if ( document.getElementById("activation-code") !== null ) {
			document.getElementById("activation-code").value = "";
		}
		codeIsDirty = false;
	}
</script>
<style>
	.container {
		display: grid;
		grid-template-columns: [leftMargin] 5vw [leftColumn] 30vw [middleColumn] 30vw [rightColumn] 30vw [rightMargin] 5vw;
		grid-template-rows: [topMargin] 20vh [topRow] 30vh [bottomRow] 30vh [bottomMargin] 20vh;
	}
	.header-item {
		grid-column: middleColumn / rightColumn;
		grid-row: topMargin;
	}
	.top-item {
		grid-column: leftColumn / rightColumn;
		grid-row:	topRow / middleRow;
	}
	.bottom-item {
		grid-column: leftColumn / rightColumn;
		grid-row:	bottomRow / bottomMargin;
	}
	.right-item {
		grid-column: middleColumn / rightMargin;
		grid-row: topRow / bottomRow;
	}
	.button-container {
		margin-bottom: 5vh;
	}
</style>

<div class="container">
	<div class="header-item">
		<h2>Julius Mapmaker</h2>
	</div>
	<div class="top-item">
		<div class="button-container">
			<Button action={()=>activateForm(accountScreenEnum.loggingIn)} buttonText={"Log In"}/>
		</div>
		<div class="button-container">
			<Button action={()=>activateForm(accountScreenEnum.validating)} buttonText={"Activate account"}/>
		</div>
	</div>
	<div class="bottom-item">
		<div class="button-container">
			<Button action={()=>activateForm(accountScreenEnum.registering)} buttonText={"Register"}/>
		</div>
		<div class="button-container">
			<Button action={()=>activateForm(accountScreenEnum.resettingPassword)} buttonText={"Forgot password"}/>
		</div>
	</div>
	<div class="right-item">
		{#if activeForm === accountScreenEnum.loggingIn}	
			<LogIn 
				userNameValidator={onUsernameChange}
				passwordValidator={onPasswordChange}

				showUsernameWarning={showUsernameWarning}
			/>
		{:else if activeForm === accountScreenEnum.registering}
			<Register
				userNameValidator={onUsernameChange}
				emailAddressValidator={onEmailAddressChange}
				passwordValidator={onPasswordChange}
				passwordConfirmValidator={onPasswordConfirmChange}

				showUsernameWarning={showUsernameWarning}
				showEmailWarning={showEmailWarning}
				showPasswordWarning={showPasswordWarning}
				showConfirmPasswordWarning={showConfirmPasswordWarning}
			/>
		{:else if activeForm === accountScreenEnum.validating}
			<Validate
				userNameValidator={onUsernameChange}
				passwordValidator={onPasswordChange}
				secretCodeValidator={onSecretCodeChange}

				showUsernameWarning={showUsernameWarning}
			/>
		{:else if activeForm === accountScreenEnum.resettingPassword}
			<ResetPassword
				userNameValidator={onUsernameChange}
				emailAddressValidator={onEmailAddressChange}

				showUsernameWarning={showUsernameWarning}
				showEmailWarning={showEmailWarning}
			/>
		{/if}
		{#if invalidForm} 
			<FormWarning text={"One or more fields are incorrect or empty!"}/>
			<br/>
		{/if}
		{#if errorMessage} 
			<FormWarning text={errorMessage}/>
			<br/>
		{/if}
		{#if activeForm !== false}
			<Button elementId={"Sign_up_button"} action={() => {
				if ( checkIfFormIsValid() ) {
					//postActiveForm( )
					alert("form!");
				}
				else {
					invalidForm = true;
					window.setTimeout(()=>{ invalidForm = false; }, 2000)
				}
			}} buttonText={"Sign up"}/>
		{/if}
	</div>
</div>