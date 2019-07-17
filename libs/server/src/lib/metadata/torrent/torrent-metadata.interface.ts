import { TorrentAudioCodec, TorrentVideoCodec } from './enums';

export interface TorrentMetadataExtendedDetails {
  imdbId?: string;
  season?: number | string;
  episode?: number | string;
}

export interface TorrentCodecs {
  audio: TorrentAudioCodec;
  video: TorrentVideoCodec;
}
