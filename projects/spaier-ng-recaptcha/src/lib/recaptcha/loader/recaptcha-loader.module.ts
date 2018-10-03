import { ModuleWithProviders, NgModule, Optional, SkipSelf, InjectionToken } from '@angular/core'

import { getWindow } from 'ngx-dom-wrappers'

import { RecaptchaService } from './recaptcha.service'

import { RECAPTCHA_WINDOW } from './recaptcha-window.token'
import { RECAPTCHA_URL } from './recaptcha-url.token'
import { RECAPTCHA_RENDER } from './recaptcha-render.token'
import { RECAPTCHA_LANGUAGE } from './recaptcha-language.token'
import { RECAPTCHA_ONLOAD } from './recaptcha-onload.token'
import { RecaptchaOnloadService } from './recaptcha-onload.service'
import { RecaptchaRender } from './recaptcha-render'
import { RecaptchaOnloadEventName, RecaptchaGoogleUrl } from './recaptcha-loader-constants'
import { Recaptcha } from '../recaptcha'

/**
 * An NgModule for loading recaptcha.
 */
@NgModule({
  providers: [
    { provide: RECAPTCHA_WINDOW, useFactory: getWindow },
    RecaptchaService,
  ]
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
   * Create loader module with parameters.
   */
  public static withParameters(
    parameters: {
      /**
       * Language code. https://developers.google.com/recaptcha/docs/language.
       */
      language?: string,
      /**
       * GoogleRecaptchaUrl or GlobalRecaptchaUrl can be used.
       */
      recaptchaUrl?: string,
      /**
       * Render mode or sitekey.
       * Expilicit: nothing will be rendered.
       * Onload: First element with g-recaptcha class will be rendered.
       * Sitekey: invisible reCAPTCHA will be rendered with parameters = { sitekey: 'your_sitekey', isolated: true }.
       */
      render?: RecaptchaRender | string,
      /**
       * Onload handler name.
       */
      onload?: string | null,
      /**
       * Onload handler. Can be used to execute V3 reCAPTCHA.
       */
      onloadFunc?: (recaptcha: Recaptcha) => void,
    }
  ): ModuleWithProviders {
    return {
      ngModule: RecaptchaLoaderModule, providers: [
        { provide: RECAPTCHA_LANGUAGE, useValue: parameters.language },
        {
          provide: RECAPTCHA_RENDER,
          useValue: parameters.render !== undefined ? parameters.render : RecaptchaRender.Explicit
        },
        {
          provide: RECAPTCHA_ONLOAD,
          useValue: parameters.onload !== undefined ? parameters.onload : RecaptchaOnloadEventName
        },
        {
          provide: RECAPTCHA_URL,
          useValue: parameters.recaptchaUrl !== undefined ? parameters.recaptchaUrl : RecaptchaGoogleUrl
        },
        {
          provide: RecaptchaOnloadService,
          useValue: {
            onload: parameters.onloadFunc
          }
        }
      ]
    }
  }
}
