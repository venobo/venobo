import { Module } from '@nestjs/common';

import { iDopeTorrentProvider, TorrentMetadataModule, YtsTorrentProvider } from './torrent';
import { MetadataResolver } from './metadata.resolver';
import { MetadataService } from './metadata.service';

@Module({
  imports: [
    TorrentMetadataModule.forRoot([
      YtsTorrentProvider,
      iDopeTorrentProvider,
    ]),
  ],
  providers: [
    MetadataService,
    MetadataResolver,
  ],
})
export class MetadataModule {}
