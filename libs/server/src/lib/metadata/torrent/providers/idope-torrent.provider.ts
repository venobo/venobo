import { HttpService, Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as cheerio from 'cheerio';

import { TorrentMetadataExtendedDetails } from '../torrent-metadata.interface';
import { constructMagnet, formatSeasonEpisodeToString } from '../utils';
import { UnknownTorrentProviderException } from '../exceptions';
import { TorrentMetadata } from '../types';

import { BaseTorrentProvider } from './base-torrent.provider';

@Injectable()
// tslint:disable-next-line:class-name
export class iDopeTorrentProvider extends BaseTorrentProvider {
  domains = ['https://idope.se', 'https://idope.unblocked.vet'];
  provider = 'iDope';
  endpoint: string;

  constructor(protected readonly http: HttpService) {
    super();
  }

  private fetch(type: string, query: string): Observable<TorrentMetadata[]> {
    if (!this.endpoint) {
      throw new UnknownTorrentProviderException(
        iDopeTorrentProvider,
      );
    }

    const url = `${this.endpoint}/torrent-list/${query}/`;
    return this.http.get<string>(url, {
      responseType: 'text',
      params: {
        c: type === 'movies' ? 1 : 3,
      },
    })
      .pipe(map(({ data }) => this.parse(data)));
  }

  private parse(html: string): TorrentMetadata[] {
    const $ = cheerio.load(html);
    const { provider } = this;

    return $('.resultdiv').map(function(): TorrentMetadata {
      const $botton = $(this).find('.resultdivbotton');

      return {
        metadata: $(this).find('.resultdivtop .resultdivtopname').text().trim(),
        size: $botton.find('.resultdivbottonlength').text(),
        seeders: Number($botton.find('.resultdivbottonseed').text()),
        // sadly fetching the magnet this way doesnt work lol
        magnet: constructMagnet($botton.find('.hideinfohash').first().text()),
        quality: null,
        resolution: null,
        codec: null,
        leechers: null,
        health: null,
        provider,
      };
    }).get();
  }

  create(): Observable<string> {
    return this.getReliableEndpoint(this.domains).pipe(
      tap(endpoint => this.endpoint = endpoint),
    );
  }

  provide(
    search: string,
    type: string,
    extendedDetails: TorrentMetadataExtendedDetails = {},
  ): Observable<TorrentMetadata[]> {
    switch (type) {
      case 'movies':
        return this.fetch(type, search);

      case 'shows':
        return this.fetch(type,
          `${search} ${formatSeasonEpisodeToString(extendedDetails)}`,
        );

      default:
        return of([]);
    }
  }
}
