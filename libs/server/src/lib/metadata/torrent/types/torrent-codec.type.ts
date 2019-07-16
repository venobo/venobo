import { Field, ObjectType } from 'type-graphql';

import { TorrentAudioCodec, TorrentVideoCodec } from '../enums';

@ObjectType()
export class TorrentCodec {
  @Field(() => TorrentAudioCodec)
  audio: TorrentAudioCodec;

  @Field(() => TorrentVideoCodec)
  video: TorrentVideoCodec;
}
