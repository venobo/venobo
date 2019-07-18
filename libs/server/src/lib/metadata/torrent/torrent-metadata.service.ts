import { Inject, Injectable } from '@nestjs/common';
import { forkJoin, Observable, zip } from 'rxjs';

import { TorrentProviderMetadata } from './torrent-metadata.interface';
import { determineQuality, formatSeasonEpisodeToString, getHealth, includes, sortTorrentsBySeeders } from './utils';
import { TORRENT_METADATA_PROVIDERS } from './tokens';
import { BaseTorrentProvider } from './providers';
import { TorrentMetadata, TorrentMetadataSearchInput } from './types';
import { didResolve, filterResolved } from '../../common';
import { map } from 'rxjs/operators';
import { MetadataType } from '../types';

@Injectable()
export class TorrentMetadataService {
  public availableProviders: BaseTorrentProvider[];

  constructor(
    @Inject(TORRENT_METADATA_PROVIDERS)
    private readonly allProviders: BaseTorrentProvider[],
  ) {}

  async createProviders() {
    const providerStatuses = await Promise.all(
      this.allProviders.map(provider =>
        didResolve(() => provider.create()),
      ),
    );

    this.availableProviders = filterResolved(
      this.allProviders,
      providerStatuses,
    );
  }

  private selectTorrents(torrents: TorrentMetadata[]): TorrentMetadata[] {
    return sortTorrentsBySeeders(
      torrents.filter(
        torrent => !!torrent.quality,
      ),
    );
  }

  private appendAttributes(providerResults: TorrentProviderMetadata[], type: string): TorrentMetadata[] {
    return providerResults
      .filter(result => !!result.metadata)
      .map(result => ({
        ...result,
        // missing
        size: null,
        resolution: null,
        health: getHealth(result.seeders, result.leechers),
        quality: !result.quality
          ? determineQuality(result.metadata || result.magnet)
          : result.quality,
      }));
  }

  private filterShow(
    show: Pick<TorrentMetadata, 'metadata' | 'seeders'>,
    season: string | number,
    episode: string | number,
  ): boolean {
    return includes(
      show.metadata,
      formatSeasonEpisodeToString(season, episode),
    ) && show.seeders > 0;
  }

  search(input: TorrentMetadataSearchInput): Observable<TorrentMetadata[]> {
    /*if (!this.availableProviders || this.availableProviders.length === 0) {
      // @TODO: if offline use cache
      throw new Error('search');
    }*/

    return zip(
      ...this.availableProviders.map(provider =>
        provider.provide(input),
      ),
    ).pipe(
      map(results => results.flat()),
      map(results => {
        switch (input.type) {
          case MetadataType.MOVIE:
            return this.selectTorrents(
              this.appendAttributes(results, input.type)
            );
        }
      }),
    );
  }
}
