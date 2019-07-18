import { DynamicModule, Module, OnModuleInit, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { CommonModule } from '../../common';

import { TORRENT_METADATA_PROVIDERS } from './tokens';
import { TorrentMetadataService } from './torrent-metadata.service';
import { TorrentMetadataResolver } from './torrent-metadata.resolver';
import { BaseTorrentProvider } from './providers';

@Module({
  imports: [CommonModule],
  providers: [
    TorrentMetadataService,
    TorrentMetadataResolver,
  ],
  exports: [
    TorrentMetadataService,
  ],
})
export class TorrentMetadataModule implements OnModuleInit {
  constructor(private readonly torrentMetadata: TorrentMetadataService) {}

  static forRoot(providers: Type<BaseTorrentProvider>[]): DynamicModule {
    return {
      module: TorrentMetadataModule,
      providers: [
        ...providers,
        {
          provide: TORRENT_METADATA_PROVIDERS,
          useFactory: (...instances: BaseTorrentProvider[]) => instances,
          inject: providers,
        },
      ],
    };
  }

  async onModuleInit() {
    await this.torrentMetadata.createProviders();
  }
}
