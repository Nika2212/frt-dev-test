import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../core/enums/roles';

@Component({
  selector: 'frt-invite-user-popup',
  templateUrl: './invite-user-popup.component.html',
  styleUrls: ['./invite-user-popup.component.scss']
})
export class InviteUserPopupComponent implements OnInit {
  public availableRoles: Roles[] = [];

  constructor() { }

  private setupDefaults(): void {
    this.availableRoles = [
      Roles.USER,
      Roles.ADMIN
    ];
  }

  public ngOnInit(): void {
    this.setupDefaults();
  }

}
