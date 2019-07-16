import { NestFactory } from '@nestjs/core';
import { environment } from '@venobo/environment/main';

(async () => {
  if (environment.isElectron) {
    const { ElectronModule } = await import('./app/electron');
    await NestFactory.createApplicationContext(ElectronModule);
  } else {
    const { ServerModule } = await import('@venobo/server');
    const app = await NestFactory.create(ServerModule);

    await app.listen(environment.port, () => {
      console.log(`GraphQL API server listening on port ${environment.port}`);
    });
  }
})();
