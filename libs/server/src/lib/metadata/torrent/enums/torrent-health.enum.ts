import { registerEnumType } from 'type-graphql';

export enum TorrentHealth {
  POOR = 'poor',
  DECENT = 'decent',
  HEALTHY = 'healthy',
  UNKNOWN = 'unknown',
}

registerEnumType(TorrentHealth, {
  name: 'TorrentHealth',
});
