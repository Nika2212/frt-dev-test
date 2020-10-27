import { Component, OnDestroy, OnInit } from '@angular/core';
import { Popups } from './core/enums/popups';
import { BaseComponent } from './core/helpers/base-component';
import { EventBusService } from './core/services/event-bus.service';
import { Events } from './core/enums/events';

@Component({
  selector: 'frt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  public currentPopup: Popups;

  constructor(
    private eventBusService: EventBusService
  ) {
    super();
  }

  private setupDefaults(): void {
    this.currentPopup = Popups.NONE;
  }

  private setupEvents(): void {
    const sub1 = this.eventBusService.on(Events.OPEN_INVITE_USER_POPUP, () => this.currentPopup = Popups.INVITE_USER_POPUP);
    const sub2 = this.eventBusService.on(Events.CLOSE_INVITE_USER_POPUP, () => this.currentPopup = Popups.NONE);
    const sub3 = this.eventBusService.on(Events.OPEN_REMOVE_USER_CONFIRM_POPUP, () => this.currentPopup = Popups.REMOVE_USER_CONFIRM_POPUP);
    const sub4 = this.eventBusService.on(Events.CLOSE_REMOVE_USER_CONFIRM_POPUP, () => this.currentPopup = Popups.NONE);

    this.addSubscription(sub1);
    this.addSubscription(sub2);
    this.addSubscription(sub3);
    this.addSubscription(sub4);
  }

  public ngOnInit(): void {
    this.setupDefaults();
    this.setupEvents();
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }
}
