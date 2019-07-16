import { Module, Type } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { MetadataModule } from './metadata';

export function createServerModule(imports: Type<any>[] = []) {
  @Module({
    imports: [
      GraphQLModule.forRoot({
        installSubscriptionHandlers: true,
        resolverValidationOptions: {
          requireResolversForResolveType: false,
        },
        autoSchemaFile: true,
      }),
      MetadataModule,
      ...imports,
    ],
  })
  class ServerModule {}

  return ServerModule;
}

