import { Injectable } from '@nestjs/common';

import { TorrentProviderMetadata } from '../torrent-metadata.interface';
import { formatSeasonEpisodeToString } from '../utils';
import { UnknownTorrentProviderException } from '../exceptions';
import { BaseTorrentProvider } from './base-torrent.provider';
import { TorrentMetadataSearchInput } from '../types';
import { MetadataType } from '../../types';

@Injectable()
// tslint:disable-next-line:class-name
export class iDopeTorrentProvider extends BaseTorrentProvider {
  domains = ['https://idope.se', 'https://idope.unblocked.vet'];
  provider = 'iDope';
  endpoint: string;

  private getUrl(query: string, type: MetadataType, page: number) {
    return `${this.endpoint}/torrent-list/${query}/?c=${type === MetadataType.MOVIE ? 1 : 3}&p=${page}`;
  }

  private async fetch(query: string, type: MetadataType): Promise<TorrentProviderMetadata[]> {
    if (!this.endpoint) {
      throw new UnknownTorrentProviderException(
        iDopeTorrentProvider,
      );
    }

    const url = this.getUrl(query, type, 1);
    const page = await this.browser.newPage();
    await page.goto(url);

    const metadata = await page.evaluate(provider => {
      return Array.from(document.querySelectorAll('.resultdiv')).map((el: HTMLElement) => {
        const top = el.querySelector('.resultdivtop');
        const bottom = el.querySelector('.resultdivbotton');
        const magnet = bottom.querySelector('.hideinfohash').textContent;

        return {
          metadata: top.querySelector('.resultdivtopname').textContent.trim(),
          size: bottom.querySelector('.resultdivbottonlength').textContent,
          seeders: Number(bottom.querySelector('.resultdivbottonseed').textContent),
          // constructMagnet
          magnet:  `magnet?:xt=urn:btih:${magnet}`,
          provider,
        };
      });
    }, this.provider);

    await page.close();

    return metadata;
  }

  async create() {
    this.endpoint = await this.getReliableEndpoint(this.domains);
  }

  async provide({ query, type, season, episode }: TorrentMetadataSearchInput): Promise<TorrentProviderMetadata[]> {
    switch (type) {
      case MetadataType.MOVIE:
        return await this.fetch(query, type);

      case MetadataType.TV:
        return await this.fetch(`${query} ${formatSeasonEpisodeToString(season, episode)}`, type);

      default:
        return [];
    }
  }
}
