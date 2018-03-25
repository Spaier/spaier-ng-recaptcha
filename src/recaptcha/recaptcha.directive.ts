import {
	Directive, ElementRef, EventEmitter,
	Input, NgZone, OnChanges, OnInit, OnDestroy, Optional, Output, SimpleChanges,
	forwardRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { Subscription } from 'rxjs/Subscription'

import { RecaptchaConfig } from './recaptcha.config'
import { RecaptchaLoaderService } from '../loader/recaptcha-loader.service'

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

	@Input() type: string

	@Input() theme: ReCaptchaV2.Theme

	@Input() size: ReCaptchaV2.Size

	@Input() tabIndex: number

	@Input() bind: string | HTMLElement

	@Input() badge: string

	@Input() preload: boolean

	@Input() stoken: any

	@Input() s: any

	@Input() pool: any

	@Input() action: any

	@Input() contentBinding: any

	@Input() isolated: boolean

	@Input() origin: any

	@Input() hl: string

	@Input() version: string

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
		if (this.config) {
			if (!this.v2Key) { this.v2Key = this.config.v2Key }
			if (!this.invisibleKey) { this.invisibleKey = this.config.invisibleKey }
			if (!this.type) { this.type = this.config.type }
			if (!this.theme) { this.theme = this.config.theme }
			if (!this.size) { this.size = this.config.size }
			if (!this.tabIndex) { this.tabIndex = this.config.tabindex }
			if (!this.badge) { this.badge = this.config.badge }
			if (!this.preload) { this.preload = this.config.preload }
			if (!this.stoken) { this.stoken = this.config.stoken }
			if (!this.s) { this.s = this.config.s }
			if (!this.action) { this.action = this.config.action }
			if (!this.contentBinding) { this.contentBinding = this.config['content-binding'] }
			if (!this.pool) { this.pool = this.config.pool }
			if (!this.isolated) { this.isolated = this.config.isolated }
			if (!this.origin) { this.origin = this.config.origin }
			if (!this.hl) { this.hl = this.config.hl }
			if (!this.version) { this.version = this.config.version }
		}
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
		console.log(this.grecaptcha)
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
		return {
			sitekey: this.size === 'invisible' ? this.invisibleKey : this.v2Key,
			type: this.type,
			theme: this.theme,
			size: this.size,
			tabindex: this.tabIndex,
			bind: this.bind,
			badge: this.badge,
			preload: this.preload,
			callback: (response: string) => {
				this.zone.run(() => this.onCallback(response))
			},
			'expired-callback': () => {
				this.zone.run(() => this.onExpired())
			},
			'error-callback': () => {
				this.zone.run(() => this.onError())
			},
			stoken: this.stoken,
			s: this.s,
			pool: this.pool,
			action: this.action,
			'content-binding': this.contentBinding,
			isolated: this.isolated,
			origin: this.origin,
			hl: this.hl,
			version: this.version
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
