import { EMPTY, Observable, of, race, zip } from 'rxjs';
import { catchError, map, mapTo, timeout } from 'rxjs/operators';
import { HttpService, Inject } from '@nestjs/common';
import { ResponseType } from 'axios';

import { TorrentMetadataExtendedDetails } from '../torrent-metadata.interface';
import { TorrentMetadata } from '../types';
import { any } from '../../../common';

export abstract class BaseTorrentProvider {
  @Inject(HttpService)
  protected readonly http: HttpService;

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

  public abstract create(): Promise<boolean>;

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
    dueTimeout = 500,
  ): Promise<string> {
    return any(
      endpoints.map(endpoint =>
        this.http.get<string>(endpoint, { responseType })
          .pipe(timeout(dueTimeout), mapTo(endpoint))
          .toPromise(),
      ),
    );
  }
}
