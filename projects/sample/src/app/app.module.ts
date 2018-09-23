import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {
  Recaptcha,
  RecaptchaDirectiveModule,
  RecaptchaFormsModule,
  RecaptchaLoaderModule,
  RecaptchaRender
} from 'spaier-ng-recaptcha'

import { MaterialModule } from './material/material.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DirectiveComponent } from './directive/directive.component'
import { TemplateComponent } from './template/template.component'
import { ReactiveComponent } from './reactive/reactive.component'

const v2CheckboxSitekey = '6LeuTU4UAAAAADq1qPnyrCHnzgET3PqQlxRbC0Er'
const v2InvisibleSitekey = '6LcqUE4UAAAAAKZ5w4ejDKGo8GxOLkPMy6RhaErW'
const v3Sitekey = '6Lcj7WcUAAAAAD-LipyB7wyI7mv5ONLDS0wRPXVj'

const useV3 = false

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
      render: useV3 ? '6Lcj7WcUAAAAAD-LipyB7wyI7mv5ONLDS0wRPXVj' : RecaptchaRender.Explicit,
      onloadFunc: async (recaptcha: Recaptcha) => {
        // Sitekey Execution
        if (useV3) {
          const result = await recaptcha.execute(v3Sitekey, { action: 'background' })
          console.log(result)
        }
      },
    }), // load script and allows to use `RecaptchaService`
    RecaptchaDirectiveModule, // allows to use RecaptchaDirective
    RecaptchaFormsModule, // integrates RecaptchaDirective with @angular/forms
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
