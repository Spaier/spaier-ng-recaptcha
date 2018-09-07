import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'

import { RECAPTCHA_IMPLICIT } from './recaptcha-implicit.token'
import { RECAPTCHA_LANGUAGE } from './recaptcha-language.token'
import { RecaptchaLoaderService } from './recaptcha-loader.service'
import { RECAPTCHA_URL } from './recaptcha-url.token'
import { RECAPTCHA_ONLOAD } from './recaptcha-onload.token'

/**
 * Module for loading recaptcha.
 */
@NgModule({
  providers: [RecaptchaLoaderService]
})
export class RecaptchaLoaderModule {
  /**
   * Prevents module from being imported twice.
   * @param parentModule Another instance of this module.
   */
  constructor(@Optional() @SkipSelf() parentModule: RecaptchaLoaderModule) {
    if (parentModule) {
      throw new Error(
        'RecaptchaLoaderModule is already loaded. Import it only in the CoreModule or AppModule.')
    }
  }
  /**
   * Injects module and sets default recaptcha language.
   * @param language Script's default language. https://developers.google.com/recaptcha/docs/language.
   * @param explicit If set to true, enables rendering with g-recaptcha class.
   * @param url Script's url.
   * @param onload Window's onload event name.
   */
  public static withParameters(language?: string, implicit?: boolean, url?: string, onload?: string): ModuleWithProviders {
    return {
      ngModule: RecaptchaLoaderModule, providers: [
        { provide: RECAPTCHA_LANGUAGE, useValue: language },
        { provide: RECAPTCHA_IMPLICIT, useValue: implicit },
        { provide: RECAPTCHA_URL, useValue: url },
        { provide: RECAPTCHA_ONLOAD, useValue: onload },
      ]
    }
  }
}
