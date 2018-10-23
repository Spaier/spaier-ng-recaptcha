import { RecaptchaParameters } from './recaptcha-parameters'
import { RecaptchaExecuteParameters } from './recaptcha-execute-parameters'

/**
 * grecaptcha interface.
 */
export interface Recaptcha {
  /**
   * Renders the container as a reCAPTCHA widget and returns the ID of the newly created widget.
   * @param container The HTML element to render the reCAPTCHA widget.
   * Specify either the ID of the container (string) or the DOM element itself.
   * @param parameters reCAPTCHA parameters.
   * @param inherit whether html data-* attributes of container should be used.
   */
  render(container?: string | HTMLElement,
    parameters?: Partial<RecaptchaParameters>,
    inherit?: boolean
  ): number
  /**
   * Renders an invisible isolated reCAPTCHA.
   * Returns the ID of the newly created widget.
   * @param parameters reCAPTCHA parameters.
   */
  render(parameters?: Partial<RecaptchaParameters>): number
  /**
   * Resets the reCAPTCHA widget.
   * @param widgetId Optional widget ID, defaults to the first widget created if unspecified.
   * @param parameters Parameters.
   */
  reset(widgetId?: number, parameters?: Partial<RecaptchaParameters>): void
  /**
   * Executes reCAPTCHA and returns promise of response.
   * @param widgetId Optional widget ID that defaults to the first widget created if unspecified.
   * @param parameters reCAPTCHA execute parameters.
   */
  execute(widgetId?: number, parameters?: RecaptchaExecuteParameters): Promise<string>
  /**
   * Executes reCAPTCHA and returns promise of response.
   * @param sitekey sitekey.
   * @param parameters reCAPTCHA execute parameters.
   */
  execute(sitekey: string, parameters?: RecaptchaExecuteParameters): Promise<string>
  /**
   * Executes reCAPTCHA and returns promise of response.
   * @param parameters reCAPTCHA execute parameters.
   */
  execute(parameters: RecaptchaExecuteParameters): Promise<string>
  /**
   * Gets the response for the reCAPTCHA widget.
   * @param widgetId Optional widget ID, defaults to the first widget created if unspecified.
   */
  getResponse(widgetId?: number): string
  /**
   * Runs function when the reCAPTCHA library is loaded.
   * @param handler fuinction to execute.
   */
  ready(handler?: () => void): void
}
