import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[venoboButton]',
  host: {
    '[class.disabled]': 'disabled',
  },
})
export class ButtonDirective {
  @Input() disabled: boolean;
}
