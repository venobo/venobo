import { Injectable } from '@nestjs/common';

import { BaseTorrentProvider } from './base-torrent.provider';

@Injectable()
export class RarbgTorrentProvider extends BaseTorrentProvider {
  domains = ['https://unblockedrarbg.org'];
  provider = 'Rarbg';
}
