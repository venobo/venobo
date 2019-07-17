import { Injectable, Logger } from '@nestjs/common';
import * as electron from 'electron';

import { ElectronStore } from './electron-store';
import { ElectronWindow } from './interfaces';
import { WINDOW_BOUNDS } from './tokens';

@Injectable()
export class ElectronService {
  private readonly logger = new Logger(ElectronService.name);
  public readonly app = electron.app;

  constructor(private readonly store: ElectronStore) {}

  async ready(): Promise<electron.App> {
    if (!this.app.isReady()) {
      await this.app.whenReady();
    }

    return this.app;
  }

  saveWindowInfo(window: ElectronWindow) {
    try {
      const windowBounds = JSON.stringify(window.getBounds());
      this.store.set(WINDOW_BOUNDS, windowBounds);
    } catch (e) {
      this.logger.error(`Saving window bounds failed: ${e.message}`);
    }
  }
}
