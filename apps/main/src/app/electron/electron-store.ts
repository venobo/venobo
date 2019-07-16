import { Injectable } from '@nestjs/common';
import * as Store from 'electron-store';

import { ElectronWindowBounds } from './interfaces';
import { WINDOW_BOUNDS } from './tokens';

@Injectable()
export class ElectronStore extends Store<any> {
  getWindowBounds(): ElectronWindowBounds {
    let bounds: ElectronWindowBounds;

    try {
      bounds = JSON.parse(this.get(WINDOW_BOUNDS));
    } catch {
      bounds = {
        width: 800,
        height: 1400,
      };
    }

    return bounds;
  }
}
