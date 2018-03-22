import { Injectable } from '@angular/core'

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
	 * Light or Dark V2 reCAPTCHA's theme.
	 */
	theme?: ReCaptchaV2.Theme
	/**
	 * Image or Audio.
	 */
	type?: ReCaptchaV2.Type
	/**
	 * reCAPTCHA index.
	 */
	tabindex?: number
	/**
	 * Normal / Compact / Invisible.
	 */
	size?: ReCaptchaV2.Size
	/**
	 * Placing of invisible reCAPTCHA badge.
	 */
	badge?: ReCaptchaV2.Badge
}
