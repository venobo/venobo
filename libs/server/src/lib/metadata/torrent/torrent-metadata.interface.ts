import { WithOptional } from '../../common';
import { TorrentMetadata } from './types';

export type TorrentProviderMetadata = WithOptional<Omit<TorrentMetadata, 'resolution' | 'codec'>, 'health' | 'quality' | 'size'>;
