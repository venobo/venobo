import { Args, Parent, ResolveProperty, Resolver, Query } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { Observable } from 'rxjs';

import { MetadataType, MovieMetadata } from './types';
import { TorrentMetadata, TorrentMetadataService } from './torrent';
import { MetadataService } from './metadata.service';

@Resolver(() => MovieMetadata)
export class MovieMetadataResolver {
  constructor(
    private readonly metadata: MetadataService,
    private readonly torrentMetadata: TorrentMetadataService,
  ) {}

  @ResolveProperty()
  torrents(@Parent() { originalTitle, imdb }: MovieMetadata) {
    return this.torrentMetadata.search({
      type: MetadataType.MOVIE,
      query: originalTitle,
      imdbId: imdb,
    });
  }

  @Query(() => [MovieMetadata])
  topRatedMovies(@Args({ name: 'page', type: () => Int }) page: number) {
    return this.metadata.getTopRated(MetadataType.MOVIE, page);
  }
}
