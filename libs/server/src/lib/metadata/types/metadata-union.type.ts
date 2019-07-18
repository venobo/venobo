import { createUnionType } from 'type-graphql';

import { MovieMetadata } from './movie-metadata.type';
import { ShowMetadata } from './show-metadata.type';
import { MetadataType } from './metadata-type-enum.type';

export type MetadataUnion = MovieMetadata | ShowMetadata;

export interface MetadataMap {
  [MetadataType.MOVIE]: MovieMetadata;
  [MetadataType.TV]: ShowMetadata;
}

export const MetadataUnion = createUnionType({
  name: 'MetadataUnion',
  types: [MovieMetadata, ShowMetadata],
  resolveType({ type }: MovieMetadata | ShowMetadata) {
    switch (type) {
      case MetadataType.MOVIE:
        return MovieMetadata;

      case MetadataType.TV:
        return ShowMetadata;

      default:
        return null;
    }
  }
});
