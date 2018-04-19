import { Injectable } from '@angular/core'

import { RecaptchaParameters } from './recaptcha-parameters'

@Injectable()
export class RecaptchaConfig {
	/**
	 * Default configuration of the invisible reCAPTCHA.
	 */
	invisibleConfig: RecaptchaParameters
	/**
	 * Default configuration of the v2 reCAPTCHA.
	 */
	v2Config: RecaptchaParameters
}
