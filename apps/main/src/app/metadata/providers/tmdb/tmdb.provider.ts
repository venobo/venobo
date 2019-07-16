import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { TMDbResponse, TMDbShowResponse } from './tmdb-provider.interface';

export type TMDbType = 'shows' | 'movie';

@Injectable()
export class TMDbProvider {
  constructor(private readonly http: HttpService) {}

  private fetch<T = TMDbResponse>(url: string, params: any = {}): Observable<T> {
    return this.http.get<T>(url, {
      params: {
        api_key: '<api-key>',
        language: '<ietf>',
        append_to_response: '<append-to-response>',
        ...params,
      },
    }).pipe(
      pluck('data'),
    );
  }

  public getSimilar(type: TMDbType, tmdbId: number): Observable<TMDbResponse> {
    return this.fetch(`${type}/${tmdbId}/similar`);
  }

  public getRecommendations(type: TMDbType, tmdbId: number): Observable<TMDbResponse> {
    return this.fetch(`${type}/${tmdbId}/recommendations`);
  }

  public getPopular(type: TMDbType, page: number): Observable<TMDbResponse> {
    return this.fetch(`${type}/popular`, { page });
  }

  public getTopRated(type: TMDbType, page: number): Observable<TMDbResponse> {
    return this.fetch(`${type}/top_rated`, { page });
  }

  public get(type: TMDbType, tmdbId: number): Observable<TMDbResponse> {
    return this.fetch(`${type}/${tmdbId}`);
  }

  public getShowSeason(tmdbId: number, season: number): Observable<TMDbShowResponse> {
    return this.fetch(`tv/${tmdbId}/season/${season}`);
  }

  public getShowSeasonEpisode(tmdbId: number, season: number, episode: number) {
    return this.fetch(`tv/${tmdbId}/season/${season}/episode/${episode}`);
  }

  public discover(type: TMDbType, params: any = {}) {
    return this.fetch(`discover/${type}`, params);
  }

  public searchAll(query: string, page: number) {
    return this.fetch('search/multi', {
      include_adult: true,
      page,
      query,
    });
  }
}
