import { NestFactory } from '@nestjs/core';
import { environment } from '@venobo/environment/main';

(async () => {
  if (environment.isElectron()) {
    const { ElectronModule } = await import('./app/electron');

    if (environment.production) {
      const { createServerModule, startServer } = await import('@venobo/server');

      return await startServer(
        createServerModule(ElectronModule),
        environment.port,
      );
    }

    await NestFactory.createApplicationContext(ElectronModule);
  } else {
    const { createServerModule, startServer } = await import('@venobo/server');

    await startServer(
      createServerModule(),
      environment.port,
    );
  }
})();
