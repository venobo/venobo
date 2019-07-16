import { registerEnumType } from 'type-graphql';

export enum TorrentVideoExtension {
  MKV = '.mkv',
  MP4 = '.mp4',
  AVI = '.avi',
}

registerEnumType(TorrentVideoExtension, {
  name: 'TorrentVideoExtension',
});
