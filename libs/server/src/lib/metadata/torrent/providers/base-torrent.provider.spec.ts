import { Test } from '@nestjs/testing';
import { HttpService, Injectable } from '@nestjs/common';
import { of, TimeoutError, timer } from 'rxjs';

import { BaseTorrentProvider } from './base-torrent.provider';

@Injectable()
// @ts-ignore
class TestTorrentProvider extends BaseTorrentProvider {
  endpoints = ['127.0.0.1', 'localhost'];

  constructor(protected readonly http: HttpService) {
    super();
  }
}

describe('BaseTorrentProvider', () => {
  let provider: TestTorrentProvider;
  let http: HttpService & { get: jest.SpyInstance };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        TestTorrentProvider
      ],
    }).compile();

    provider = module.get(TestTorrentProvider);
    http = module.get(HttpService);
  });

  describe('getReliableEndpoint', () => {
    it('should error when neither endpoints completes within the timeout', (done) => {
      const next = jest.fn();

      http.get.mockImplementation(() =>  timer(1));

      // @ts-ignore
      provider.getReliableEndpoint(provider.endpoints, null, 0)
        .subscribe({
          error(err) {
            expect(next).not.toHaveBeenCalled();
            expect(err).toBeInstanceOf(TimeoutError);
            expect(http.get).toHaveBeenCalledTimes(2);
            done();
          },
          next,
        });
    });

    it('should race for the first endpoint to complete', (done) => {
      http.get.mockImplementation(endpoint => {
        return endpoint === provider.endpoints[1]
          ? of(provider.endpoints[1])
          : timer(1);
      });

      // @ts-ignore
      provider.getReliableEndpoint(provider.endpoints, null, 0)
        .subscribe(endpoint => {
          expect(endpoint).toBe(provider.endpoints[1]);
          expect(http.get).toHaveBeenCalledTimes(2);
          done();
        });
    });
  });
});
