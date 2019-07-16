import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

export { BrowserWindow as ElectronWindow };

export type ElectronWindowBounds = Pick<BrowserWindowConstructorOptions, 'height' | 'width'>;
