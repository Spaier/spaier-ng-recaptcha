import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {
  Recaptcha,
  RecaptchaRender,
  RecaptchaDirectiveModule,
  RecaptchaFormsModule,
  RecaptchaLoaderModule,
} from 'spaier-ng-recaptcha'

import { MaterialModule } from './material/material.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DirectiveComponent } from './directive/directive.component'
import { TemplateComponent } from './template/template.component'
import { ReactiveComponent } from './reactive/reactive.component'

export const v2CheckboxSitekey = '6LeuTU4UAAAAADq1qPnyrCHnzgET3PqQlxRbC0Er'
export const v2InvisibleSitekey = '6LcqUE4UAAAAAKZ5w4ejDKGo8GxOLkPMy6RhaErW'
export const v3Sitekey = '6Lcj7WcUAAAAAD-LipyB7wyI7mv5ONLDS0wRPXVj'

export async function onLoad(recaptcha: Recaptcha) {
  // Sitekey Execution
  const result = await recaptcha.execute(v3Sitekey, { action: 'background' })
  console.log(result)
}

// V2 Checkbox and V2 Invisible can be used
export const V2Parameters = {
  language: 'en',
  render: RecaptchaRender.Explicit,
}

// V2 Checkbox and V3 Invisible can be used.
export const V3Parameters = {
  language: 'en',
  render: v3Sitekey,
  onloadFunc: onLoad
}

@NgModule({
  declarations: [
    AppComponent,
    DirectiveComponent,
    TemplateComponent,
    ReactiveComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    RecaptchaLoaderModule.withParameters({
      language: 'en',
      render: RecaptchaRender.Explicit,
    }), // loads script
    RecaptchaDirectiveModule, // allows to use RecaptchaDirective
    RecaptchaFormsModule, // integrates RecaptchaDirective with @angular/forms
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
