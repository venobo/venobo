import { Field, Int, ObjectType } from 'type-graphql';

import { TorrentHealth, TorrentQuality, TorrentResolution } from '../enums';
import { TorrentCodec } from './torrent-codec.type';

@ObjectType()
export class TorrentMetadata {
  @Field()
  magnet: string;

  @Field()
  provider: string;

  @Field()
  metadata: string;

  @Field(() => Int)
  seeders: number;

  @Field(() => Int, { nullable: true })
  leechers?: number;

  @Field({ nullable: true })
  verified?: boolean;

  @Field(() => TorrentHealth)
  health: TorrentHealth;

  @Field(() => TorrentResolution)
  resolution: TorrentResolution;

  @Field(() => TorrentQuality)
  quality: TorrentQuality;

  @Field(() => TorrentCodec, { nullable: true })
  codec?: TorrentCodec;

  @Field()
  size: string;
}
