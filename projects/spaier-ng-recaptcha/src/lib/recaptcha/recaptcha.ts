import { RecaptchaParameters } from './recaptcha-parameters'
import { RecaptchaExecuteParameters } from './recaptcha-execute-parameters'

/**
 * grecaptcha interface.
 */
export interface Recaptcha {
  /**
   * Renders the container as a reCAPTCHA widget.
   * If parameters are specified instead of a container renders an invisible isolated reCAPTCHA.
   * Returns the ID of the newly created widget.
   * @param containerOrParameters
   * V2: The HTML element to render the reCAPTCHA widget. Specify either the ID of the container (string) or the DOM element itself.
   * V3: reCAPTCHA parameters.
   * @param parameters reCAPTCHA parameters.
   * @param inherit V2: whether html data-* attributes of container should be used.
   */
  render(containerOrParameters?: string | HTMLElement | Partial<RecaptchaParameters>,
    parameters?: Partial<RecaptchaParameters>,
    inherit?: boolean
  ): number
  /**
   * Resets the reCAPTCHA widget.
   * @param widgetId Optional widget ID, defaults to the first widget created if unspecified.
   * @param parameters Parameters.
   */
  reset(widgetId?: number, parameters?: Partial<RecaptchaParameters>): void
  /**
   * Executes reCAPTCHA and returns promise of response.
   * @param widgetIdOrSitekeyOrParameters
   * Optional widget ID that defaults to the first widget created if unspecified.
   * or sitekey or reCAPTCHA execute parameters.
   * @param parameters reCAPTCHA execute parameters.
   */
  execute(widgetIdOrSitekeyOrParameters?: number | string | RecaptchaExecuteParameters,
    parameters?: RecaptchaExecuteParameters): Promise<string>
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
