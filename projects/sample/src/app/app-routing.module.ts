import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DirectiveComponent } from './directive/directive.component'
import { TemplateComponent } from './template/template.component'
import { ReactiveComponent } from './reactive/reactive.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'directive' },
  { path: 'directive', component: DirectiveComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'reactive', component: ReactiveComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
