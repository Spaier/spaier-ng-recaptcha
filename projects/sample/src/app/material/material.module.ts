import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
} from '@angular/material'

const MODULES = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
]

/**
 * A module declaring Material 2 Components.
 */
@NgModule({
  exports: [...MODULES]
})
export class MaterialModule {}
