import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../../core/services/event-bus.service';
import { EmitEvent } from '../../../shared/models/emit-event.model';
import { Events } from '../../../core/enums/events';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'frt-remove-user-confirm-popup',
  templateUrl: './remove-user-confirm-popup.component.html',
  styleUrls: ['./remove-user-confirm-popup.component.scss']
})
export class RemoveUserConfirmPopupComponent implements OnInit {
  public selectedUser: User;

  constructor(
    private eventBusService: EventBusService
  ) {}

  public setupDefaults(): void {
    this.eventBusService.on<User>(Events.REMOVE_USER_PAYLOAD, (payload) => this.selectedUser = payload);
  }

  public ngOnInit(): void {
    this.setupDefaults();
  }

  public onClose(): void {
    this.eventBusService.emit(new EmitEvent(Events.CLOSE_REMOVE_USER_CONFIRM_POPUP));
  }

  public onDelete(): void {
    this.eventBusService.emit(new EmitEvent(Events.REMOVE_USER, this.selectedUser.id));
    this.eventBusService.emit(new EmitEvent(Events.CLOSE_REMOVE_USER_CONFIRM_POPUP));
  }

}
