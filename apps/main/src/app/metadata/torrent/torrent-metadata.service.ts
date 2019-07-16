import { Inject, Injectable } from '@nestjs/common';
import { TorrentMetadataExtendedDetails } from './torrent-metadata.interface';
import { formatSeasonEpisodeToString, includes } from './utils';
import { TORRENT_METADATA_PROVIDERS } from './tokens';
import { BaseTorrentProvider } from './providers';
import { TorrentMetadata } from './types';

@Injectable()
export class TorrentMetadataService {
  constructor(
    @Inject(TORRENT_METADATA_PROVIDERS)
    private readonly allProviders: BaseTorrentProvider[],
  ) {}

  private filterShow(
    show: Pick<TorrentMetadata, 'metadata' | 'seeders'>,
    extendedDetails: TorrentMetadataExtendedDetails,
  ): boolean {
    return includes(
      show.metadata,
      formatSeasonEpisodeToString(extendedDetails),
    ) && show.seeders > 0;
  }


}
