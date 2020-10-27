import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid.component';
import { MaterialModule } from '../../../shared/material.module';



@NgModule({
  declarations: [DataGridComponent],
  exports: [
    DataGridComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DataGridModule { }
