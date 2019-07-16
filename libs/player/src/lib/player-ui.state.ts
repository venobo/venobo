import { Selector, State } from '@ngxs/store';

export interface PlayerUiStateModel {
  scrubbingLabel: string;
  shown: true;
}

@State<PlayerUiStateModel>({
  name: 'ui',
  defaults: {
    shown: true,
    scrubbingLabel: null,
  },
})
export class PlayerUiState {
  @Selector()
  static isShown({ shown }: PlayerUiStateModel) {
    return shown;
  }
}
