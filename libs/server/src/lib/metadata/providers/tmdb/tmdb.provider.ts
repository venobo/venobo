import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { environment } from '@venobo/environment/main';

import { BaseMetadataProvider } from '../base-metadata.provider';
import { MetadataMap, MetadataType, MetadataUnion, MovieMetadata } from '../../types';
import {
  TMDbMediaType,
  TMDbMovieResponse,
  TMDbResponseUnion,
  TMDbResultsResponse,
  TMDbShowResponse,
} from './tmdb-provider.interface';

@Injectable()
export class TMDbMetadataProvider extends BaseMetadataProvider {
  private fetch<T = TMDbResultsResponse>(url: string, params: any = {}): Observable<T> {
    return this.http.get<T>(`${environment.tmdb.api}/${url}`, {
      params: {
        api_key: environment.tmdb.apiKey,
        append_to_response: environment.tmdb.appendToResponse,
        // @TODO: This should come from user settings
        language: '<ietf>',
        ...params,
      },
    }).pipe(
      pluck('data'),
    );
  }

  private convertMediaType(mediaType: TMDbMediaType): MetadataType {
    console.log(mediaType);

    switch (mediaType) {
      case TMDbMediaType.MOVIE:
        return MetadataType.MOVIE;

      case TMDbMediaType.TV:
        return MetadataType.TV;

      default:
        return null;
    }
  }

  private formatReleaseYear(date: string): number | null {
    return date ? +date.substring(0, 4) : null;
  }

  private formatMetadata(type: MetadataType, data: any): any {
    switch (type) {
      case MetadataType.MOVIE:
        return this.formatMovieMetadata(data);

      case MetadataType.TV:
        return null;

      default:
        return null;
    }
  }

  private formatMovieMetadata(data: TMDbMovieResponse): MovieMetadata {
    return {
      title: data.title,
      imdb: data.imdb_id,
      originalTitle: data.original_title,
      poster: this.formatPoster(data.poster_path),
      backdrop: this.formatBackdrop(data.backdrop_path),
      genres: (data.genres || []).map(({ name }) => name),
      type: MetadataType.MOVIE,
      summary: data.overview,
      popularity: data.popularity,
      id: data.id,
      year: this.formatReleaseYear(data.release_date),
      voted: data.vote_average,
      votes: data.vote_count,
      releaseDate: data.release_date,
      runtime: data.runtime ? `${data.runtime}min` : 'N/A',
    };
  }

  formatEpisodePoster(path: string) {
    return environment.tmdb.still + path;
  }

  formatBackdrop(path: string) {
    return environment.tmdb.backdrop + path;
  }

  formatPoster(path: string) {
    return environment.tmdb.poster + path;
  }

  getSimilar(type: MetadataType, tmdbId: number): Observable<any[]> {
    return this.fetch(`${type}/${tmdbId}/similar`)
      .pipe(map(({ results }) => {
        return results.map(data => this.formatMetadata(type, data))
      }));
  }

  getRecommendations(type: MetadataType, tmdbId: number): Observable<any[]> {
    return this.fetch(`${type}/${tmdbId}/recommendations`)
      .pipe(map(({ results }) => {
        return results.map(data => this.formatMetadata(type, data))
      }));
  }

  getPopular(type: MetadataType, page: number): Observable<any[]> {
    return this.fetch(`${type}/popular`, { page })
      .pipe(map(({ results }) => {
        return results.map(data => this.formatMetadata(type, data))
      }));
  }

  getTopRated(type: MetadataType, page: number): Observable<any[]> {
    return this.fetch(`${type}/top_rated`, { page })
      .pipe(map(({ results }) => {
        return results.map(data => this.formatMetadata(type, data))
      }));
  }

  get(type: MetadataType, tmdbId: number): Observable<any> {
    return this.fetch<TMDbResponseUnion>(`${type}/${tmdbId}`)
      .pipe(map(data => this.formatMetadata(type, data)));
  }

  getShowSeason(tmdbId: number, season: number) {
    return this.fetch(`tv/${tmdbId}/season/${season}`)
      .pipe(map(data => this.formatMetadata(MetadataType.TV, data)));
  }

  getShowSeasonEpisode(tmdbId: number, season: number, episode: number) {
    return this.fetch(`tv/${tmdbId}/season/${season}/episode/${episode}`);
  }

  discover(type: MetadataType, params: any = {}): Observable<any[]> {
    return this.fetch(`discover/${type}`, params)
      .pipe(map(({ results }) => {
        return results.map(data => this.formatMetadata(type, data))
      }));
  }

  searchAll(query: string, page: number) {
    return this.fetch('search/multi', {
      include_adult: true,
      page,
      query,
    })
      .pipe(map(({ results }) => {
        return results.map(data => this.formatMetadata(
          this.convertMediaType(data.media_type),
          data,
        ));
      }));
  }
}
