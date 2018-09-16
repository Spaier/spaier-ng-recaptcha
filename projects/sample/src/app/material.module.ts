import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatRadioModule,
} from '@angular/material'

const MODULES = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatRadioModule,
]

/**
 * A module declaring Material 2 Components.
 */
@NgModule({
  exports: [...MODULES]
})
export class MaterialModule {}
