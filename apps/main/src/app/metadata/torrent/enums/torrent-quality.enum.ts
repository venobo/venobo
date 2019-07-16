import { registerEnumType } from 'type-graphql';

export enum TorrentQuality {
  WEB_DL = 'WEB-DL',
  WEBRIP = 'WEBRIP',
  HDRip = 'HDRip',
  BRRip = 'BRRip',
  DVDRip = 'DVDRip',
}

registerEnumType(TorrentQuality, {
  name: 'TorrentQuality',
});
