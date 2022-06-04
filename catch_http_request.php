<?php
    require_once "database_config.php";

    if( isset( $_POST['form_type'] ) && $_POST['form_type'] == "REGISTER" ) {
        CreateUser( $_POST['username-input'], $_POST['email-input'], $_POST['password-input'] );
    }
    else if( isset( $_POST['form_type'] ) && $_POST['form_type'] == "LOG_IN" ) {
        LogInUser( $_POST['username-input'], $_POST['password-input'] );
    }
    else if( isset( $_POST['form_type'] ) && $_POST['form_type'] == "LOG_OUT" )  {
        LogOutUser( );
    }
    else if( isset( $_POST['form_type'] ) && $_POST['form_type'] == "VALIDATE" )  {
        ValidateUser( $_POST['username-input'], $_POST['password-input'], $_POST["activation-code-input"] );
    }
    else if( isset( $_POST['form_type'] ) && $_POST['form_type'] == "RESET_PASSWORD" )  {
        SendRestorationCode( $_POST['username-input'], $_POST['email-input'] );
    }
    else if( isset( $_POST['map_json'] ) && isset( $_POST['map_name'] ) ) {
        StoreJSONMapAsFile( json_encode($_POST['map_json']), $_POST['map_name'] );
    }
    else if ( isset( $_POST['get-maps'] ) ) {
        GetUserJSONFilesIfLoggedIn( );
    }
    else {
        echo json_encode('{ "error-message": "The form you posted was incomplete..." }');
    }
?>