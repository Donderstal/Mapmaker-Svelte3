<script>
	//partials
	import Button from "./partials/Button.svelte";
	import FormWarning from "./partials/FormWarning.svelte";

	//views
	import Register from "./views/Register.svelte";
	import LogIn from "./views/LogIn.svelte";
	import Validate from "./views/Validate.svelte";
	import ResetPassword from './views/ResetPassword.svelte';

	//enumerables
	import { AccountScreenEnum } from "../enumerables/AccountScreenEnum";
	import { onUserLogin } from "../stores";
	
	//login system navigation
	let activeForm = false;

	//form validation
	let invalidForm = false;
	let errorMessage = false;
	let userMessage = false;

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
		userMessage = false;

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

	const postActiveForm = () => {
		let form;
		switch(activeForm) {
			case AccountScreenEnum.loggingIn:
				console.log(document.getElementById("log-in-form"))
				form = new FormData(document.getElementById("log-in-form"));
				form.append("form_type", "LOG_IN")
				break;
			case AccountScreenEnum.registering:
				console.log(document.getElementById("sign-up-form"))
				form = new FormData(document.getElementById("sign-up-form"));
				form.append("form_type", "REGISTER")
				break;
			case AccountScreenEnum.validating:
				console.log(document.getElementById("validate-form"))
				form = new FormData(document.getElementById("validate-form"));
				form.append("form_type", "VALIDATE")
				break;
			case AccountScreenEnum.resettingPassword:
				console.log(document.getElementById("restore-password-form"))
				form = new FormData(document.getElementById("restore-password-form"))
				form.append("form_type", "RESET_PASSWORD")
				break;
			default:
				console.log("Error sending form data");
		}
		console.log(Array.from(form))

		prepareHTTPRequest( "POST", "catch_http_request.php", form );
	} 

	const prepareHTTPRequest = ( method, url, data ) => {
		fetch( url, {
			method: method,
			body: data
		} ).then( response => { 
				return response.json()
		}	).then( 
			result => handleHTTPResponse(result)
		).catch(err => {
			console.log("Error Reading data " + err);
		} );
	}

	const handleHTTPResponse = ( responseJSON ) => {
		const responseObject = JSON.parse(responseJSON);
		console.log(responseObject);
		if ( responseObject["success"] ) {
			handleFormSuccess( );
		}
		else {
			errorMessage = responseObject["error-message"];
			window.setTimeout(()=>{ errorMessage = false; }, 2000);
		}
	}

	const handleFormSuccess = ( ) => {
		switch(activeForm) {
			case AccountScreenEnum.loggingIn:
			case AccountScreenEnum.validating:
				onUserLogin( );
				break;
			case AccountScreenEnum.registering:
				userMessage = "Thanks for registering! You'll receive an activation email on your account soon.";
				break;
			case AccountScreenEnum.resettingPassword:
				userMessage = "You've received an email with further instructions on restoring your account."
				break;
			default:
				console.log("Error sending form data");
		}

		activeForm = false;
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
        passwordConfirm = document.getElementById("password-confirmation-input").value;
    }
	$: showConfirmPasswordWarning = !passwordsMatch
	const resetConfirmPasswordValidation = ( ) => {
		if ( document.getElementById("password-confirmation-input") != null ) {
			document.getElementById("password-confirmation-input").value = "";
		}
		passwordConfirm = "";
	}

	const onSecretCodeChange = ( ) => {
        codeIsDirty = document.getElementById("activation-code-input") !== null && document.getElementById("activation-code-input").value !== "";
    }
	const resetSecretCodeValidation = ( ) => {
		if ( document.getElementById("activation-code-input") !== null ) {
			document.getElementById("activation-code-input").value = "";
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
	h3 {
		margin: 0 auto;
		max-width: 30vw;
	}
</style>

<div class="container">
	<div class="header-item">
		<h2>Julius Mapmaker</h2>
	</div>
	<div class="top-item">
		<div class="button-container">
			<Button action={()=>activateForm(AccountScreenEnum.loggingIn)} buttonText={"Log In"}/>
		</div>
		<div class="button-container">
			<Button action={()=>activateForm(AccountScreenEnum.validating)} buttonText={"Activate account"}/>
		</div>
	</div>
	<div class="bottom-item">
		<div class="button-container">
			<Button action={()=>activateForm(AccountScreenEnum.registering)} buttonText={"Register"}/>
		</div>
		<div class="button-container">
			<Button action={()=>activateForm(AccountScreenEnum.resettingPassword)} buttonText={"Forgot password"}/>
		</div>
	</div>
	<div class="right-item">
		{#if activeForm === AccountScreenEnum.loggingIn}	
			<LogIn 
				userNameValidator={onUsernameChange}
				passwordValidator={onPasswordChange}

				showUsernameWarning={showUsernameWarning}
			/>
		{:else if activeForm === AccountScreenEnum.registering}
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
		{:else if activeForm === AccountScreenEnum.validating}
			<Validate
				userNameValidator={onUsernameChange}
				passwordValidator={onPasswordChange}
				secretCodeValidator={onSecretCodeChange}

				showUsernameWarning={showUsernameWarning}
			/>
		{:else if activeForm === AccountScreenEnum.resettingPassword}
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
		{#if userMessage}
			<h3>{userMessage}</h3>
		{/if}
		{#if activeForm !== false}
			<Button elementId={"Sign_up_button"} action={(e) => {
				if ( checkIfFormIsValid() ) {
					postActiveForm( )
				}
				else {
					invalidForm = true;
					window.setTimeout(()=>{ invalidForm = false; }, 2000)
				}
			}} buttonText={"Sign up"}/>
		{/if}
	</div>
</div>