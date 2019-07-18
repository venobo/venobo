import { Field, Float, Int, ObjectType } from 'type-graphql';

import { MetadataType } from './metadata-type-enum.type';

@ObjectType()
export class Metadata {
  @Field(() => MetadataType)
  type: MetadataType; // used to identify union

  @Field()
  title: string;

  @Field()
  originalTitle: string;

  @Field()
  poster: string;

  @Field()
  backdrop: string;

  @Field(() => [String])
  genres: string[];

  // @Field()
  // type: string;

  @Field()
  summary: string;

  @Field(() => Float)
  popularity: number;

  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => Int)
  voted: number;

  @Field(() => Int)
  votes: number;
}
