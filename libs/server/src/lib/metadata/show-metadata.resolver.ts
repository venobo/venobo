import { ResolveProperty, Resolver } from '@nestjs/graphql';

import { ShowEpisodeMetadata, ShowMetadata } from './types';

@Resolver(() => ShowMetadata)
export class ShowMetadataResolver {
  @ResolveProperty()
  async seasonEpisodes(): Promise<ShowEpisodeMetadata> {
    return null;
  }
}
