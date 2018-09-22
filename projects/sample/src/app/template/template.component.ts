import { Component, ViewChild } from '@angular/core'

import { RecaptchaDirective } from 'spaier-ng-recaptcha'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {

  @ViewChild('recaptcha') recaptcha: RecaptchaDirective

  captcha

  theme = 'dark'

  sitekey

  size = 'invisible'

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

  onSubmit() {
    console.log(this.captcha)
  }
}
