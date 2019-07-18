import { HttpService, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

import { MetadataMap, MetadataType, MetadataUnion, ShowEpisodeMetadata } from '../types';

export abstract class BaseMetadataProvider {
  @Inject(HttpService)
  protected readonly http: HttpService;

  abstract getSimilar<K extends keyof MetadataMap>(type: K, tmdbId: number): Observable<MetadataMap[K][]>;
  abstract getRecommendations<K extends keyof MetadataMap>(type: K, tmdbId: number): Observable<MetadataMap[K][]>;
  abstract getPopular<K extends keyof MetadataMap>(type: K, page: number): Observable<MetadataMap[K][]>;
  abstract getTopRated<K extends keyof MetadataMap>(type: K, page: number): Observable<MetadataMap[K][]>;
  abstract get<K extends keyof MetadataMap>(type: K, tmdbId: number): Observable<MetadataMap[K]>;
  // abstract getShowSeason(tmdbId: number, season: number): Observable<any>;
  // abstract getShowSeasonEpisode(tmdbId: number, season: number, episode: number): Observable<ShowEpisodeMetadata>;
  abstract discover<K extends keyof MetadataMap>(type: MetadataType, params?: any): Observable<MetadataMap[K][]>;
  abstract searchAll(query: string, page: number): Observable<MetadataUnion[]>;
  abstract formatEpisodePoster(path: string): string;
  abstract formatBackdrop(path: string): string;
  abstract formatPoster(path: string): string;
}

