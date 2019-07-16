import { registerEnumType } from 'type-graphql';

export enum TorrentAudioCodec {
  AC3 = 'AC3',
  MP3 = 'MP3',
  TRUE_HD = 'TrueHD',
  DTS = 'DTS-HD',
  AAC = 'AAC',
}

registerEnumType(TorrentAudioCodec, {
  name: 'TorrentAudioCodec',
});
