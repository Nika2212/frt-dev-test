import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { EventBusService } from '../../../core/services/event-bus.service';
import { BaseComponent } from '../../../core/helpers/base-component';
import { Events } from '../../../core/enums/events';

@Component({
  selector: 'frt-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent extends BaseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() private users: User[];
  @Input() private userCount: number;
  @Output() public onUserSettingsClick: EventEmitter<number> = new EventEmitter<number>(true);
  @Output() public onUserDeleteClick: EventEmitter<number> = new EventEmitter<number>(true);
  @Output() public onUserStatusChangeClick: EventEmitter<number> = new EventEmitter<number>(true);

  public displayedUsers: User[];
  public filterString: string;

  constructor(
    private eventBusService: EventBusService
  ) {
    super();
  }

  private applyFilters(): void {}

  private applyPagination(): void {}

  private applySort(): void {}

  private updateGrid(): void {
    this.displayedUsers = this.users;

    this.applySort();
    this.applyFilters();
    this.applyPagination();
  }

  private setupDefaults(): void {}

  private setupEvents(): void {
    const sub = this.eventBusService.on<string>(Events.FILTER_USERS, payload => {
      this.filterString = payload;
      this.updateGrid();
    });

    this.addSubscription(sub);
  }

  public ngOnInit(): void {
    this.setupDefaults();
    this.setupEvents();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.users.currentValue && changes.users.currentValue.length > 0) {
      this.updateGrid();
    }
  }

  public ngOnDestroy(): void {}

}
