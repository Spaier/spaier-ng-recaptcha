// Type definitions for Google Recaptcha 2.0
// Project: https://www.google.com/recaptcha
// Definitions by:
// Kristof Mattei <http://kristofmattei.be>
// Martin Costello <https://martincostello.com/>
// Ruslan Arkhipau <https://github.com/DethAriel>
// Pavel Levchuk <https://github.com/Spaier>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare var grecaptcha: GReCaptcha.Recaptcha

declare namespace GReCaptcha {
	export class Recaptcha {
		/**
		 * Renders the container as a reCAPTCHA widget and returns the ID of the newly created widget.
		 * @param container The HTML element to render the reCAPTCHA widget.
		 * Specify either the ID of the container (string) or the DOM element itself.
		 * @param parameters An object containing parameters as key=value pairs.
		 * For example, {"sitekey": "your_site_key", "theme": "light"}. See @see render parameters.
		 * @param useContainerAttributes Whether to use data-* attributes of container. Defaults to true.
		 * @return the ID of the newly created widget.
		 */
		render(container: (string | HTMLElement), parameters?: Parameters, useContainerAttributes?: boolean): number
		/**
		 *  Resets the reCAPTCHA widget.
		 * @param opt_widget_id Optional widget ID, defaults to 0 if unspecified.
		 * (Not the first recaptcha rendered because if recaptcha is isolated id starts with 1E5)
		 * @param parameters If specified, rerenders recaptcha in this element with new parameters.
		 */
		reset(opt_widget_id?: number, parameters?: Parameters): void
		/**
		 * Gets the response for the reCAPTCHA widget.
		 * @param opt_widget_id Optional widget ID, defaults to 0 if unspecified.
		 * (Not the first recaptcha rendered because if recaptcha is isolated id starts with 1E5)
		 * @return the response of the reCAPTCHA widget.
		 */
		getResponse(opt_widget_id?: number): string
		/**
		 * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div instead of a button.
		 * @param opt_widget_id Optional widget ID, defaults to 0 if unspecified.
		 * (Not the first recaptcha rendered because if recaptcha is isolated id starts with 1E5)
		 */
		execute(opt_widget_id?: number): void
	}

	type Theme = 'light' | 'dark'
	type Type = 'image' | 'audio'
	type Size = 'normal' | 'compact' | 'invisible'
	type Badge = 'bottomright' | 'bottomleft' | 'inline' | 'none'

	interface Parameters {
		/**
		 * Your sitekey. Attribute: data-sitekey.
		 */
		sitekey: string
		/**
		 * Optional. The type of CAPTCHA to serve. Attribute: data-type.
		 * Accepted values: "audio", "image"
		 * @default "image"
		 */
		type?: Type
		/**
		 * Optional. The color theme of the widget.
		 * Attribute: data-theme.
		 * Accepted values: "light", "dark"
		 * @default "light"
		 */
		theme?: Theme
		/**
		 * Optional. The size of the widget.
		 * Attribute: data-size.
		 * Accepted values: "compact", "normal", "invisible".
		 * if bind is provided defaults to "invisible". Otherwise "normal"
		 */
		size?: Size
		/**
		 * Optional. The tabindex of the widget and challenge.
		 * Attribute: data-tabindex.
		 * If other elements in your page use tabindex, it should be set to make user navigation easier.
		 * @default 0
		 */
		tabindex?: number
		/**
		 * Optional. Specify either the ID of the container (string) or the DOM element itself if you
		 * want to trigger validation of this reCAPTCHA instance by button click or input events.
		 * By default if reCAPTCHA is rendered in a button or input with type submit/button then bind is set to an element
		 * where reCAPTCHA is rendered.
		 * Attribute: data-bind.
		 */
		bind?: string | HTMLElement
		/**
		 * Optional. The badge location for g-recaptcha with size of "invisible".
		 * If isolated this value is ignored and "none" is used instead.
		 * Accepted values: "none", "inline", "bottomright", "bottomleft"
		 * Attribute: data-badge.
		 * @default "bottomright"
		 */
		badge?: Badge
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
		// /**
		//  * Optional secure token.
		//  * Attribute: data-stoken.
		//  * @deprecated
		//  */
		// stoken?: any
		// /**
		//  * Optional.
		//  * Attribute: data-s.
		//  * @deprecated
		//  */
		// s?: any
		// /**
		//  * Optional.
		//  * Attribute: data-pool.
		//  * @deprecated
		//  */
		// pool?: any
		// /**
		//  * Optional.
		//  * Attribute: data-action.
		//  * @deprecated
		//  */
		// action?: any
		// /**
		//  * Optional.
		//  * Attribute: data-content-binding.
		//  */
		// 'content-binding'?: any
		// /**
		//  * Optional.
		//  * Has no corresponding attribute.
		//  * @deprecated
		//  */
		// origin?: any
		// /**
		//  * Optional.
		//  * @deprecated
		//  */
		// version?: string
		// /**
		//  * Optional preload(probably challenge).
		//  * Defaults to true if recaptcha is invisible.
		//  * Attribute: data-preload
		//  * @deprecated
		//  */
		// preload?: boolean
	}
}
