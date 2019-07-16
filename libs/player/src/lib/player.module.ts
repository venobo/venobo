import { NgModule } from '@angular/core';
import { SharedModule } from '@venobo/shared';
import { NgxsModule } from '@ngxs/store';

import { PlayerState } from './player.state';
import { PlayerComponent } from './player.component';
import { PlayerUiState } from './player-ui.state';
import { RouterModule } from '@angular/router';
import { PlayerSeekSliderComponent } from './player-seek-slider';

@NgModule({
  declarations: [
    PlayerSeekSliderComponent,
    PlayerComponent,
  ],
  imports: [
    SharedModule,
    NgxsModule.forFeature([
      PlayerState,
      PlayerUiState,
    ]),
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: PlayerComponent,
      },
    ])
  ],
})
export class PlayerModule {}
