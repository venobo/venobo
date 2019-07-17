import { Inject, Injectable } from '@nestjs/common';
import { forkJoin, zip } from 'rxjs';

import { TorrentMetadataExtendedDetails } from './torrent-metadata.interface';
import { formatSeasonEpisodeToString, includes } from './utils';
import { TORRENT_METADATA_PROVIDERS } from './tokens';
import { BaseTorrentProvider } from './providers';
import { TorrentMetadata } from './types';
import { filterResolved } from '../../common';

@Injectable()
export class TorrentMetadataService {
  public availableProviders: BaseTorrentProvider[];

  constructor(
    @Inject(TORRENT_METADATA_PROVIDERS)
    private readonly allProviders: BaseTorrentProvider[],
  ) {}

  async createProviders() {
    const providerStatuses = await Promise.all(
      this.allProviders.map(provider => provider.create()),
    );

    this.availableProviders = filterResolved(
      this.allProviders,
      providerStatuses,
    );
  }

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
