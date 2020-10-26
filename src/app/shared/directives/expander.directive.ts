import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[frtExpander]'
})
export class ExpanderDirective {
  constructor(el: ElementRef) {}
  @Input() private list: HTMLElement;
  // tslint:disable-next-line:typedef
  @HostListener('click', ['$event']) onDirClick($event) {
    this.list.classList.toggle('selected');
  }
}
