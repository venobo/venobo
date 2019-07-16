import { Type } from '@nestjs/common';

export class UnknownTorrentProviderException extends Error {
  constructor(torrentProvider: Type<any>) {
    super(`Missing endpoint in ${torrentProvider.name}`);
    
    this.name = UnknownTorrentProviderException.name;
  }
}
