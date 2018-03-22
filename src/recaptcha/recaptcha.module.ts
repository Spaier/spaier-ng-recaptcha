import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { RecaptchaDirective } from './recaptcha.directive'
import { RecaptchaConfig } from './recaptcha.config'

const DIRECTIVES = [
	RecaptchaDirective
]

/**
 * Module providing recaptcha directive.
 */
@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		...DIRECTIVES
	],
	declarations: [
		...DIRECTIVES
	]
})
export class RecaptchaModule {
	/**
	 * Injects module and sets default recaptcha configuration.
	 * @param config Default recaptcha configuration
	 */
	public static forRoot(config: RecaptchaConfig): ModuleWithProviders {
		return {
			ngModule: RecaptchaModule, providers: [
				{ provide: RecaptchaConfig, useValue: config }
			]
		}
	}
}
