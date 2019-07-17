import { Test } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';

import { iDopeTorrentProvider } from './idope-torrent.provider';
import { of } from 'rxjs';

describe('iDopeTorrentProvider', () => {
  let iDope: iDopeTorrentProvider;
  let httpGetSpy: jest.SpyInstance;
  let http: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [iDopeTorrentProvider],
      imports: [HttpModule],
    }).compile();

    iDope = module.get(iDopeTorrentProvider);
    http = module.get(HttpService);

    httpGetSpy = jest.spyOn(http, 'get');
  });

  describe('create', () => {
    it('should create reliable endpoint', () => {
      httpGetSpy.mockImplementation(() => of(true));

      const endpoint$ = iDope.create();

      endpoint$.subscribe(e => console.log(e));

      expect(httpGetSpy).toHaveBeenCalledTimes(2);
    });
  });
});
