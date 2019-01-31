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
    // V3 Execution
    const recaptcha = await this.recaptchaService.recaptcha$.toPromise()
    const result1 = await recaptcha.execute({ action: 'something' })
    const result2 = await this.recaptchaService.recaptcha.execute({ action: 'something' })
  }
}
