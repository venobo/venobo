import { TorrentResolution } from '../enums';

export interface YtsDate {
  date_uploaded: string;
  date_uploaded_unix: number;
  url: string;
}

export interface YtsMovieTorrent extends YtsDate {
  hash: string;
  peers: number;
  seeds: number;
  // Quality is usually WEBRIP, BLU-RAY, ETC, but here it's resolution
  quality: TorrentResolution;
  size: string;
  size_bytes: number;
}

export interface YtsMovieData extends YtsDate {
  description_full: string;
  genres: string[];
  id: number;
  imdb_code: string;
  language: string;
  large_cover_image: string;
  medium_cover_image: string;
  small_cover_image: string;
  mpa_rating: string;
  rating: number;
  runtime: number;
  slug: string;
  state: string;
  summary: string;
  synopsis: string;
  title: string;
  title_english: string;
  title_long: string;
  torrents: YtsMovieTorrent[];
  year: number;
  yt_trailer_code: string;
}

export interface YtsResponseData {
  limit: number;
  movie_count: number;
  movies: YtsMovieData[];
}

export interface YtsResponse {
  status: string;
  status_message: string;
  data: YtsResponseData;
}
