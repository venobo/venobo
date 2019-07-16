import { Resolver } from '@nestjs/graphql';

import { TorrentMetadata } from './types';

@Resolver(() => TorrentMetadata)
export class TorrentMetadataResolver {}
