import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RecaptchaModule, RecaptchaLoaderModule } from '../../../src/spaier-ng-recaptcha'

import { MaterialModule } from './material.module'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { ReactiveComponent } from './reactive/reactive.component'
import { TemplateComponent } from './template/template.component'
import { DirectiveComponent } from './directive/directive.component'

@NgModule({
	declarations: [
		AppComponent,
		ReactiveComponent,
		TemplateComponent,
		DirectiveComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		RecaptchaLoaderModule.withLanguage('ru'),
		RecaptchaModule.forRoot({
			invisibleKey: '6LcqUE4UAAAAAKZ5w4ejDKGo8GxOLkPMy6RhaErW',
			v2Key: '6LeuTU4UAAAAADq1qPnyrCHnzgET3PqQlxRbC0Er'
		}),
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
