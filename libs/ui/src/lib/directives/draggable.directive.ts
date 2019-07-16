import { Directive, HostListener, NgZone } from '@angular/core';

@Directive({
  selector: '[venoboDraggable]',
  host: {
    '[draggable]': 'true',
  },
})
export class DraggableDirective {
  constructor(private readonly ngZone: NgZone) {}

  /**
   * Solution to remove the ghost image when dragging
   * @author <https://stackoverflow.com/a/19601254/7933677>
   */
  private setFakeDragIcon(dt: DataTransfer): void {
    this.ngZone.runOutsideAngular(() => {
      const dragIcon = document.createElement('img');
      dragIcon.src = ''; //"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAAL‌​AAAAAABAAEAAAIBRAA7"

      dt.setDragImage(dragIcon, -99999, -99999);
      dt.effectAllowed = 'none';
    });
  }

  @HostListener('dragstart', ['$event.dataTransfer'])
  dragStart(dataTransfer: DataTransfer) {
    // Prevent the cursor from changing, eg to a green + icon on Mac
    // And prevent a ghost image of the handle to appear
    if (dataTransfer) {
      this.setFakeDragIcon(dataTransfer);
    }
  }
}
