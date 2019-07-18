// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const isElectron = () => typeof process === 'object' && process.versions['electron'];

require('dotenv').config();

export const environment = {
  production: false,
  devServerPort: +process.env.DEV_SERVER_PORT || 4200,
  port: +process.env.SERVER_PORT || 3000,
  tmdb: {
    api: process.env.TMDB_API,
    apiKey: process.env.TMDB_API_KEY,
    appendToResponse: 'external_ids,videos',
    poster: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2',
    backdrop: 'https://image.tmdb.org/t/p/original',
    still: 'https://image.tmdb.org/t/p/w227_and_h127_bestv2',
  },
  isElectron,
};
