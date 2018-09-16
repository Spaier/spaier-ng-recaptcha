import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DirectiveComponent } from './directive/directive.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'directive' },
  { path: 'directive', component: DirectiveComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
