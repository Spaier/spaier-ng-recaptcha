import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

import { DirectiveComponent } from '../directive/directive.component'

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent extends DirectiveComponent {

  form = this.fb.group({
    'captcha': ['', Validators.required]
  })

  constructor(private readonly fb: FormBuilder) {
    super()
  }

  onSubmit(event: any) {
    console.log('submit')
    console.log(event)
    console.log(this.form.value)
  }
}
