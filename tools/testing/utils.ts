import { DebugElement } from '@angular/core';

export function dispatchMouseEvent(
  { nativeElement }: DebugElement,
  eventName: string,
  options: MouseEventInit = {},
) {
  return nativeElement.dispatchEvent(
    new MouseEvent(eventName, {
      bubbles: true,
      cancelable: true,
      ...options,
    }),
  );
}
