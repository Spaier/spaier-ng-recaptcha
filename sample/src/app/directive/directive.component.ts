import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-directive',
	templateUrl: './directive.component.html',
	styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent {

	isolated = false

	theme: GReCaptcha.Theme = 'dark'

	size: GReCaptcha.Size = 'normal'

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
