import { Field, Int, ObjectType } from 'type-graphql';

import { TorrentMetadata } from '../torrent';
import { Metadata } from './metadata.type';

@ObjectType()
export class ShowEpisodeMetadata extends Metadata {
  @Field(() => Int)
  episode: number;

  @Field(() => Int)
  season: number;

  @Field()
  airDate: string;

  @Field(() => [TorrentMetadata], { nullable: true })
  torrents?: TorrentMetadata[];
}
