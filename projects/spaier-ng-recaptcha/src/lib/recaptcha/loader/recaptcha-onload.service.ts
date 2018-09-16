import { Injectable } from '@angular/core'

import { Recaptcha } from '../recaptcha'

/**
 * A service that provides custom onload callback.
 */
@Injectable({
  providedIn: 'root'
})
export class RecaptchaOnloadService {
  onload(recaptcha: Recaptcha): void { }
}
