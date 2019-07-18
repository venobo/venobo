import { Field, InputType, Int } from 'type-graphql';

import { MetadataType } from '../../types';

@InputType()
export class TorrentMetadataSearchInput {
  @Field({ nullable: true })
  query?: string;

  @Field(() => MetadataType)
  type: MetadataType;

  @Field({ nullable: true })
  imdbId: string;

  @Field(() => Int, { nullable: true })
  season?: number;

  @Field(() => Int, { nullable: true })
  episode?: number;
}
