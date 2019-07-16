import { InjectionToken } from '@angular/core';
// import { WcjsPlayer } from 'wcjs-prebuilt';

declare const __non_webpack_require__: any;

export const WCJS_PLAYER = new InjectionToken<any>('WCJS_PLAYER',{
  providedIn: 'root',
  factory() {
    return __non_webpack_require__('wcjs-prebuilt').createPlayer();
  },
});
