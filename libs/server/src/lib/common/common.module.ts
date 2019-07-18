import { HttpModule, Module } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

import { BROWSER } from './tokens';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: BROWSER,
      useFactory() {
        // @TODO: Use Electron process in production
        return puppeteer.launch();
        /*const executablePath = puppeteer.executablePath();
        console.log(executablePath);

        // const executablePath = join(process.cwd(), 'node_modules/electron/dist/chrome-sandbox');

        return puppeteer.launch({
          //args: ['--no-sandbox', '--disable-setuid-sandbox'],
          executablePath,
        });*/
      },
    }
  ],
  exports: [
    HttpModule,
    BROWSER,
  ],
})
export class CommonModule {}
