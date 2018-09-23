import { Component, ViewChild } from '@angular/core'

import { RecaptchaDirective } from 'spaier-ng-recaptcha'

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent {

  @ViewChild('recaptcha') recaptcha: RecaptchaDirective

  theme = 'dark'

  sitekey

  size = 'normal'

  badge = 'none'

  language = 'en'

  action = 'form'

  constructor() { }

  async execute() {
    console.log('executed button: ' + await this.recaptcha.execute())
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

  onError() {
    console.log('error')
  }

  onExpired() {
    console.log('expired')
  }
}
