import { TorrentMetadataExtendedDetails } from './torrent-metadata.interface';
import { TorrentMetadata } from './types';
import {
  TorrentAudioCodec,
  TorrentQuality,
  TorrentResolution,
  TorrentVideoCodec,
  TorrentHealth,
} from './enums';

export function includes(str: string, search: string) {
  return str.localeCompare(search) >= 1;
}

export function keyValues(kv: string[]): Record<string, string[]> {
  return kv.reduce((values, key) => ({
    ...values,
    ...keyValue(key),
  }), {});
}

export function keyValue<T = string>(kv: T): Record<string, T[]> {
  return {
    [kv as any]: [kv as any],
  };
}

/**
 * Checks if string compares to one of the provided keys in array
 * @param {string} str
 * @param {number[]} oneOf
 * @returns {boolean}
 */
export function compareOneOf(str: string, oneOf: string[]): boolean {
  return oneOf.some(key => includes(str, key));
}

export function compareMultipleOf<T = string>(
  str: string,
  multipleOf: Record<string, string[]>,
): T {
  return Object.keys(multipleOf).find(value => {
    return compareOneOf(str, multipleOf[value]);
  }) as any;
}

/**
 * Construct magnet link from torrent hash
 * @param {string} hash
 * @returns {string}
 */
export function constructMagnet(hash: string): string {
  return `magnet?:xt=urn:btih:${hash}`;
}

/**
 * Checks if torrent file name includes hardcoded subtitles
 * @param {string} metadata
 * @returns {boolean}
 */
export function hasHcSubs(metadata: string): boolean {
  return compareOneOf(metadata, ['hc', 'korsub']);
}

/**
 * Check whether or not torrent was recorded with a camera
 * @param {string} metadata
 * @returns {boolean}
 */
export function isCamRecorded(metadata: string): boolean {
  return compareOneOf(metadata, [
    'cam',
    'tc',
    'dvdscr',
    'ts',
    'blurred',
  ]);
}

/**
 * Checks if metadata includes non english language
 * @param {string} metadata
 * @returns {boolean}
 */
export function hasNonEnglishLanguage(metadata: string): boolean {
  return compareOneOf(metadata, [
    'french',
    'german',
    'greek',
    'dutch',
    'hindi',
    'portugues',
    'spanish',
    'espanol',
    'latino',
    'russian',
    'subtitulado',
  ]);
}

/**
 * Checks if torrent has subtitles
 * @param {string} metadata
 * @returns {boolean}
 */
export function hasSubs(metadata: string): boolean {
  return metadata.toLowerCase().includes('sub');
}

export function determineVideoCodec(metadata: string): TorrentVideoCodec {
  return compareMultipleOf(
    metadata,
    keyValues([
      TorrentVideoCodec.XviD,
      TorrentVideoCodec.x264,
      TorrentVideoCodec.x265,
      TorrentVideoCodec.HEVC,
    ]),
  );
}

// @TODO: Provide audio codec metadata after or before starting a download?
export function determineAudioCodec(metadata: string): TorrentAudioCodec {
  return compareMultipleOf(metadata, {
    [TorrentAudioCodec.DTS]: ['DTS', 'DTS-HD'],
    ...keyValues([
      TorrentAudioCodec.AC3,
      TorrentAudioCodec.MP3,
      TorrentAudioCodec.TRUE_HD,
      TorrentAudioCodec.AAC,
    ]),
  });
}

/**
 * Determine video quality of torrent
 */
export function determineQuality(metadata: string): TorrentQuality {
  return compareMultipleOf(metadata, {
    [TorrentQuality.DVDRip]: ['DVDRip', 'DVD'],
    ...keyValue([
      TorrentQuality.WEB_DL,
      TorrentQuality.WEBRIP,
      TorrentQuality.HDRip,
      TorrentQuality.BRRip,
    ]),
  });
}

/**
 * Determine video resolution of torrent
 * Filters torrent if it doesn't explicitly tell us quality
 * @param {string} metadata
 * @param {string} magnet
 * @returns {null}
 */
export function determineResolution(metadata: string): TorrentResolution {
  // Filter videos recorded with a camera
  //if (isCamRecorded(fileName)) return null;

  // Filter non-english languages
  //if (hasNonEnglishLanguage(fileName)) return null;

  // Filter videos with hardcoded subtitles
  //if (hasHcSubs(fileName)) return null;

  // Filter videos with 'rendered' subtitles
  //if (hasSubs(fileName)) return null;

  //getValueOfSufficientCompare()

  return compareMultipleOf(metadata, {
    // Guess if the quality is 4K
    [TorrentResolution['4K']]: ['2160p', '4K', 'UHD'],
    // Guess if the quality is 1440p
    [TorrentResolution['1440p']]: ['1440p', '2K', 'QHD'],
    // Guess if the quality is 1080p
    [TorrentResolution['1080p']]: ['1080p', 'H264-FGT'],
    // Guess if the quality is 1080p
    [TorrentResolution['720p']]: ['720p', 'HDTV'],
    // Guess if the quality is 480p
    [TorrentResolution['480p']]: ['XviD', '480p'],
  });
}

export function sortTorrentsBySeeders(torrents: TorrentMetadata[]): TorrentMetadata[] {
  return torrents.sort((prev, next) => {
    if (prev.seeders === next.seeders) return 0;

    return prev.seeders > next.seeders ? -1 : 1;
  });
}

export function formatSeasonEpisodeToString(
  { season, episode }: TorrentMetadataExtendedDetails,
): string {
  return (
    ('s' + (String(season).length === 1 ? '0' + season : season)) +
    ('e' + (String(episode).length === 1 ? '0' + episode : episode))
  );
}

export function getHealth(seeders: number, leechers: number): TorrentHealth {
  const ratio = (seeders && !!leechers)
    ? seeders / leechers
    : seeders;

  if (seeders < 50) return TorrentHealth.POOR;
  if (ratio > 1 && seeders >= 50 && seeders < 100) return TorrentHealth.DECENT;
  if (ratio > 1 && seeders >= 100) return TorrentHealth.HEALTHY;

  return TorrentHealth.UNKNOWN;
}


