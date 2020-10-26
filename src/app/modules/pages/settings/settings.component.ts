import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../core/enums/roles';

@Component({
  selector: 'frt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
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
