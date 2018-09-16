import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { Recaptcha, RecaptchaModule, RecaptchaLoaderModule } from 'spaier-ng-recaptcha'

import { MaterialModule } from './material.module'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { DirectiveComponent } from './directive/directive.component'

@NgModule({
  declarations: [
    AppComponent,
    DirectiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    RecaptchaLoaderModule.withParameters({
      language: 'ru',
      onloadFunc: (recaptcha: Recaptcha) => {
        // recaptcha.execute('your_sitekey', { action: 'background' }) // V3 Execution
      },
    }),
    RecaptchaModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
