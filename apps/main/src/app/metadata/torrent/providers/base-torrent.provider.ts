import { Observable, race } from 'rxjs';
import { mapTo, timeout } from 'rxjs/operators';
import { HttpService } from '@nestjs/common';
import { ResponseType } from 'axios';

import { TorrentMetadataExtendedDetails } from '../torrent-metadata.interface';
import { TorrentMetadata } from '../types';

export abstract class BaseTorrentProvider {
  protected abstract readonly http: HttpService;

  /**
   * Endpoint domains
   */
  protected abstract readonly domains?: string[];

  /**
   * Endpoint
  protected abstract endpoint?: string;*/

  /**
   * Torrent index prover
   */
  public abstract readonly provider: string;

  /**
   * Get status of torrent endpoint
   * @returns {Promise<boolean>}
   */
  public abstract create(): Promise<any> | Observable<any>;

  /**
   * Fetch movies / shows depending on IMDb ID
   * @param {string} search
   * @param {string} type
   * @param {ExtendedDetails} extendedDetails
   * @returns {Promise<ITorrent[]>}
   */
  public abstract provide(
    search: string,
    type: string,
    extendedDetails: TorrentMetadataExtendedDetails,
  ): Observable<TorrentMetadata[]>;

  /**
   * Get endpoint URL by requesting the different domains
   * and picking the first one that completes
   */
  protected getReliableEndpoint(
    endpoints: string[],
    responseType: ResponseType = 'text',
    dueTimeout = 3000,
  ): Observable<string> {
    return race(
      ...endpoints.map(endpoint =>
        this.http.get<string>(endpoint, { responseType })
          .pipe(timeout(dueTimeout), mapTo(endpoint)),
      ),
    );
  }
}
