import { Module, Type } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NestFactory } from '@nestjs/core';

import { MetadataModule, TMDbMetadataProvider } from './metadata';

export async function startServer(entryModule: Type<any>, port: number) {
  const app = await NestFactory.create(entryModule);
  app.enableShutdownHooks();

  await app.listen(port, () => {
    console.log(`GraphQL server listening on port ${port}`);
  });
}

export function createServerModule(...imports: Type<any>[]) {
  @Module({
    imports: [
      GraphQLModule.forRoot({
        installSubscriptionHandlers: true,
        resolverValidationOptions: {
          requireResolversForResolveType: false,
        },
        autoSchemaFile: true,
      }),
      MetadataModule.forRoot(TMDbMetadataProvider),
      ...imports,
    ],
  })
  class ServerModule {}

  return ServerModule;
}
