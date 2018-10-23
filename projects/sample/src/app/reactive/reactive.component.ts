import { Component, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

import { RecaptchaDirective } from 'spaier-ng-recaptcha'

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent {

  @ViewChild('recaptcha') recaptcha!: RecaptchaDirective

  form = this.fb.group({
    'captcha': ['', Validators.required]
  })

  theme = 'dark'

  size = 'normal'

  badge = 'none'

  language = 'en'

  action = 'form'

  constructor(private readonly fb: FormBuilder) { }

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
    console.log(this.form.value)
  }
}
