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
	 * "audio" | "image"
	 */
	type?: string
	/**
	 * "light" | "dark"
	 */
	theme?: ReCaptchaV2.Theme
	/**
	 * reCAPTCHA index.
	 */
	tabindex?: number
	/**
	 * Normal / Compact / Invisible.
	 */
	size?: ReCaptchaV2.Size
	/**
	 * "bottomright" | "bottomleft" | "inline" | "none"
	 */
	badge?: string
	/**
	 * If true, this reCAPTCHA instance will be part of a separate ID space and badge value will be set to "none".
	 * Id starts with 1E5 instead of 0.
	 * @default false
	 */
	isolated?: boolean
	/**
	 * If true, preloads recaptcha(probably challenge)
	 * By default only invisible is preloaded.
	 */
	preload?: boolean
	// Only God and Google know what are these parameters for. It's better to leave them alone.
	stoken?: any
	s?: any
	pool?: any
	action?: any
	'content-binding'?: any
	origin?: any
	version?: any
	/**
	 * Language.
	 * Accepted values: https://developers.google.com/recaptcha/docs/language
	 */
	hl?: string
}
