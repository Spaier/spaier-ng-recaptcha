import {
	isPlatformBrowser, isPlatformServer, isPlatformWorkerApp, isPlatformWorkerUi, DOCUMENT
} from '@angular/common'
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { RECAPTCHA_LANGUAGE } from './recaptcha-language.token'

/**
 * Service for loading recaptcha.
 */
@Injectable()
export class RecaptchaLoaderService {

	readonly recaptcha: Observable<any>

	private _recaptcha: BehaviorSubject<any>

	constructor( @Inject(PLATFORM_ID) platformId,
		@Optional() @Inject(DOCUMENT) documentWrapper,
		@Inject(RECAPTCHA_LANGUAGE) @Optional() public language: string) {
		const onLoad = 'recaptchaloaded'
		// Workaround for angular bug. See issue: https://github.com/angular/angular/issues/15640
		const documentObject = documentWrapper as Document

		this._recaptcha = new BehaviorSubject<any>(null)

		if (isPlatformBrowser(platformId)) {
			window[onLoad] = () => {
				this._recaptcha.next(grecaptcha)
			}
			const googleRecaptchaUrl = 'https://www.google.com/recaptcha/api.js'
			const script = documentObject.createElement('script')
			const languageParameter = this.language ? '&hl=' + this.language : ''
			script.src = `${googleRecaptchaUrl}?render=explicit&onload=${onLoad}${languageParameter}`
			script.async = true
			script.defer = true
			documentObject.body.appendChild(script)
		} else if (isPlatformServer(platformId)) {
			// TODO
		} else if (isPlatformWorkerApp(platformId)) {
			// TODO
		} else if (isPlatformWorkerUi(platformId)) {
			// TODO
		}

		this.recaptcha = this._recaptcha.asObservable()
	}
}
