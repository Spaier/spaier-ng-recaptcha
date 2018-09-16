import { InjectionToken } from '@angular/core'

import { RecaptchaRender } from './recaptcha-render'

/**
 * A script's render parameter.
 * Possible values: RenderExplicit = 'explicit', RenderOnload = 'onload', Sitekey.
 */
export const RECAPTCHA_RENDER = new InjectionToken<RecaptchaRender | string>('RECAPTCHA_RENDER')
