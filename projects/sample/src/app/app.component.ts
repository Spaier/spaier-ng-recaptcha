import { Component } from '@angular/core'
import { RecaptchaService } from 'spaier-ng-recaptcha'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  navLinks = [
    { path: 'directive', label: 'Directive' },
    { path: 'reactive', label: 'Reactive' },
    { path: 'template', label: 'Template' },
  ]

  constructor(private readonly recaptchaService: RecaptchaService) { }

  async execute() {
    const result = await this.recaptchaService.grecaptcha.execute({ action: 'something' })
    console.log(result)
  }
}
