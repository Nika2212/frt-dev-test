import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../core/enums/roles';
import { User } from '../../../shared/models/user.model';
import { newUserModelValidator } from '../../../core/helpers/validators';
import { EventBusService } from '../../../core/services/event-bus.service';
import { EmitEvent } from '../../../shared/models/emit-event.model';
import { Events } from '../../../core/enums/events';

@Component({
  selector: 'frt-invite-user-popup',
  templateUrl: './invite-user-popup.component.html',
  styleUrls: ['./invite-user-popup.component.scss']
})
export class InviteUserPopupComponent implements OnInit {
  public availableRoles: Roles[] = [];
  public newUserModel: User;
  public isInvalid: boolean;
  public message: string;

  constructor(
    private eventBusService: EventBusService
  ) { }

  private setupDefaults(): void {
    this.availableRoles = [
      Roles.USER,
      Roles.ADMIN
    ];
    this.newUserModel = new User();
    this.newUserModel.isActive = false;
    this.isInvalid = true;
  }

  public ngOnInit(): void {
    this.setupDefaults();
  }

  public validate(): void {
    const validation = newUserModelValidator.validate(this.newUserModel).error;

    if (validation) {
      this.message = 'Fill and Correct all the fields';
      this.isInvalid = true;
    } else {
      this.message = 'Good to go';
      this.isInvalid = false;
    }
  }

  public onClose(): void {
    this.eventBusService.emit(new EmitEvent(Events.CLOSE_INVITE_USER_POPUP));
  }

  public onSubmit(): void {
    if (this.isInvalid) {
      return;
    }

    this.eventBusService.emit(new EmitEvent(Events.ADD_USER, this.newUserModel));
  }
}
