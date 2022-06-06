import { writable, get } from 'svelte/store';
import { setUserData } from './helpers/setUserData';

export const loggedIn = writable();
export const user = writable();
export const currentScreen = writable();

export const onUserLogin = ( ) => {
	let form = new FormData( );
	form.append( "form_type", "GET_MAPS" )
	fetch( "catch_http_request.php", {
		method: "POST",
		body: form
	} ).then( response => {
		return response.json();
	} ).then( returner => {
		console.log( returner )
		const userData = setUserData( returner["characters"], returner["objects"], returner["maps"], returner["neighbourhoods"] );
		console.log( userData );
		user.set( userData );
		console.log( get( user ) )
	} );
	loggedIn.set( true );
}