<script>
	//partials
	import Button from "./partials/Button.svelte";
	import FormWarning from "./partials/FormWarning.svelte";
	import Form from "./views/Form.svelte";

	//enumerables
	import { AccountScreenEnum } from "../enumerables/AccountScreenEnum";
	import { onUserLogin } from "../stores";
	import Header from "./partials/Header.svelte";
	
	//login system navigation
	let activeForm = false;
	let activeFormType = false;

	let logInForm;
	$: showLogIn = activeFormType === AccountScreenEnum.loggingIn;
	let validateForm;
	$: showValidate = activeFormType === AccountScreenEnum.validating
	let registerForm;
	$: showRegister = activeFormType === AccountScreenEnum.registering;
	let resetPasswordForm;
	$: showResetPassword = activeFormType === AccountScreenEnum.resettingPassword;

	//form validation
	let invalidForm = false;
	let errorMessage = false;
	let userMessage = false;

	const resetForm = ( ) => {
		invalidForm = false;
		userMessage = false;
		if( activeForm !== false ) {
			activeForm.resetFormData( );
		}
	}

	const activateForm = ( form ) => {
		resetForm();
		activeFormType = form;
		activeForm = getFormByActiveType( );
;	}

	const getFormByActiveType = ( ) => {
		switch( activeFormType ) {
			case AccountScreenEnum.loggingIn:
				return logInForm;
			case AccountScreenEnum.registering:
				return registerForm; 
			case AccountScreenEnum.validating:
				return validateForm;
			case AccountScreenEnum.resettingPassword:
				return resetPasswordForm;
			default:
				return false;
		}
	}

    const checkIfFormIsValid = ( ) => {
		return activeForm.checkIfFormIsValid( );
    }    

	const prepareHTTPRequest = ( method, url, data ) => {
		fetch( url, {
			method: method,
			body: data
		}).then( response => { 
			return response.json()
		}).then( 
			result => handleHTTPResponse(result)
		).catch(err => {
			console.trace( );
			console.log("Error Reading data " + err);
		} );
	}

	const handleHTTPResponse = ( responseJSON ) => {
		const responseObject = JSON.parse(responseJSON);
		if ( responseObject["success"] ) {
			handleFormSuccess( );
		}
		else {
			errorMessage = responseObject["error-message"];
			window.setTimeout(()=>{ errorMessage = false; }, 2000);
		}
	}

	const handleFormSuccess = ( ) => {
		switch(activeFormType) {
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
				console.log("Error sending form data. Activeform: " + activeForm);
		}

		activeForm = false;
	}

	const handleButtonClick = ( ) => {
		if ( checkIfFormIsValid() ) {
			prepareHTTPRequest( "POST", "catch_http_request.php", activeForm.getFormData( ) )
		}
		else {
			invalidForm = true;
			window.setTimeout(()=>{ invalidForm = false; }, 2000)
		}
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
		<Header/>
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
		<Form
			bind:this={logInForm}
			visible={showLogIn}
			formType={AccountScreenEnum.loggingIn}
		/>
		<Form
			bind:this={validateForm}
			visible={showValidate}
			formType={AccountScreenEnum.validating}
		/>
		<Form
			bind:this={registerForm}
			visible={showRegister}
			formType={AccountScreenEnum.registering}
		/>
		<Form
			bind:this={resetPasswordForm}
			visible={showResetPassword}
			formType={AccountScreenEnum.resettingPassword}
		/>
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
			<Button inputName={"Lets_go_button"} action={handleButtonClick} buttonText={"Let's go!"}/>
		{/if}
	</div>
</div>