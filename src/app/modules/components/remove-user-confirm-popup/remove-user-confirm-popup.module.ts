import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveUserConfirmPopupComponent } from './remove-user-confirm-popup.component';
import { MaterialModule } from '../../../shared/material.module';



@NgModule({
  declarations: [RemoveUserConfirmPopupComponent],
  exports: [
    RemoveUserConfirmPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class RemoveUserConfirmPopupModule { }
