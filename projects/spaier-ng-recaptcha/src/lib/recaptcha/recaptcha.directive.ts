import {
  Attribute, Directive, ElementRef, EventEmitter,
  Input, NgZone, OnChanges, OnDestroy, OnInit, Output,
  SimpleChanges
} from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { RecaptchaService } from './loader/recaptcha.service'
import { RecaptchaBadge } from './recaptcha-badge'
import { RecaptchaSize } from './recaptcha-size'
import { RecaptchaTheme } from './recaptcha-theme'
import { RecaptchaType } from './recaptcha-type'
import { Recaptcha } from './recaptcha'
import { RecaptchaParameters } from './recaptcha-parameters'
import {
  actionName,
  badgeName,
  bindName,
  callbackName,
  contentBindingName,
  errorCallbackName,
  expiredCallbackName,
  getAttributeName,
  hlName,
  isolatedName,
  poolName,
  preloadName,
  sitekeyName,
  sizeName,
  sName,
  stokenName,
  tabIndexName,
  themeName,
  typeName,
} from './recaptcha-parameter-names'
import { RecaptchaExecuteParameters } from './recaptcha-execute-parameters'

/**
 * A directive that renders a recaptcha widget in a host element.
 */
@Directive({
  selector: '[rcpRecaptcha]',
  exportAs: 'rcpRecaptcha',
})
export class RecaptchaDirective implements OnChanges, OnDestroy, OnInit {

  onChange: (value: string) => void

  onTouched: () => void

  private widgetId: number

  private grecaptcha: Recaptcha

  private subscription: Subscription

  /**
   * Your sitekey.
   * Attribute: data-sitekey.
   */
  @Input(getAttributeName(sitekeyName))
  sitekey: string
  /**
   * An initial problem to solve.
   * Attribute: data-type.
   */
  @Input(getAttributeName(typeName))
  type?: RecaptchaType | string
  /**
   * The color theme of the widget.
   * Attribute: data-theme.
   */
  @Input(getAttributeName(themeName))
  theme?: RecaptchaTheme | string
  /**
   * Size of the reCAPTCHA.
   * Attribute: data-size.
   */
  @Input(getAttributeName(sizeName))
  size?: RecaptchaSize | string
  /**
   * Tab index.
   * Attribute: data-tabindex.
   */
  @Input(getAttributeName(tabIndexName))
  tabindex?: number
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-stoken.
   */
  @Input(getAttributeName(stokenName))
  stoken?: string
  /**
   * @deprecated
   * Don't touch it.
   * Binds reCAPTCHA execution to html element by reference or id.
   * Attribute: data-bind.
   */
  @Input(getAttributeName(bindName))
  bind?: string | HTMLElement
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-preload.
   */
  @Input(getAttributeName(preloadName))
  preload?: boolean
  /**
   * The badge location for g-recaptcha with size of "invisible".
   * If isolated this value is ignored.
   * Attribute: data-badge.
   */
  @Input(getAttributeName(badgeName))
  badge?: RecaptchaBadge | string
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-s.
   */
  @Input(getAttributeName(sName))
  s?: string
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-pool.
   */
  @Input(getAttributeName(poolName))
  pool?: string
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-content-binding.
   */
  @Input(getAttributeName(contentBindingName))
  contentBinding: string
  /**
   * Specifies V3 recaptcha's action parameter.
   * Attribute: data-action.
   */
  @Input(getAttributeName(actionName))
  action?: string
  /**
   * Optional. Your callback function that's executed when the user submits a successful CAPTCHA response.
   * Attribute: data-callback.
   * The user's response, g-recaptcha-response, will be the input for your callback function.
   * A function or a name of the function from the window object (window[this.callback]).
   */
  @Input(getAttributeName(callbackName))
  @Output(getAttributeName(callbackName))
  callback?: EventEmitter<string> = new EventEmitter<string>()
  /**
   * Optional. Your callback function that's executed when the recaptcha response expires and the user needs to solve a new CAPTCHA.
   * A function or a name of the function from the window object (window[this["expired-callback"]]).
   * Attribute: data-expired-callback.
   */
  @Input(getAttributeName(expiredCallbackName))
  @Output(getAttributeName(expiredCallbackName))
  expiredCallback?: EventEmitter<void> = new EventEmitter<void>()
  /**
   * Optional. Your callback function that's executed when reCAPTCHA encounters an error (usually network connectivity)
   * and cannot continue until connectivity is restored.
   * A function or a name of the function from the window object (window[this["error-callback"]]).
   * Attribute: data-error-callback.
   */
  @Input(getAttributeName(errorCallbackName))
  @Output(getAttributeName(errorCallbackName))
  errorCallback?: EventEmitter<void> = new EventEmitter<void>()
  /**
   * Optional.
   * If true, this reCAPTCHA instance will be part of a separate ID space and badge value will be set to "none".
   * Id starts with 1E5 instead of 0.
   * Has no corresponding attribute.
   */
  @Input(getAttributeName(isolatedName))
  isolated?: boolean
  /**
   * Optional. Defaults to language specified in script(hl query parameter) or browser language.
   * Has no corresponding attribute.
   * Accepted values: https://developers.google.com/recaptcha/docs/language.
   */
  @Input(getAttributeName(hlName))
  public hl?: string

