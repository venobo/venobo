import { ResolveProperty, Resolver } from '@nestjs/graphql';

import { ShowEpisodeMetadata } from './types';
import { TorrentMetadata } from './torrent';

@Resolver(() => ShowEpisodeMetadata)
export class ShowEpisodeMetadataResolver {
  @ResolveProperty()
  async torrents(): Promise<TorrentMetadata[]> {
    return null;
  }
}
