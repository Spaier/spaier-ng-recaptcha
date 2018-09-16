import { RecaptchaBadge } from './recaptcha-badge'
import { RecaptchaType } from './recaptcha-type'
import { RecaptchaTheme } from './recaptcha-theme'
import { RecaptchaSize } from './recaptcha-size'

export interface RecaptchaParameters {
  /**
   * Your sitekey.
   * Attribute: data-sitekey.
   */
  sitekey: string
  /**
   * An initial problem to solve.
   * Attribute: data-type.
   */
  type?: RecaptchaType
  /**
   * The color theme of the widget.
   * Attribute: data-theme.
   */
  theme?: RecaptchaTheme
  /**
   * Size of the reCAPTCHA.
   * Attribute: data-size.
   */
  size?: RecaptchaSize
  /**
   * Tab index.
   * Attribute: data-tabindex.
   */
  tabindex?: number
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-stoken.
   */
  stoken?: string
  /**
   * Don't touch it.
   * Binds reCAPTCHA execution to html element by reference or id.
   * Attribute: data-bind.
   */
  bind?: string | HTMLElement
  /**
   * Don't touch it.
   * Attribute: data-preload.
   */
  preload?: boolean
  /**
   * The badge location for g-recaptcha with size of "invisible".
   * If isolated this value is ignored.
   * Attribute: data-badge.
   */
  badge?: RecaptchaBadge
  /**
   * Don't touch it.
   * Attribute: data-s.
   */
  s?: string
  /**
   * Don't touch it.
   * Attribute: data-pool.
   */
  pool?: string
  /**
   * Don't touch it.
   * Attribute: data-content-binding.
   */
  'content-binding'?: string
  /**
   * Specifies V3 recaptcha's action parameter.
   * Attribute: data-action.
   */
  action?: string
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
  /**
   * Don't touch it.
   */
  origin?: string
  /**
   * Don't touch it.
   */
  version?: string
  /**
   * Optional.
   * If true, this reCAPTCHA instance will be part of a separate ID space and badge value will be set to "none".
   * Id starts with 1E5 instead of 0.
   * Has no corresponding attribute.
   */
  isolated?: boolean
  /**
   * Optional. Defaults to language specified in script(hl query parameter) or browser language.
   * Has no corresponding attribute.
   * Accepted values: https://developers.google.com/recaptcha/docs/language.
   */
  hl?: string
}
