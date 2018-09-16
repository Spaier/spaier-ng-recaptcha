import { DOCUMENT } from '@angular/common'
import { Inject, Injectable, Optional, Renderer2, RendererFactory2 } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Recaptcha } from '../recaptcha'
import { RecaptchaRender } from './recaptcha-render'
import { RecaptchaOnloadService } from './recaptcha-onload.service'
import { RECAPTCHA_URL } from './recaptcha-url.token'
import { RECAPTCHA_LANGUAGE } from './recaptcha-language.token'
import { RECAPTCHA_WINDOW } from './recaptcha-window.token'
import { RECAPTCHA_RENDER } from './recaptcha-render.token'
import { RECAPTCHA_ONLOAD } from './recaptcha-onload.token'

declare var grecaptcha: Recaptcha

/**
 * A service for accessing recaptcha.
 */
@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  readonly recaptcha: Observable<Recaptcha>

  private _recaptcha: BehaviorSubject<Recaptcha>

  constructor(
    // See issue: https://github.com/angular/angular/issues/15640
    @Inject(DOCUMENT) @Optional() documentWrapper,
    @Inject(RECAPTCHA_WINDOW) @Optional() windowWrapper,
    @Inject(RECAPTCHA_URL) @Optional() recaptchaUrl: string,
    @Inject(RECAPTCHA_LANGUAGE) @Optional() language: string,
    @Inject(RECAPTCHA_RENDER) @Optional() render: RecaptchaRender | string,
    @Inject(RECAPTCHA_ONLOAD) @Optional() onload: string,
    @Optional() private readonly onloadService: RecaptchaOnloadService,
    rendererFactory: RendererFactory2
  ) {
    this._recaptcha = new BehaviorSubject<any>(null)
    this.load(
      rendererFactory.createRenderer(null, null),
      windowWrapper,
      documentWrapper,
      recaptchaUrl,
      language,
      render,
      onload,
    )
    this.recaptcha = this._recaptcha.asObservable()
  }

  private load(
    renderer: Renderer2,
    windowWrapper: Window,
    documentWrapper: Document,
    recaptchaUrl: string,
    language?: string,
    render?: string,
    onload?: string,
  ) {
    if (windowWrapper && documentWrapper) {
      const url = new URL(recaptchaUrl)
      if (language) url.searchParams.append('hl', language)
      if (render) url.searchParams.append('render', render)
      if (onload) {
        url.searchParams.append('onload', onload)
        windowWrapper[onload] = () => {
          this._recaptcha.next(grecaptcha)
          grecaptcha.ready(() => {
            if (this.onloadService && this.onloadService.onload) {
              this.onloadService.onload(grecaptcha)
            }
          })
        }
      }
      const script = renderer.createElement('script')
      renderer.setAttribute(script, 'src', url.href)
      renderer.setAttribute(script, 'async', 'true')
      renderer.setAttribute(script, 'defer', 'true')
      renderer.appendChild(documentWrapper.body, script)
    }
  }
}
