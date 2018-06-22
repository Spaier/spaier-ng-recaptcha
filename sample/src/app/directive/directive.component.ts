import { Component } from '@angular/core'

import { RecaptchaSize, RecaptchaTheme } from '../../../../dist'

@Component({
	selector: 'app-directive',
	templateUrl: './directive.component.html',
	styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent {

	isolated = false

	lang = 'en'

	langs = [
		'en',
		'ru',
		'fr',
		'de',
		'it',
		'es'
	]

	theme: RecaptchaTheme = 'dark'

	size: RecaptchaSize = 'normal'

	badge = 'bottomright'

	constructor() { }

	onSuccess(response: string) {
		console.log(response)
	}

	onError() {
		console.log('Error')
	}

	onExpired() {
		console.log('Expired')
	}
}
