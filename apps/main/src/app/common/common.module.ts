import { HttpModule, Module } from '@nestjs/common';
import { app } from 'electron';

import { APP } from './tokens';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: APP,
      useValue: app,
    },
  ],
  exports: [HttpModule],
})
export class CommonModule {}
