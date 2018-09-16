import {
  Directive, ElementRef, EventEmitter,
  Input, NgZone, OnChanges, OnInit, OnDestroy, Output, SimpleChanges,
} from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { RecaptchaService } from './loader/recaptcha.service'
import { RecaptchaParameters } from './recaptcha-parameters'
import { Recaptcha } from './recaptcha'
import { RecaptchaExecuteParameters } from './recaptcha-execute-parameters'

/**
 * A directive that renders a recaptcha widget in a host element.
 */
@Directive({
  selector: '[rcpRecaptcha]',
  exportAs: 'rcpRecaptcha'
})
export class RecaptchaDirective implements OnChanges, OnInit, OnDestroy {

  @Input() parameters?: RecaptchaParameters

  @Output() recaptchaOnResolved = new EventEmitter<string>()

  @Output() recaptchaOnExpired = new EventEmitter<void>()

  @Output() recaptchaOnError = new EventEmitter<void>()

  public onChange: (value: string) => void

  public onTouched: () => void

  private widgetId: number

  private grecaptcha: Recaptcha

  private subscription: Subscription

  constructor(
    private readonly loader: RecaptchaService,
    private readonly el: ElementRef,
    private readonly zone: NgZone
  ) { }

  // Lifecycle hooks

  ngOnInit() {
    this.subscription = this.loader.recaptcha.subscribe(recaptcha => {
      this.grecaptcha = recaptcha
      this.render()
    })
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.reset()
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
      this.widgetId = this.grecaptcha.render(this.el.nativeElement, this.getParameters())
    }
  }

  /**
   * Returns the stored value.
   */
  getResponse(): string {
    return this.grecaptcha ? this.grecaptcha.getResponse(this.widgetId) : ''
  }

  /**
   * Executes the recaptcha.
   */
  async execute(parameters: RecaptchaExecuteParameters = { action: this.parameters.action }): Promise<string> {
    if (this.grecaptcha) {
      return this.grecaptcha.execute(this.widgetId, parameters)
    }
  }

  /**
   * Resets the recaptcha.
   * @param rerender if true, rerenders recaptcha.
   */
  reset(): void {
    if (this.grecaptcha) {
      this.zone.runOutsideAngular(
        () => this.grecaptcha.reset(this.widgetId, this.getParameters())
      )
    }
  }

  private getParameters() {
    const params = this.parameters
    params.callback = (response: string) => {
      this.zone.run(() => {
        this.onCallback(response)
        if (this.parameters.callback) this.parameters.callback(response)
      })
    }
    params['expired-callback'] = () => {
      this.zone.run(() => {
        this.onExpired()
        if (this.parameters['expired-callback']) this.parameters['expired-callback']()
      })
    }
    params['error-callback'] = () => {
      this.zone.run(() => {
        this.onError()
        if (this.parameters['error-callback']) this.parameters['error-callback']()
      })
    }
    return params
  }

  private onCallback(response: string): void {
    this.triggerEvents(response)
    this.recaptchaOnResolved.emit(response)
  }

  private onExpired(): void {
    this.triggerEvents(null)
    this.recaptchaOnExpired.emit()
  }

  private onError(): void {
    this.triggerEvents(null)
    this.recaptchaOnError.emit()
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
