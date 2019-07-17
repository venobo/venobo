import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { environment } from '@venobo/environment/main';
import { join } from 'path';

import { MAIN_WINDOW } from './tokens';
import { createMainWindowFactory } from './create-main-window.factory';
import { ElectronStore } from './electron-store';
import { ElectronService } from './electron.service';
import { ElectronWindow } from './interfaces';

@Module({
  providers: [
    ElectronStore,
    ElectronService,
    {
      provide: MAIN_WINDOW,
      useFactory: createMainWindowFactory,
      inject: [ElectronService, ElectronStore],
    },
  ],
  exports: [
    ElectronStore,
    ElectronService,
    MAIN_WINDOW,
  ],
})
export class ElectronModule implements OnModuleInit {
  constructor(
    @Inject(MAIN_WINDOW)
    private readonly mainWindow: ElectronWindow,
    private readonly electron: ElectronService,
  ) {}

  async onModuleInit() {
    const app = await this.electron.ready();
    app.setAppUserModelId(process.execPath);

    if (!environment.production) {
      await this.mainWindow.loadURL(`http://localhost:${environment.devServerPort}`);
    } else {
      const filePath = join(__dirname, '../renderer/index.html');
      await this.mainWindow.loadFile(filePath);
    }

    this.mainWindow.webContents.once('dom-ready', () => {
      this.mainWindow.show();
    });

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
    });

    this.mainWindow.on('close', () => {
      this.electron.saveWindowInfo(this.mainWindow);
      // shouldn't quit except when users settings are set to
      app.quit();
    });
  }
}
