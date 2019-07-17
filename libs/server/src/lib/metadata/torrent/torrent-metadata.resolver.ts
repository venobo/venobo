import { Query, Resolver } from '@nestjs/graphql';

import { TorrentMetadata } from './types';
import { TorrentMetadataService } from './torrent-metadata.service';

@Resolver(() => TorrentMetadata)
export class TorrentMetadataResolver {
  constructor(private readonly torrentMetadata: TorrentMetadataService) {}

  @Query(() => [String])
  async availableTorrentMetadataProviders() {
    return this.torrentMetadata.availableProviders.map(({ provider }) => provider);
  }
}
