import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TemplateComponent } from './template/template.component'
import { ReactiveComponent } from './reactive/reactive.component'
import { DirectiveComponent } from './directive/directive.component'

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'directive' },
	{ path: 'template', component: TemplateComponent },
	{ path: 'reactive', component: ReactiveComponent },
	{ path: 'directive', component: DirectiveComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
