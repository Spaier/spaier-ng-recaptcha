import { Injectable } from '@angular/core';

@Injectable()
/**
 * Configuration of reCAPTCHA.
 */
export class RecaptchaConfig {
	/**
	 * Invisible reCAPTCHA frontend key.
	 */
	invisibleKey?: string
	/**
	 * V2 reCAPTCHA frontend key.
	 */
	v2Key?: string
	/**
	 * V2 Theme.
	 */
	theme?: ReCaptchaV2.Theme
	/**
	 * reCAPTCHA type.
	 */
	type?: ReCaptchaV2.Type
	/**
	 * reCAPTCHA index.
	 */
	tabindex?: number
	/**
	 * reCAPTCHA size.
	 */
	size?: ReCaptchaV2.Size
	/**
	 * Invisible reCAPTCHA badge.
	 */
	badge?: ReCaptchaV2.Badge
}
