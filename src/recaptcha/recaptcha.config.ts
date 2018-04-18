import { Injectable } from '@angular/core'

import { KeyVersion } from './key-version.enum'

@Injectable()
export class RecaptchaConfig {
	/**
	 * Default configuration of the invisible reCAPTCHA.
	 */
	invisibleConfig: GReCaptcha.Parameters
	/**
	 * Default configuration of the v2 reCAPTCHA.
	 */
	v2Config: GReCaptcha.Parameters
	/**
	 * Default version of the reCAPTCHA.
	 */
	defaultVersion?: KeyVersion
}
