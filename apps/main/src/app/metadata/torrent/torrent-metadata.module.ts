import { DynamicModule, Module, Type } from '@nestjs/common';

import { CommonModule } from '../../common';

import { TORRENT_METADATA_PROVIDERS } from './tokens';
import { TorrentMetadataService } from './torrent-metadata.service';
import { TorrentMetadataResolver } from './torrent-metadata.resolver';

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
export class TorrentMetadataModule {
  static forRoot(providers: Type<any>[]): DynamicModule {
    return {
      module: TorrentMetadataModule,
      providers: [
        ...providers,
        {
          provide: TORRENT_METADATA_PROVIDERS,
          useValue: providers,
        },
      ],
    };
  }
}
