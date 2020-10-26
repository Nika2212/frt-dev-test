import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Pages } from '../../../core/enums/pages';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'frt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentPage: Pages;

  constructor(
    private router: Router
  ) {
  }

  private getPage(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((x: RouterEvent) => {
          this.currentPage = x.url as Pages;
        }
      );
  }

  private setupDefaults(): void {
  }

  public ngOnInit(): void {
    this.setupDefaults();
    this.getPage();
  }

}
