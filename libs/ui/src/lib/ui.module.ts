import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipComponent } from './tooltip/tooltip.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ButtonDirective, DraggableDirective } from './directives';
import { PosterComponent } from './poster';

export const COMPONENTS = [
  TooltipComponent,
  CarouselComponent,
  PosterComponent,
  ButtonDirective,
  DraggableDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class UiModule {}
