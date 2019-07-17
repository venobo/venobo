import { join } from 'path';

import { ElectronWindow } from './interfaces';
import { ElectronStore } from './electron-store';
import { ElectronService } from './electron.service';

export async function createMainWindowFactory(
  electron: ElectronService,
  store: ElectronStore,
): Promise<ElectronWindow> {
  await electron.ready();

  const bounds = store.getWindowBounds();

  return new ElectronWindow({
    icon: join(__dirname, 'assets/icons/venobo_68x68.png'),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    show: false,
    ...bounds,
  });
}
