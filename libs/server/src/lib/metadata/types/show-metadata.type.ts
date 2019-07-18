import { Field, Int, ObjectType } from 'type-graphql'

import { ShowEpisodeMetadata } from './show-episode-metadata.type';
import { Metadata } from './metadata.type';

@ObjectType()
export class ShowMetadata extends Metadata {
  @Field(() => Int, { nullable: true })
  episodesCount?: number;

  @Field(() => Int)
  seasonsCount: number;

  @Field(() => [ShowEpisodeMetadata], { nullable: true })
  seasonEpisodes?: ShowEpisodeMetadata[];
}
