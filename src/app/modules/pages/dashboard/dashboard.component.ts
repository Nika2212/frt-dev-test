import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { EventBusService } from '../../../core/services/event-bus.service';
import { BaseComponent } from '../../../core/helpers/base-component';
import { Events } from '../../../core/enums/events';
import { Router } from '@angular/router';
import { EmitEvent } from '../../../shared/models/emit-event.model';

@Component({
  selector: 'frt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public usersCount: number;
  public filterString: string;

  constructor(
    private userService: UserService,
    private eventBusService: EventBusService,
    private router: Router
  ) {
    super();
  }

  private setupDefaults(): void {

  }

  private setupEvents(): void {
    const sub1 = this.eventBusService.on<string>(Events.FILTER_USERS, payload => this.filterString = payload);
    const sub2 = this.userService.getUsers().subscribe(payload => {
        this.users = [...payload];
      });
    const sub3 = this.userService.getUsersCount().subscribe(payload => this.usersCount = payload);
    const sub4 = this.eventBusService.on<User>(Events.ADD_USER, (payload) => this.userService.addUser(payload));
    const sub5 = this.eventBusService.on<number>(Events.REMOVE_USER, (payload) => this.userService.removeUser(payload));

    this.addSubscription(sub1);
    this.addSubscription(sub2);
    this.addSubscription(sub3);
    this.addSubscription(sub4);
    this.addSubscription(sub5);
  }

  public ngOnInit(): void {
    this.setupDefaults();
    this.setupEvents();
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  public onUserStatusChange(id: number): void {
    const user = this.users.find(u => u.id === id);

    user.isActive = !user.isActive;

    this.userService.updateUser(user);
  }

  public onUserDeleteClick(id: number): void {
    const selectedUser = this.users.find(u => u.id === id);

    this.eventBusService.emit(new EmitEvent(Events.OPEN_REMOVE_USER_CONFIRM_POPUP));
    this.eventBusService.emit(new EmitEvent(Events.REMOVE_USER_PAYLOAD, selectedUser));
  }

  public onUserSettingsClick(id: number): void {
    this.router.navigate(['settings', id]);
  }

}
