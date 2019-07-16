import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output, ViewChild,
} from '@angular/core';

export interface VideoSeekerPosition {
  position: number;
  percentage: number;
}

@Component({
  selector: 'venobo-player-seek-slider',
  templateUrl: './player-seek-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ui-cell timeline',
  },
})
export class PlayerSeekSliderComponent {
  @ViewChild('seekSlider', { static: true }) seekSlider: ElementRef<HTMLDivElement>;

  @Output() dragging = new EventEmitter<DragEvent>();

  @Input() disabled: boolean;
  @Input() buffered?: number;
  @Input() duration: number;

  scrubbingLabel = null;
  isDragging = false;
  percentage = 0;

  get clientRect(): ClientRect | DOMRect {
    const seeker = this.seekSlider.nativeElement;

    return seeker.getBoundingClientRect();
  }

  private isStartOrEnd(event: DragEvent): boolean {
    const { left, width } = this.clientRect;

    const isSeekerStart = event.clientX < left;
    const isSeekerEnd = event.clientX > width + left;

    return !event.clientX || isSeekerStart || isSeekerEnd;
  }

  private calculatePosition(event: DragEvent): VideoSeekerPosition {
    const { left, width } = this.clientRect;

    const fraction = Math.abs(event.clientX - left) / width;
    const position = fraction * this.duration;
    const percentage = 100 * position / this.duration;

    return {
      percentage,
      position,
    };
  }

  handleVideoSeeker(event: DragEvent): void {
    if (!this.isStartOrEnd(event)) {
      const { position, percentage } = this.calculatePosition(event);

      this.dragging.emit(event);
      this.isDragging = true;
    }
  }

  @HostListener('click', ['$event'])
  handleVideoScrub(event: MouseEvent): void {
    this.isDragging = false;
  }
}
