import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from './shared/components/modal/modal.module';
import { InviteUserPopupModule } from './modules/components/invite-user-popup/invite-user-popup.module';
import { RemoveUserConfirmPopupModule } from './modules/components/remove-user-confirm-popup/remove-user-confirm-popup.module';
import { HeaderModule } from './shared/components/header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { initDataResolverFactory } from './core/helpers/init-data-resolver-factory';
import { UserService } from './core/services/user.service';
import { EventBusService } from './core/services/event-bus.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    RemoveUserConfirmPopupModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    EventBusService,
    MatSnackBar,

    { provide: APP_INITIALIZER, useFactory: initDataResolverFactory, deps: [UserService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
