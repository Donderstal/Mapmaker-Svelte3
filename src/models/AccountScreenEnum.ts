export class AccountScreenEnum {
	loggingIn: number;
	registering: number;
	validating: number;
	resettingPassword: number;

	constructor() {
		this.loggingIn = 0,
		this.registering = 1,
		this.validating = 2,
		this.resettingPassword = 3
	}
}