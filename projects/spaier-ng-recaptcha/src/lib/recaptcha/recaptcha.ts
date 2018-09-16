import { RecaptchaParameters } from './recaptcha-parameters'
import { RecaptchaExecuteParameters } from './recaptcha-execute-parameters'

/**
 * grecaptcha interface.
 */
export interface Recaptcha {
  /**
   * V2: Renders the container as a reCAPTCHA widget.
   * V3: Renders a V3 reCAPTCHA.
   * Returns the ID of the newly created widget.
   * @param containerOrParameters
   * V2: The HTML element to render the reCAPTCHA widget. Specify either the ID of the container (string) or the DOM element itself.
   * V3: reCAPTCHA parameters.
   * @param parameters reCAPTCHA parameters.
   * @param inherit V2: whether html data-* attributes of container should be used.
   */
  render(containerOrParameters?: string | HTMLElement | RecaptchaParameters,
    parameters?: RecaptchaParameters,
    inherit?: boolean
  ): number
  /**
   * Resets the reCAPTCHA widget.
   * @param widgetId Optional widget ID, defaults to the first widget created if unspecified.
   * @param parameters Parameters.
   */
  reset(widgetId?: number, parameters?: RecaptchaParameters): void
  /**
   * Executes reCAPTCHA and returns promise of response.
   * @param widgetIdOrSitekey
   * V2: Optional widget ID, defaults to the first widget created if unspecified.
   * V3: Sitekey.
   * @param parameters reCAPTCHA parameters.
   */
  execute(widgetIdOrSitekey?: number | string, parameters?: RecaptchaExecuteParameters): Promise<string>
  /**
   * Gets the response for the reCAPTCHA widget.
   * @param widgetId Optional widget ID, defaults to the first widget created if unspecified.
   */
  getResponse(widgetId?: number): string
  /**
   * Runs function when the reCAPTCHA library is loaded.
   * @param handler fuinction to execute.
   */
  ready(handler?: () => void)
}
