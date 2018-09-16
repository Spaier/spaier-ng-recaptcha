import { NgModule } from '@angular/core'

import { RecaptchaValueAccessorDirective } from './recaptcha-value-accessor.directive'

const DIRECTIVES = [
  RecaptchaValueAccessorDirective
]

/**
 * An NgModule that enables angular forms for reCAPTCHA.
 */
@NgModule({
  exports: [
    ...DIRECTIVES
  ],
  declarations: [
    ...DIRECTIVES
  ]
})
export class RecaptchaFormsModule { }
