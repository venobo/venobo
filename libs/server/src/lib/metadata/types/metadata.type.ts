import { Field, ObjectType } from 'type-graphql';

import { TorrentMetadata } from '../torrent';

@ObjectType()
export class Metadata {
  @Field(() => TorrentMetadata, { nullable: true })
  torrent?: TorrentMetadata;
}
