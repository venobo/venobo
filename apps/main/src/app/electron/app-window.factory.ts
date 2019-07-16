import { join } from 'path';

import { ElectronWindow } from './interfaces';
import { ElectronStore } from './electron-store';

export function MainWindowFactory(store: ElectronStore): ElectronWindow {
  const bounds = store.getWindowBounds();

  return new ElectronWindow({
    icon: join(__dirname, 'assets/build/icons/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    show: false,
    ...bounds,
  });
}
