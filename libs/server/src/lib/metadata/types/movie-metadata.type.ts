import { Field, ID, ObjectType } from 'type-graphql';

import { TorrentMetadata } from '../torrent';
import { Metadata } from './metadata.type';

@ObjectType()
export class MovieMetadata extends Metadata {
  @Field(() => ID)
  imdb: string;

  @Field()
  runtime: string;

  @Field()
  releaseDate: string;

  @Field(() => [TorrentMetadata], { nullable: true })
  torrents?: TorrentMetadata[];
}
