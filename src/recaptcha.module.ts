import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RecaptchaDirective } from './recaptcha.directive';

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
export class RecaptchaModule { }
