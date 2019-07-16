import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { fromEvent } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { MAIN_WINDOW, WindowEvent } from './tokens';
import { MainWindowFactory } from './app-window.factory';
import { ElectronStore } from './electron-store';
import { ElectronService } from './electron.service';
import { ElectronWindow } from './interfaces';

@Module({
  providers: [
    ElectronStore,
    ElectronService,
    {
      provide: MAIN_WINDOW,
      useFactory: MainWindowFactory,
      inject: [ElectronStore],
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

  onModuleInit() {
    return fromEvent(this.electron.app, 'ready').pipe(
      switchMap(async () => {
        this.electron.app.setAppUserModelId(process.execPath);

        if (!environment.production) {
          await this.mainWindow.loadURL(`http://localhost:${environment.devServerPort}`);
        } else {
          await this.mainWindow.loadFile('');
        }

        this.mainWindow.on('ready-to-show', () => {
          this.mainWindow.show();
        });

        this.mainWindow.on('close', () => {
          this.electron.saveWindowInfo(this.mainWindow);
          this.electron.app.quit();
        });
      }),
      take(1),
    ).toPromise();
  }
}
