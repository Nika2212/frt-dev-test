import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteUserPopupComponent } from './invite-user-popup.component';
import { MaterialModule } from '../../../shared/material.module';

@NgModule({
  declarations: [InviteUserPopupComponent],
  exports: [
    InviteUserPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class InviteUserPopupModule { }
