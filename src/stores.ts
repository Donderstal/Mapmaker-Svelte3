import { writable } from 'svelte/store';
import { setUserData } from './helpers/setUserData';

export const loggedIn = writable();
export const inMapMakerMode = writable();
export const inMapOverviewMode = writable();
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
		const userData = setUserData( returner["maps"], returner["neighbourhoods"] );
		user.set( userData );
	} ).then( () => {
		loggedIn.set( true );
    } );
}