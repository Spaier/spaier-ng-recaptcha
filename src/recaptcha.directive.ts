import {
	AfterViewInit, Directive, HostListener, ElementRef, EventEmitter,
	Input, NgZone, OnDestroy, Optional, Output, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { RecaptchaConfig } from './recaptcha.config';
import { RecaptchaLoaderService } from './loader/recaptcha-loader.service';

@Directive({
	selector: '[appRecaptcha]',
	exportAs: 'appRecaptcha',
	providers: [{
		multi: true,
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => RecaptchaDirective)
	}]
})
export class RecaptchaDirective implements ControlValueAccessor, AfterViewInit, OnDestroy {

	@Input() badge: ReCaptchaV2.Badge

	@Input() siteKey: string

	@Input() size: ReCaptchaV2.Size

	@Input() type: ReCaptchaV2.Type

	@Input() theme: ReCaptchaV2.Theme

	@Input() tabIndex: number

	@Output() recaptchaOnResolved = new EventEmitter<string>()

	@Output() recaptchaOnExpired = new EventEmitter<void>()

	@Output() recaptchaOnReset = new EventEmitter<void>()

	widgetId: number

	private grecaptcha: ReCaptchaV2.ReCaptcha

	private subscription: Subscription

	private onChange: (value: string) => void

	private onTouched: () => void

	constructor(private readonly loader: RecaptchaLoaderService, private readonly el: ElementRef,
		private readonly zone: NgZone, @Optional() public config: RecaptchaConfig) { }

	ngAfterViewInit(): void {
		if (this.config) {
			if (!this.tabIndex) { this.tabIndex = this.config.tabindex }
			if (!this.type) { this.type = this.config.type }
			if (!this.size) { this.size = this.config.size }
			let key: string;
			if (this.size === 'invisible') {
				key = this.config.invisibleKey
				if (!this.badge) { this.badge = this.config.badge }
			} else {
				key = this.config.v2Key
				if (!this.theme) { this.theme = this.config.theme }
			}
			if (!this.siteKey) { this.siteKey = key }
		}
		this.subscription = this.loader.recaptcha.subscribe((grecaptcha: ReCaptchaV2.ReCaptcha) => {
			if (grecaptcha) {
				this.widgetId = grecaptcha.render(this.el.nativeElement, {
					badge: this.badge,
					callback: (response: string) => {
						this.zone.run(() => this.onCallback(response));
					},
					'expired-callback': () => {
						this.zone.run(() => this.onExpired());
					},
					sitekey: this.siteKey,
					size: this.size,
					tabindex: this.tabIndex,
					theme: this.theme,
					type: this.type
				})
			}
		})
	}

	/**
	 * Resets recaptcha and
	 */
	ngOnDestroy(): void {
		this.reset()
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}

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

	/**
	 *
	 */
	getResponse(): string {
		if (this.widgetId) {
			return this.grecaptcha.getResponse(this.widgetId)
		}
	}

	/**
	 * Executes invisible recaptcha.
	 */
	execute(): void {
		if (this.size === 'invisible' && this.widgetId) {
			this.grecaptcha.execute(this.widgetId)
		}
	}

	/**
	 * Resets recaptcha.
	 */
	reset(): void {
		if (this.widgetId && this.grecaptcha) {
			if (this.grecaptcha.getResponse(this.widgetId)) {
				this.onReset()
			}
			this.zone.runOutsideAngular(() => grecaptcha.reset(this.widgetId));
		}
	}

	public onCallback(response: string): void {
		this.triggerEvents(response)
		this.recaptchaOnResolved.emit(response)
	}

	public onExpired(): void {
		this.triggerEvents(null)
		this.recaptchaOnExpired.emit()
	}

	public onReset(): void {
		this.triggerEvents(null)
		this.recaptchaOnReset.emit()
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
