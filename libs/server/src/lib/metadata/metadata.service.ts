import { Inject, Injectable } from '@nestjs/common';
import { Observable, zip } from 'rxjs';

import { BaseMetadataProvider } from './providers';
import { MetadataMap, MetadataType, MovieMetadata } from './types';
import { METADATA_PROVIDER } from './tokens';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class MetadataService {
  constructor(
    @Inject(METADATA_PROVIDER)
    private readonly metadataProvider: BaseMetadataProvider,
  ) {}

  private getMethod(type: MetadataType) {
    switch (type) {
      case MetadataType.MOVIE:
        return this.getMovieMetadata.bind(this);
    }
  }

  getMovieMetadata(id: number): Observable<MovieMetadata> {
    return this.metadataProvider.get(MetadataType.MOVIE, id);
  }

  getTopRated<K extends keyof MetadataMap>(type: K, page = 0): Observable<MetadataMap[K][]>  {
    const getMetadata = this.getMethod(type);

    return this.metadataProvider.getTopRated(type, page).pipe(
      mergeMap(results => zip<MetadataMap[K][]>(
        ...results.map(({ id }) => getMetadata(id)),
      )),
    );
  }
}

// MetadataService.prototype.getTopRated(MetadataType.MOVIE)
