import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { PosterComponent } from '../poster';

@Component({
  selector: 'venobo-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
  @ViewChildren(PosterComponent) posterItems: QueryList<ElementRef>;
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  @Input() items: { image?: string }[];
  @Input() title?: string;

  navPrevDisabled = true;
  navNextDisabled = true;
  posterWidth = 0;
  sliderStartPoint = 0;
  postersShownTotal = 0;
  postersPerSlide: number;
  innerWidth: number;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  handlePrev(): void {
    const postersLeft = +Math.abs(this.postersPerSlide - this.postersShownTotal);
    const firstSlide = postersLeft <= this.postersPerSlide;

    this.innerWidth = !firstSlide
      ? this.innerWidth + (this.posterWidth * this.postersPerSlide)
      : this.sliderStartPoint;

    this.postersShownTotal = !firstSlide
      ? this.postersShownTotal - this.postersPerSlide
      : this.postersPerSlide;

    this.navPrevDisabled = firstSlide;
    this.navNextDisabled = false;

    this.cdr.detectChanges();
  }

  handleNext(): void {
    const postersLeft = this.posterItems.length - this.postersShownTotal;
    const lastSlide = this.postersPerSlide > postersLeft;

    this.innerWidth = !lastSlide
      ? -Math.abs(this.innerWidth - (this.posterWidth * this.postersPerSlide))
      : -Math.abs(this.innerWidth - (this.posterWidth * postersLeft));

    this.postersShownTotal = !lastSlide
      ? this.postersShownTotal + this.postersPerSlide
      : this.postersShownTotal + postersLeft;

    this.navPrevDisabled = false;
    this.navNextDisabled = this.postersShownTotal === this.posterItems.length;

    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    const startPoint = 0;
    const maxWidth = this.wrapper.nativeElement.offsetWidth;

    const postersFitPerSlide = this.posterItems.filter(item => {
      const rect = item.nativeElement.getBoundingClientRect();

      return rect.left < maxWidth;
    }).length;

    this.innerWidth = -startPoint;
    this.sliderStartPoint = -startPoint;
    this.postersShownTotal = postersFitPerSlide;
    this.posterWidth = this.posterItems[0].elementRef.nativeElement.getBoundingClientRect();
    this.postersPerSlide = postersFitPerSlide;

    this.cdr.detectChanges();
  }
}
