import { Observable } from 'rxjs';
import { mapTo, timeout } from 'rxjs/operators';
import { HttpService, Inject } from '@nestjs/common';
import { ResponseType } from 'axios';
import { Browser } from 'puppeteer';

import { any, BROWSER } from '../../../common';

import { TorrentProviderMetadata } from '../torrent-metadata.interface';
import { TorrentMetadataSearchInput } from '../types';

export abstract class BaseTorrentProvider {
  @Inject(HttpService)
  protected readonly http: HttpService;

  @Inject(BROWSER)
  protected readonly browser: Browser;

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

  public abstract create(): Promise<void>;

  public abstract provide(input: TorrentMetadataSearchInput): Promise<TorrentProviderMetadata[]> | Observable<TorrentProviderMetadata[]>;

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
