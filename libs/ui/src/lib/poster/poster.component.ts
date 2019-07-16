import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'venobo-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent {
  @Output() mouseEnter = new EventEmitter<MouseEvent>();
  @Output() mouseLeave = new EventEmitter<MouseEvent>();

  @Input() image?: string;

  constructor(readonly elementRef: ElementRef<HTMLElement>) {}
}
