import { NgModule } from '@angular/core'

import { RecaptchaDirective } from './recaptcha.directive'

const DIRECTIVES = [
  RecaptchaDirective
]

/**
 * An NgModule that exports and declares RecaptchaDirective.
 */
@NgModule({
  exports: [
    ...DIRECTIVES
  ],
  declarations: [
    ...DIRECTIVES
  ]
})
export class RecaptchaDirectiveModule { }
