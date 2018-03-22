import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'

import { RecaptchaLoaderService } from './recaptcha-loader.service'
import { RECAPTCHA_LANGUAGE } from './recaptcha-language.token'

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
	constructor(@Optional() @SkipSelf() parentModule: RecaptchaLoaderModule) {
		if (parentModule) {
			throw new Error(
				'RecaptchaLoaderModule is already loaded. Import it only in the CoreModule or AppModule.')
		}
	}
	/**
	 * Injects module and sets recaptcha language.
	 * @param language https://developers.google.com/recaptcha/docs/language
	 */
	public static withLanguage(language: string): ModuleWithProviders {
		return {
			ngModule: RecaptchaLoaderModule, providers: [
				{ provide: RECAPTCHA_LANGUAGE, useValue: language }
			]
		}
	}
}
