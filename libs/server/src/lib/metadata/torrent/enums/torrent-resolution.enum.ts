import { registerEnumType } from 'type-graphql';

export enum TorrentResolution {
  '4K' = '4K',
  '2160p' = '4K',
  '2K' = '1440p',
  '1440p' = '1440p',
  '1080p' = '1080p',
  '720p' = '720p',
  '480p' = '480p',
  'SD' = '480p',
}

registerEnumType(TorrentResolution, {
  name: 'TorrentResolution',
});
