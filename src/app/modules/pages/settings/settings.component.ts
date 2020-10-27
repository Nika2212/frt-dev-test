import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../core/enums/roles';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../../core/helpers/base-component';

@Component({
  selector: 'frt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent implements OnInit {
  public availableRoles: Roles[] = [];
  public selectedUser: User;
  public newSelectedUser: User;
  public isLoading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    super();
  }

  private getUser(): void {
    this.route.params.subscribe(payload => {
      let id;

      try {
        id = parseInt(payload.id, 10);
      } catch (e) {
        this.router.navigate(['dashboard']);
      }

      this.selectedUser = this.userService.getUser(id);

      if (!this.selectedUser) {
        this.router.navigate(['dashboard']);
      } else {
        this.newSelectedUser = {...this.selectedUser};

        this.isLoading = false;
      }
    });
  }

  private setupDefaults(): void {
    this.availableRoles = [
      Roles.USER,
      Roles.ADMIN
    ];
    this.isLoading = true;
  }

  public ngOnInit(): void {
    this.setupDefaults();
    this.getUser();
  }

  public onUpdate(): void {
    this.userService.updateUser(this.newSelectedUser);
    this.getUser();
  }

}
