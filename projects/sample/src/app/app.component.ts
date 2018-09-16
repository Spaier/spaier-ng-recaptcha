import { Component } from '@angular/core'
import { RecaptchaService } from 'spaier-ng-recaptcha'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly recaptcha: RecaptchaService) { }
}