  constructor(
    private readonly loader: RecaptchaService,
    private readonly zone: NgZone,
    private readonly el: ElementRef,
    @Attribute(getAttributeName(sitekeyName)) sitekey?: string,
    @Attribute(getAttributeName(typeName)) type?: RecaptchaType | string,
    @Attribute(getAttributeName(themeName)) theme?: RecaptchaTheme | string,
    @Attribute(getAttributeName(sizeName)) size?: RecaptchaSize | string,
    @Attribute(getAttributeName(tabIndexName)) tabIndex?: number,
    @Attribute(getAttributeName(stokenName)) stoken?: string,
    @Attribute(getAttributeName(bindName)) bind?: string,
    @Attribute(getAttributeName(preloadName)) preload?: boolean,
    @Attribute(getAttributeName(badgeName)) badge?: RecaptchaBadge | string,
    @Attribute(getAttributeName(sName)) s?: string,
    @Attribute(getAttributeName(poolName)) pool?: string,
    @Attribute(getAttributeName(contentBindingName)) contentBinding?: string,
    @Attribute(getAttributeName(actionName)) action?: string,
    @Attribute(getAttributeName(isolatedName)) isolated?: boolean,
    @Attribute(getAttributeName(hlName)) hl?: string,
  ) {
    if (sitekey) this.sitekey = sitekey
    if (type) this.type = type
    if (theme) this.theme = theme
    if (size) this.size = size
    if (tabIndex) this.tabindex = tabIndex
    if (stoken) this.stoken = stoken
    if (bind) this.bind = bind
    if (preload) this.preload = preload
    if (badge) this.badge = badge
    if (s) this.s = s
    if (pool) this.pool = pool
    if (contentBinding) this.contentBinding = contentBinding
    if (action) this.action = action
    if (isolated) this.isolated = isolated
    if (hl) this.hl = hl
  }

  // Lifecycle hooks

  ngOnInit(): void {
    this.subscription = this.loader.recaptcha$.subscribe(recaptcha => {
      this.grecaptcha = recaptcha
      this.render()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        const element = changes[key]
        if (element.currentValue !== element.previousValue) {
          this.reset()
          break
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  // grecaptcha methods

  /**
   * Renders recaptcha.
   */
  private render() {
    if (this.grecaptcha) {
      this.widgetId = this.grecaptcha.render(this.el.nativeElement, this.getParameters(), true)
    }
  }

  /**
   * Returns the stored value.
   */
  getResponse(): string {
    return this.grecaptcha ? this.grecaptcha.getResponse(this.widgetId) : ''
  }

  /**
   * Executes the recaptcha. Returns promise of a response for a V3 reCAPTCHA.
   */
  async execute(parameters: RecaptchaExecuteParameters = { action: this.action }): Promise<string> {
    if (this.grecaptcha) {
      return this.grecaptcha.execute(this.widgetId, parameters)
    }
  }

  /**
   * Resets and rerenders the reCAPTCHA widget.
   */
  reset(): void {
    if (this.grecaptcha) {
      this.zone.runOutsideAngular(
        () => this.grecaptcha.reset(this.widgetId, this.getParameters())
      )
    }
  }

  private getParameters() {
    const params: Partial<RecaptchaParameters> = {}
    const assign = (propName: string, value) => {
      if (value) params[propName] = value
    }
    assign(sitekeyName, this.sitekey)
    assign(contentBindingName, this.contentBinding)
    assign(actionName, this.action)
    assign(badgeName, this.badge)
    assign(bindName, this.bind)
    assign(hlName, this.hl)
    assign(isolatedName, this.isolated)
    assign(poolName, this.pool)
    assign(preloadName, this.preload)
    assign(sName, this.s)
    assign(sizeName, this.size)
    assign(stokenName, this.stoken)
    assign(tabIndexName, this.tabindex)
    assign(themeName, this.theme)
    assign(typeName, this.type)
    params[callbackName] = (response: string) => {
      this.zone.run(() => {
        this.onCallback(response)
      })
    }
    params[expiredCallbackName] = () => {
      this.zone.run(() => {
        this.onExpired()
      })
    }
    params[errorCallbackName] = () => {
      this.zone.run(() => {
        this.onError()
      })
    }
    return params
  }

  private onCallback(response: string): void {
    this.triggerEvents(response)
    const emitter = this.callback as EventEmitter<string>
    if (emitter) emitter.emit(response)
  }

  private onExpired(): void {
    this.triggerEvents(null)
    const emitter = this.expiredCallback as EventEmitter<void>
    if (emitter) emitter.emit()
  }

  private onError(): void {
    this.triggerEvents(null)
    const emitter = this.errorCallback as EventEmitter<void>
    if (emitter) emitter.emit()
  }

  private triggerEvents(value: string): void {
    if (this.onChange) {
      this.onChange(value)
    }
    if (this.onTouched) {
      this.onTouched()
    }
  }
}
