import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Pages } from '../../../core/enums/pages';
import { filter } from 'rxjs/operators';
import { EventBusService } from '../../../core/services/event-bus.service';
import { EmitEvent } from '../../models/emit-event.model';
import { Events } from '../../../core/enums/events';

@Component({
  selector: 'frt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentPage: Pages;
  public filterString: string;

  constructor(
    private router: Router,
    private eventBusService: EventBusService
  ) {
  }

  private getPage(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((x: RouterEvent) => {
          if (x.url === '/' || x.url.search('dashboard') > -1) {
            this.currentPage = Pages.DASHBOARD;
          } else if (x.url.search('settings') > -1) {
            this.currentPage = Pages.SETTINGS;
          }
        }
      );
  }

  private setupDefaults(): void {
  }

  public ngOnInit(): void {
    this.setupDefaults();
    this.getPage();
  }

  public onUserAddClick(): void {
    this.eventBusService.emit(new EmitEvent(Events.OPEN_INVITE_USER_POPUP));
  }

  public onFilter(): void {
    if (!this.filterString) {
      this.filterString = '';
    }

    this.filterString = this.filterString.toLowerCase().trim();

    this.eventBusService.emit(new EmitEvent(Events.FILTER_USERS, this.filterString));
  }

  public dashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
