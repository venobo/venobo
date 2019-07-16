import { Action, Selector, State, StateContext } from '@ngxs/store';

import { ChangeFullscreen, ChangeOnlineStatus } from './app.actions';

export interface AppStateModel {
  online: boolean;
  fullscreen: boolean;
}

/** @dynamic */
@State<AppStateModel>({
  name: 'app',
  defaults: {
    online: window.navigator.onLine,
    fullscreen: false,
  },
})
export class AppState {
  @Selector()
  static isFullscreen({ fullscreen }: AppStateModel) {
    return fullscreen;
  }

  @Selector()
  static isOnline({ online }: AppStateModel) {
    return online;
  }

  @Action(ChangeFullscreen)
  changeFullscreen(
    { patchState, getState }: StateContext<AppStateModel>
  ): void {
    const { fullscreen } = getState();

    patchState({
      fullscreen: !fullscreen,
    });
  }

  @Action(ChangeOnlineStatus)
  changeOnlineStatus({ patchState }: StateContext<AppStateModel>): void {
    patchState({
      online: window.navigator.onLine,
    });
  }
}
