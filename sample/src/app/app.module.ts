import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RecaptchaModule, RecaptchaLoaderModule } from '../../../dist'

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
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		RecaptchaLoaderModule.withParameters('ru'),
		RecaptchaModule.forRoot({
			invisibleConfig: {
				sitekey: '6LcqUE4UAAAAAKZ5w4ejDKGo8GxOLkPMy6RhaErW'
			},
			v2Config: {
				sitekey: '6LeuTU4UAAAAADq1qPnyrCHnzgET3PqQlxRbC0Er'
			}
		}),
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
