import { INITIAL_PAGE_SIZE } from '../../config/constants';

export class PaginatorModel {
  public pagesCount: number;
  public pageIndex: number;
  public pageSize: number;
  public count: number;
  public pages: number[];

  constructor(
  ) {
    this.pagesCount = 1;
    this.pageIndex = 1;
    this.pageSize = INITIAL_PAGE_SIZE;
    this.count = 0;
    this.pages = [];
  }

  public setPagesCount(count: number): void {
    this.count = count;
    this.pagesCount = Math.ceil(count / this.pageSize);

    this.pages = [];

    for (let i = 0; i < this.pagesCount; i++) {
      this.pages.push(i + 1);
    }
  }

  public next(): void {
    if (this.pageIndex + 1 <= this.pagesCount) {
      this.pageIndex++;
    }
  }

  public previous(): void {
    if (this.pageIndex - 1 > 0) {
      this.pageIndex--;
    }
  }

  public isFirst(): boolean {
    return this.pageIndex === 1;
  }

  public isLast(): boolean {
    return this.pageIndex === this.pagesCount;
  }
}
