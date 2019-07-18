import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { UnknownTorrentProviderException } from '../exceptions';
import { TorrentProviderMetadata } from '../torrent-metadata.interface';
import { constructMagnet } from '../utils';
import { TorrentMetadataSearchInput } from '../types';
import { YtsMovieTorrent, YtsResponse } from './yts-torrent.interface';
import { BaseTorrentProvider } from './base-torrent.provider';
import { MetadataType } from '../../types';

@Injectable()
export class YtsTorrentProvider extends BaseTorrentProvider {
  domains = ['yts.lt', 'yts.unblocked.lc'];
  provider = '';
  endpoint: string;

  private createEndpoint(domain: string): string {
    return `https://${domain}/api/v2/list_movies.json`;
  }

  private fetch(query: string): Observable<YtsResponse> {
    if (!this.endpoint) {
      throw new UnknownTorrentProviderException(
        YtsTorrentProvider,
      );
    }

    return this.http.get<YtsResponse>(this.endpoint, {
      params: {
        query_term: query,
        order_by: 'desc',
        sort_by: 'seeds',
        limit: 50,
      },
    }).pipe(
      pluck('data'),
    );
  }

  private formatTorrent(torrent: YtsMovieTorrent): TorrentProviderMetadata {
    return {
      metadata: torrent.url + torrent.hash || torrent.hash,
      magnet: constructMagnet(torrent.hash),
      provider: this.provider,
      // resolution: torrent.quality,
      seeders: torrent.seeds,
      leechers: torrent.peers,
      verified: true,
    };
  }

  async create() {
    const endpoints = this.domains.map(domain => {
      return this.createEndpoint(domain);
    });

    this.endpoint = await this.getReliableEndpoint(endpoints);
  }

  provide({ imdbId, query, type }: TorrentMetadataSearchInput): Observable<TorrentProviderMetadata[]> {
    switch (type) {
      case MetadataType.MOVIE:
        return this.fetch(imdbId || query)
          .pipe(map(({ data }) => {
            if (data.movie_count === 0) return [];

            return data.movies.flatMap(({ torrents }) =>
              torrents.map(torrent =>
                this.formatTorrent(torrent),
              ),
            );
          }));

      default:
        return of([]);
    }
  }
}
