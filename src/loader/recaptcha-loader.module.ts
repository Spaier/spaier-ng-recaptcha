import { Optional, NgModule, SkipSelf } from '@angular/core';

import { RecaptchaLoaderService } from './recaptcha-loader.service';

/**
 * Module for loading recaptcha.
 */
@NgModule({
	providers: [RecaptchaLoaderService]
})
export class RecaptchaLoaderModule {
	/**
	 * Prevents module from being imported twice.
	 * @param parentModule Another instance of this module.
	 */
	constructor( @Optional() @SkipSelf() parentModule: RecaptchaLoaderModule) {
		if (parentModule) {
			throw new Error(
				'RecaptchaLoaderModule is already loaded. Import it only in the CoreModule or AppModule.');
		}
	}
}
