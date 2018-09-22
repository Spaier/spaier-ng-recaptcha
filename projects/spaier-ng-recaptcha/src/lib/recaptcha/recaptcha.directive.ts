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

  public onChange: (value: string) => void

  public onTouched: () => void

  private widgetId: number

  private grecaptcha: Recaptcha

  private subscription: Subscription

  /**
   * Your sitekey.
   * Attribute: data-sitekey.
   */
  @Input(getAttributeName(sitekeyName))
  public [sitekeyName]?: string
  /**
   * An initial problem to solve.
   * Attribute: data-type.
   */
  @Input(getAttributeName(typeName))
  public [typeName]?: RecaptchaType | string
  /**
   * The color theme of the widget.
   * Attribute: data-theme.
   */
  @Input(getAttributeName(themeName))
  public [themeName]?: RecaptchaTheme | string
  /**
   * Size of the reCAPTCHA.
   * Attribute: data-size.
   */
  @Input(getAttributeName(sizeName))
  public [sizeName]?: RecaptchaSize | string
  /**
   * Tab index.
   * Attribute: data-tabindex.
   */
  @Input(getAttributeName(tabIndexName))
  public [tabIndexName]?: number
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-stoken.
   */
  @Input(getAttributeName(stokenName))
  public [stokenName]?: string
  /**
   * @deprecated
   * Don't touch it.
   * Binds reCAPTCHA execution to html element by reference or id.
   * Attribute: data-bind.
   */
  @Input(getAttributeName(bindName))
  public [bindName]?: string | HTMLElement
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-preload.
   */
  @Input(getAttributeName(preloadName))
  public [preloadName]?: boolean
  /**
   * The badge location for g-recaptcha with size of "invisible".
   * If isolated this value is ignored.
   * Attribute: data-badge.
   */
  @Input(getAttributeName(badgeName))
  public [badgeName]?: RecaptchaBadge | string
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-s.
   */
  @Input(getAttributeName(sName))
  public [sName]?: string
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-pool.
   */
  @Input(getAttributeName(poolName))
  public [poolName]?: string
  /**
   * @deprecated
   * Don't touch it.
   * Attribute: data-content-binding.
   */
  @Input(getAttributeName(contentBindingName))
  public [contentBindingName]?: string
  /**
   * Specifies V3 recaptcha's action parameter.
   * Attribute: data-action.
   */
  @Input(getAttributeName(actionName))
  public [actionName]?: string
  /**
   * Optional. Your callback function that's executed when the user submits a successful CAPTCHA response.
   * Attribute: data-callback.
   * The user's response, g-recaptcha-response, will be the input for your callback function.
   * A function or a name of the function from the window object (window[this.callback]).
   */
  @Input(getAttributeName(callbackName))
  @Output(getAttributeName(callbackName))
  public [callbackName]?: string | EventEmitter<string> = new EventEmitter<string>()
  /**
   * Optional. Your callback function that's executed when the recaptcha response expires and the user needs to solve a new CAPTCHA.
   * A function or a name of the function from the window object (window[this["expired-callback"]]).
   * Attribute: data-expired-callback.
   */
  @Input(getAttributeName(expiredCallbackName))
  @Output(getAttributeName(expiredCallbackName))
  public [expiredCallbackName]?: string | EventEmitter<void> = new EventEmitter<void>()
  /**
   * Optional. Your callback function that's executed when reCAPTCHA encounters an error (usually network connectivity)
   * and cannot continue until connectivity is restored.
   * A function or a name of the function from the window object (window[this["error-callback"]]).
   * Attribute: data-error-callback.
   */
  @Input(getAttributeName(errorCallbackName))
  @Output(getAttributeName(errorCallbackName))
  public [errorCallbackName]?: string | EventEmitter<void> = new EventEmitter<void>()
  /**
   * Optional.
   * If true, this reCAPTCHA instance will be part of a separate ID space and badge value will be set to "none".
   * Id starts with 1E5 instead of 0.
   * Has no corresponding attribute.
   */
  @Input(getAttributeName(isolatedName))
  public [isolatedName]?: boolean
  /**
   * Optional. Defaults to language specified in script(hl query parameter) or browser language.
   * Has no corresponding attribute.
   * Accepted values: https://developers.google.com/recaptcha/docs/language.
   */
  @Input(getAttributeName(hlName))
  public [hlName]?: string

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
    @Attribute(getAttributeName(bindName)) bind?: string | HTMLElement,
    @Attribute(getAttributeName(preloadName)) preload?: boolean,
    @Attribute(getAttributeName(badgeName)) badge?: RecaptchaBadge | string,
    @Attribute(getAttributeName(sName)) s?: string,
    @Attribute(getAttributeName(poolName)) pool?: string,
    @Attribute(getAttributeName(contentBindingName)) contentBinding?: string,
    @Attribute(getAttributeName(actionName)) action?: string,
    @Attribute(getAttributeName(callbackName)) callback?: string,
    @Attribute(getAttributeName(expiredCallbackName)) expiredCallback?: string,
    @Attribute(getAttributeName(errorCallbackName)) errorCallback?: string,
    @Attribute(getAttributeName(isolatedName)) isolated?: boolean,
    @Attribute(getAttributeName(hlName)) hl?: string,
  ) {
    this.optionalAssign(sitekeyName, sitekey)
    this.optionalAssign(typeName, type)
    this.optionalAssign(themeName, theme)
    this.optionalAssign(sizeName, size)
    this.optionalAssign(tabIndexName, tabIndex)
    this.optionalAssign(stokenName, stoken)
    this.optionalAssign(bindName, bind)
    this.optionalAssign(preloadName, preload)
    this.optionalAssign(badgeName, badge)
    this.optionalAssign(sName, s)
    this.optionalAssign(poolName, pool)
    this.optionalAssign(contentBindingName, contentBinding)
    this.optionalAssign(actionName, action)
    this.optionalAssign(callbackName, callback)
    this.optionalAssign(expiredCallbackName, expiredCallback)
    this.optionalAssign(errorCallbackName, errorCallback)
    this.optionalAssign(isolatedName, isolated)
    this.optionalAssign(hlName, hl)
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
    const assign = (propName: string) => {
      if (this[propName]) params[propName] = this[propName]
    }
    const assignFunc = (propName: string, func) => {
      if (this[propName]) {
        params[propName] = (this[propName] instanceof EventEmitter) ? func : this[propName] as string
      }
    }
    assign(sitekeyName)
    assign(contentBindingName)
    assign(actionName)
    assign(badgeName)
    assign(bindName)
    assign(hlName)
    assign(isolatedName)
    assign(poolName)
    assign(preloadName)
    assign(sName)
    assign(sizeName)
    assign(stokenName)
    assign(tabIndexName)
    assign(themeName)
    assign(typeName)
    assignFunc(callbackName, (response: string) => {
      this.zone.run(() => {
        this.onCallback(response)
      })
    })
    assignFunc(expiredCallbackName, () => {
      this.zone.run(() => {
        this.onExpired()
      })
    })
    assignFunc(errorCallbackName, () => {
      this.zone.run(() => {
        this.onError()
      })
    })
    return params
  }

  private onCallback(response: string): void {
    this.triggerEvents(response)
    const emitter = this[callbackName] as EventEmitter<string>
    if (emitter) emitter.emit(response)
  }

  private onExpired(): void {
    this.triggerEvents(null)
    const emitter = this[expiredCallbackName] as EventEmitter<void>
    if (emitter) emitter.emit()
  }

  private onError(): void {
    this.triggerEvents(null)
    const emitter = this[errorCallbackName] as EventEmitter<void>
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

  private optionalAssign(propName: string, value) {
    if (value) this[propName] = value
  }
}
