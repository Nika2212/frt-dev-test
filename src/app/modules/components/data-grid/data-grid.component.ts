import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { BaseComponent } from '../../../core/helpers/base-component';
import { PaginatorModel } from '../../../shared/models/paginator.model';

@Component({
  selector: 'frt-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent extends BaseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() private users: User[];
  @Input() private usersCount: number;
  @Input() private filterString: string;
  @Output() public onUserSettingsClick: EventEmitter<number> = new EventEmitter<number>(true);
  @Output() public onUserDeleteClick: EventEmitter<number> = new EventEmitter<number>(true);
  @Output() public onUserStatusChangeClick: EventEmitter<number> = new EventEmitter<number>(true);

  public displayedUsers: User[];
  public paginator: PaginatorModel;

  constructor() {
    super();
  }

  private applyFilters(): void {
    if (this.filterString === '') {
      this.displayedUsers = this.users;

      return;
    }

    this.displayedUsers = this.displayedUsers
      .filter(u => u.firstName.toLowerCase().search(this.filterString) > - 1 || u.lastName.toLowerCase().search(this.filterString) > -1);
  }

  private applyPagination(): void {
    if (!this.paginator) {
      this.paginator = new PaginatorModel();
    }

    this.paginator.setPagesCount(this.displayedUsers.length);

    const startIndex = (this.paginator.pageIndex - 1) * this.paginator.pageSize;
    let endIndex = startIndex + this.paginator.pageSize;

    if (endIndex > this.paginator.count) {
      endIndex = this.paginator.count;
    }

    const paginatedUsers = [];

    for (let i = startIndex; i < endIndex; i++) {
      paginatedUsers.push(this.displayedUsers[i]);
    }

    this.displayedUsers = paginatedUsers;
  }

  private applySort(): void {}

  private updateGrid(): void {
    this.displayedUsers = this.users;

    this.applySort();
    this.applyFilters();
    this.applyPagination();
  }

  private setupDefaults(): void {
  }

  public ngOnInit(): void {
    this.setupDefaults();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.users && changes.users.currentValue && Array.isArray(changes.users.currentValue)) {
      this.updateGrid();
    }

    if (changes.filterString) {
      this.updateGrid();
    }
  }

  public ngOnDestroy(): void {}

  public onStatusChange(id: number): void {
    this.onUserStatusChangeClick.emit(id);
  }

  public onSettingsClick(id: number): void {
    this.onUserSettingsClick.emit(id);
  }

  public onRemoveClick(id: number): void {
    this.onUserDeleteClick.emit(id);
  }

  public onPageSizeChange(): void {
    this.updateGrid();
  }

  public onPageChange(index: number): void {
    this.paginator.pageIndex = index;
    this.updateGrid();
  }

  public onPrevious(): void {
    this.paginator.previous();
    this.updateGrid();
  }

  public onNext(): void {
    this.paginator.next();
    this.updateGrid();
  }
}
