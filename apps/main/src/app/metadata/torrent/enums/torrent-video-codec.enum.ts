import { registerEnumType } from 'type-graphql';

export enum TorrentVideoCodec {
  XviD = 'XviD',
  x265 = 'x265',
  x264 = 'x264',
  HEVC = 'HEVC',
}

registerEnumType(TorrentVideoCodec, {
  name: 'TorrentVideoCodec',
});
