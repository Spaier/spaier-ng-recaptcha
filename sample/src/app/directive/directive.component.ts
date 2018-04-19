import { Component } from '@angular/core'

@Component({
	selector: 'app-directive',
	templateUrl: './directive.component.html',
	styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent {

	isolated = false

	theme: ReCaptchaV2.Theme = 'dark'

	size: ReCaptchaV2.Size = 'normal'

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
