import { Selector, State } from '@ngxs/store';
import { PlayerUiState } from './player-ui.state';

export interface PlayerStateModel {
  muted: boolean;
  dragging: boolean;
  loading: boolean;
  // Percentages for audio slider
  audio: number;
  paused: boolean;
  ready: boolean;
}

@State<PlayerStateModel>({
  name: 'player',
  defaults: {
    muted: false,
    dragging: false,
    loading: true,
    paused: true,
    ready: false,
    audio: 100,
  },
  children: [PlayerUiState],
})
export class PlayerState {
  @Selector()
  static isLoading({ loading }: PlayerStateModel) {
    return loading;
  }
  @Selector()
  static isMuted({ muted }: PlayerStateModel) {
    return muted;
  }

  @Selector()
  static isPaused({ paused }: PlayerStateModel) {
    return paused;
  }

  @Selector()
  static isReady({ ready }: PlayerStateModel) {
    return ready;
  }
}
