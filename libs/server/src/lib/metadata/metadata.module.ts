import { Module } from '@nestjs/common';

import { TorrentMetadataModule, YtsTorrentProvider } from './torrent';
import { MetadataResolver } from './metadata.resolver';
import { MetadataService } from './metadata.service';

@Module({
  imports: [
    TorrentMetadataModule.forRoot([
      YtsTorrentProvider,
    ]),
  ],
  providers: [
    MetadataService,
    MetadataResolver,
  ],
})
export class MetadataModule {}
