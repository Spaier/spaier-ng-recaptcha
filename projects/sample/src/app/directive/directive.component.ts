import { Component, ViewChild } from '@angular/core'

import { RecaptchaDirective } from 'spaier-ng-recaptcha'

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent {

  @ViewChild('recaptcha') recaptcha!: RecaptchaDirective

  theme = 'dark'

  size = 'normal'

  badge = 'none'

  language = 'en'

  action = 'form'

  constructor() { }

  execute() {
    this.recaptcha.execute()
    console.log('executed')
  }

  reset() {
    this.recaptcha.reset()
  }

  getResponse() {
    console.log('response: ' + this.recaptcha.getResponse())
  }

  onResolved(response: string) {
    console.log('callback: ' + response)
  }

  onError(event: any) {
    console.log('error')
    console.log(event)
  }

  onExpired(event: any) {
    console.log('expired')
    console.log(event)
  }
}
