import { Resolver } from '@nestjs/graphql';

import { Metadata } from './types';

@Resolver(() => Metadata)
export class MetadataResolver {}
