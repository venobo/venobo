import { Args, Query, Resolver } from '@nestjs/graphql';

import { TorrentMetadata, TorrentMetadataSearchInput } from './types';
import { TorrentMetadataService } from './torrent-metadata.service';

@Resolver(() => TorrentMetadata)
export class TorrentMetadataResolver {
  constructor(private readonly torrentMetadata: TorrentMetadataService) {}

  @Query(() => [String])
  availableTorrentMetadataProviders() {
    return this.torrentMetadata.availableProviders.map(({ provider }) => provider);
  }

  @Query(() => [TorrentMetadata])
  searchTorrentMetadata(
    @Args('data') data: TorrentMetadataSearchInput,
  ) {
    return this.torrentMetadata.search(data);
  }
}
