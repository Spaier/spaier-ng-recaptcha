import { RecaptchaBadge } from './recaptcha-badge'
import { RecaptchaType } from './recaptcha-type'
import { RecaptchaTheme } from './recaptcha-theme'

export interface RecaptchaParameters {
	/**
	 * Your sitekey. Attribute: data-sitekey.
	 */
	sitekey: string
	/**
	 * Optional. The type of CAPTCHA to serve. Attribute: data-type.
	 * Accepted values: "audio", "image"
	 * @default "image"
	 */
	type?: RecaptchaType
	/**
	 * Optional. The color theme of the widget.
	 * Attribute: data-theme.
	 * Accepted values: "light", "dark"
	 * @default "light"
	 */
	theme?: RecaptchaTheme
	/**
	 * Optional. The badge location for g-recaptcha with size of "invisible".
	 * If isolated this value is ignored and "none" is used instead.
	 * Accepted values: "none", "inline", "bottomright", "bottomleft"
	 * Attribute: data-badge.
	 * @default "bottomright"
	 */
	badge?: RecaptchaBadge
	/**
	 * Optional.
	 * If true, this reCAPTCHA instance will be part of a separate ID space and badge value will be set to "none".
	 * Id starts with 1E5 instead of 0.
	 * Has no corresponding attribute.
	 * @default false
	 */
	isolated?: boolean
	/**
	 * Optional. Defaults to language specified in script(hl query parameter) or browser language.
	 * Has no corresponding attribute.
	 * Accepted values: https://developers.google.com/recaptcha/docs/language .
	 */
	hl?: string
	/**
	 * Optional. Your callback function that's executed when the user submits a successful CAPTCHA response.
	 * Attribute: data-callback.
	 * The user's response, g-recaptcha-response, will be the input for your callback function.
	 */
	callback?(response: string): void
	/**
	 * Optional. Your callback function that's executed when the recaptcha response expires and the user needs to solve a new CAPTCHA.
	 * Attribute: data-expired-callback.
	 */
	'expired-callback'?(): void
	/**
	 * Optional. Your callback function that's executed when reCAPTCHA encounters an error (usually network connectivity)
	 * and cannot continue until connectivity is restored.
	 * Attribute: data-error-callback.
	 */
	'error-callback'?(): void
}
