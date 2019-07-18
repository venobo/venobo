import { registerEnumType } from 'type-graphql';

export enum MetadataType {
  MOVIE = 'movie',
  TV = 'tv',
  // SHOW = 'show
  // EPISODE = 'episode',
  // SEASON = 'season',
}

registerEnumType(MetadataType, {
  name: 'MetadataType',
});
