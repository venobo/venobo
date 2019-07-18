export interface TMDbGenre {
  id: number;
  name: string;
}

export enum TMDbMediaType {
  MOVIE = 'movie',
  TV = 'tv',
}

export interface TMDbMetadataMap {
  [TMDbMediaType.MOVIE]: TMDbMovieResponse;
  [TMDbMediaType.TV]: TMDbShowResponse;
}

export interface TMDbMetadata {
  poster_path: string;
  backdrop_path: string;
  media_type: TMDbMediaType;
  overview: string;
  popularity: number;
  id: number;
  vote_average: number;
  vote_count: number;
  runtime: number | undefined;
  status: string;
  genres: TMDbGenre[];
  origin_country?: string[];
  genre_ids?: number[];
}

export interface TMDbBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface TMDbMovieResponse extends TMDbMetadata {
  belongs_to_collection?: TMDbBelongsToCollection;
  tagline: string;
  title: string;
  original_title: string;
  release_date: string;
  imdb_id: string;
}

export interface TMDbShowResponse extends TMDbMetadata {
  name: string;
  first_air_date: string;
  number_of_seasons: number;
  original_name: string;
}

export type TMDbResponseUnion = TMDbMovieResponse | TMDbShowResponse;

export interface TMDbResultsResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: TMDbResponseUnion[];
}
