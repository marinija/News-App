import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {

  private offsetBeforeEndPx: number = 0;
  @Output('loadMoreItems') loadItems: EventEmitter<number> = new EventEmitter();
  private itemsStart = 1;

  constructor() { }

  @HostListener("scroll", ['$event.target'])
  scrollHandler(target: HTMLElement) {
    var scrollableHeight = target.scrollHeight;
    var visibleHeight = target.clientHeight;
    var scrollTopMax = scrollableHeight - visibleHeight;

    if (target.scrollTop >= scrollTopMax - this.offsetBeforeEndPx) {
      this.itemsStart++;
      this.loadItems.emit(this.itemsStart);
    }
  }

}
