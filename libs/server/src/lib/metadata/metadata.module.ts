import { Module, Type } from '@nestjs/common';

import { CommonModule } from '../common';

import { iDopeTorrentProvider, TorrentMetadataModule, YtsTorrentProvider } from './torrent';
import { MetadataService } from './metadata.service';
import { MovieMetadataResolver } from './movie-metadata.resolver';
import { ShowMetadataResolver } from './show-metadata.resolver';
import { ShowEpisodeMetadataResolver } from './show-episode-metadata.resolver';
import { BaseMetadataProvider } from './providers';
import { METADATA_PROVIDER } from './tokens';

@Module({
  imports: [
    CommonModule,
    TorrentMetadataModule.forRoot([
      YtsTorrentProvider,
      iDopeTorrentProvider,
    ]),
  ],
  providers: [
    MetadataService,
    MovieMetadataResolver,
    ShowMetadataResolver,
    ShowEpisodeMetadataResolver,
  ],
  exports: [
    MetadataService,
  ],
})
export class MetadataModule {
  static forRoot(provider: Type<BaseMetadataProvider>) {
    return {
      module: MetadataModule,
      providers: [
        provider,
        {
          provide: METADATA_PROVIDER,
          useExisting: provider,
        },
      ],
    };
  }
}
