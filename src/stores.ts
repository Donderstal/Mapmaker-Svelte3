import { writable } from 'svelte/store';

export const loggedIn = writable();
export const currentScreen = writable();

export const onUserLogin = ( ) => {
    loggedIn.set( true );
}