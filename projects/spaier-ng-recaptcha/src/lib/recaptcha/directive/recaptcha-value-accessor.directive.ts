import {
  Directive, forwardRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { RecaptchaDirective } from './recaptcha.directive'

/**
 * A directive that enables angular forms for reCAPTCHA.
 */
@Directive({
  selector: '[rcpRecaptcha][formControlName],[rcpRecaptcha][formControl],[rcpRecaptcha][ngModel]',
  exportAs: 'rcpRecaptchaValueAccessor',
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RecaptchaValueAccessorDirective)
  }]
})
export class RecaptchaValueAccessorDirective implements ControlValueAccessor {

  constructor(private readonly recaptchaDirective: RecaptchaDirective) { }

  writeValue(value: string): void {
    this.recaptchaDirective.reset()
  }

  registerOnChange(fn: (value: string) => void): void {
    this.recaptchaDirective.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.recaptchaDirective.onTouched = fn
  }
}
