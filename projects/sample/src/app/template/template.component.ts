import { Component } from '@angular/core'

import { DirectiveComponent } from '../directive/directive.component'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent extends DirectiveComponent {

  captcha!: any

  onSubmit(event: any) {
    console.log('submit')
    console.log(event)
    console.log(this.captcha)
  }
}
