/* tslint:disable */
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Metadata = {
  __typename?: 'Metadata';
  torrent?: Maybe<TorrentMetadata>;
};

export type Query = {
  __typename?: 'Query';
  availableTorrentMetadataProviders: Array<Scalars['String']>;
};

export enum TorrentAudioCodec {
  AC3 = 'AC3',
  MP3 = 'MP3',
  TRUE_HD = 'TRUE_HD',
  DTS = 'DTS',
  AAC = 'AAC',
}

export type TorrentCodec = {
  __typename?: 'TorrentCodec';
  audio: TorrentAudioCodec;
  video: TorrentVideoCodec;
};

export enum TorrentHealth {
  POOR = 'POOR',
  DECENT = 'DECENT',
  HEALTHY = 'HEALTHY',
  UNKNOWN = 'UNKNOWN',
}

export type TorrentMetadata = {
  __typename?: 'TorrentMetadata';
  magnet: Scalars['String'];
  provider: Scalars['String'];
  metadata: Scalars['String'];
  seeders: Scalars['Int'];
  leechers?: Maybe<Scalars['Int']>;
  verified?: Maybe<Scalars['Boolean']>;
  health: TorrentHealth;
  resolution: TorrentResolution;
  quality: TorrentQuality;
  codec?: Maybe<TorrentCodec>;
  size: Scalars['String'];
};

export enum TorrentQuality {
  WEB_DL = 'WEB_DL',
  WEBRIP = 'WEBRIP',
  HDRIP = 'HDRip',
  BRRIP = 'BRRip',
  DVDRIP = 'DVDRip',
}

export enum TorrentResolution {
  SD = 'SD',
}

export enum TorrentVideoCodec {
  XVID = 'XviD',
  X265 = 'x265',
  X264 = 'x264',
  HEVC = 'HEVC',
}
