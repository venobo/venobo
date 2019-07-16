import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output, ViewChild,
} from '@angular/core';

@Component({
  selector: 'venobo-audio-slider',
  templateUrl: './audio-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ui-cell control-btn audio-control',
    '[class.muted]': 'muted',
  },
})
export class AudioSliderComponent {
  @ViewChild('verticalSlider', { static: true }) slider: ElementRef<HTMLDivElement>;

  @Output() mouseleave = new EventEmitter<MouseEvent>();

  @Input() show: boolean;
  @Input() muted: boolean;
  @Input() volume: number;

  percentage = 0;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  get clientRect(): ClientRect | DOMRect {
    const seeker = this.slider.nativeElement;

    return seeker.getBoundingClientRect();
  }

  private calculateValues(event: MouseEvent | DragEvent) {
    const { top, height } = this.clientRect;
    const viewport = window.innerHeight;

    // @TODO: redundant
    const sliderPosBottom = viewport - top;
    const mousePosBottom = viewport - event.clientY + height;

    const volume = Math.abs(mousePosBottom - sliderPosBottom) / height;
    const percentage = volume * 100;

    return {
      percentage,
      volume,
    };
  }

  private isStartOrEnd(event: MouseEvent | DragEvent) {
    const { top, height } = this.clientRect;
    const viewport = window.innerHeight;

    // @TODO: redundant
    const sliderPosBottom = viewport - top;
    const mousePosBottom = viewport - event.clientY + height;

    const isSliderEnd = mousePosBottom >= height + sliderPosBottom;
    const isSliderStart = mousePosBottom <= sliderPosBottom;

    return !event.clientY || isSliderStart || isSliderEnd
  }

  handleAudioScrub(event: MouseEvent | DragEvent) {
    if (!this.isStartOrEnd(event)) {
      const { percentage, volume } = this.calculateValues(event);

      this.muted = volume === 0;
      this.percentage = percentage;

      this.cdr.detectChanges();
    }
  }
}
