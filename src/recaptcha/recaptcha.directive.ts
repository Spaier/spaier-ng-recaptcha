import {
	Directive, ElementRef, EventEmitter,
	Input, NgZone, OnChanges, OnInit, OnDestroy, Optional, Output, SimpleChanges,
	forwardRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { Subscription } from 'rxjs/Subscription'

import { RecaptchaBadge } from './recaptcha-badge'
import { RecaptchaConfig } from './recaptcha.config'
import { RecaptchaType } from './recaptcha-type'
import { RecaptchaTheme } from './recaptcha-theme'

import { RecaptchaLoaderService } from '../loader/recaptcha-loader.service'
import { RecaptchaParameters } from './recaptcha-parameters'
import { RecaptchaSize } from './recaptcha-size'

@Directive({
	selector: '[rcpRecaptcha]',
	exportAs: 'rcpRecaptcha',
	providers: [{
		multi: true,
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => RecaptchaDirective)
	}]
})
export class RecaptchaDirective implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {

	@Input() invisibleKey: string

	@Input() v2Key: string

	@Input() type: RecaptchaType

	@Input() theme: RecaptchaTheme

	@Input() size: RecaptchaSize

	@Input() tabIndex: number

	@Input() badge: RecaptchaBadge

	@Input() isolated: boolean

	@Input() hl: string

	@Output() recaptchaOnResolved = new EventEmitter<string>()

	@Output() recaptchaOnExpired = new EventEmitter<void>()

	@Output() recaptchaOnError = new EventEmitter<void>()

	private widgetId: number

	private grecaptcha

	private subscription: Subscription

	private onChange: (value: string) => void

	private onTouched: () => void

	constructor(private readonly loader: RecaptchaLoaderService, private readonly el: ElementRef,
		private readonly zone: NgZone, @Optional() public config: RecaptchaConfig) { }

	// Lifecycle hooks

	ngOnInit() {
		this.subscription = this.loader.recaptcha.subscribe(recaptcha => {
			this.grecaptcha = recaptcha
			this.render()
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.reset(true)
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}

	// Forms implementation

	writeValue(value: string): void {
		if (!value) {
			this.reset()
		}
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn
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
	 * Returns stored value.
	 */
	getResponse(): string {
		return this.grecaptcha ? this.grecaptcha.getResponse(this.widgetId) : ''
	}

	/**
	 * Executes invisible recaptcha.
	 */
	execute(): void {
		this.grecaptcha && this.grecaptcha.execute(this.widgetId)
	}

	/**
	 * Resets recaptcha.
	 * @param rerender if true, rerenders recaptcha.
	 */
	reset(rerender?: boolean): void {
		this.grecaptcha && this.zone.runOutsideAngular(
			() => this.grecaptcha.reset(this.widgetId, rerender ? this.getParameters() : undefined)
		)
	}

	private getParameters() {
		let configuration: RecaptchaParameters
		let sitekey: string
		if (this.size === 'invisible') {
			configuration = this.config.invisibleConfig
			sitekey = this.invisibleKey
		} else {
			configuration = this.config.v2Config
			sitekey = this.v2Key
		}
		return {
			sitekey: sitekey || configuration.sitekey,
			type: this.type || configuration.type,
			theme: this.theme || configuration.theme,
			badge: this.badge || configuration.badge,
			isolated: this.isolated || configuration.isolated,
			hl: this.hl || configuration.hl,
			size: this.size,
			tabindex: this.tabIndex,
			callback: (response: string) => {
				this.zone.run(() => this.onCallback(response))
			},
			'expired-callback': () => {
				this.zone.run(() => this.onExpired())
			},
			'error-callback': () => {
				this.zone.run(() => this.onError())
			}
		}
	}

	// Events

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
