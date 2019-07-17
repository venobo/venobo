import { HttpService, Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, pluck, tap } from 'rxjs/operators';

import { UnknownTorrentProviderException } from '../exceptions';
import { TorrentMetadataExtendedDetails } from '../torrent-metadata.interface';
import { TorrentMetadata } from '../types';
import { constructMagnet } from '../utils';

import { YtsMovieTorrent, YtsResponse } from './yts-torrent.interface';
import { BaseTorrentProvider } from './base-torrent.provider';
import { didResolve } from '../../../common';

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

  private formatTorrent(torrent: YtsMovieTorrent): TorrentMetadata {
    return {
      metadata: torrent.url + torrent.hash || torrent.hash,
      magnet: constructMagnet(torrent.hash),
      provider: this.provider,
      resolution: torrent.quality,
      seeders: torrent.seeds,
      leechers: torrent.peers,
      verified: true,
      ///
      health: null,
      codec: null,
      size: null,
      quality: null,
    };
  }

  create(): Promise<boolean> {
    return didResolve(async () => {
      const endpoints = this.domains.map(domain => {
        return this.createEndpoint(domain);
      });

      this.endpoint = await this.getReliableEndpoint(endpoints);
    });
  }

  provide(
    search: string,
    type: string,
    { imdbId }: TorrentMetadataExtendedDetails = {},
  ): Observable<TorrentMetadata[]> {
    switch (type) {
      case 'movies':
        return this.fetch((imdbId || search))
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
