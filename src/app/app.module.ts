import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from './shared/components/modal/modal.module';
import { InviteUserPopupModule } from './modules/components/invite-user-popup/invite-user-popup.module';
import { RemoveUserConfirmPopupModule } from './modules/components/remove-user-confirm-popup/remove-user-confirm-popup.module';
import { HeaderModule } from './shared/components/header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    ModalModule,
    InviteUserPopupModule,
    RemoveUserConfirmPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
