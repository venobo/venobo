import { NestFactory } from '@nestjs/core';
import { Type } from '@nestjs/common';

import { environment } from './environments/environment';
import { createServerModule } from './app/create-server-module';

(async () => {
  const imports: Type<any>[] = [];

  if (!environment.serverOnly) {
    const { ElectronModule } = await import('./app/electron');
    imports.push(ElectronModule);
  }

  const app = await NestFactory.create(
    createServerModule(imports),
  );

  await app.listen(environment.port, () => {
    console.log(`Main server listening on port ${environment.port}`);
  });
})();
