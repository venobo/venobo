import { Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/common';

import { MetadataUnion } from './types';

@Resolver()
export class MetadataResolver {
  //@Query(() => [MetadataUnion])
  //search() {}
}
