import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() numberOfPages: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  currentPage = 1;

  pageOptions: number[];
  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.numberOfPages && changes.numberOfPages.currentValue) {
      this.pageOptions = this.getArrayOfPage(this.numberOfPages);
    }
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }


  openPage(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

}
