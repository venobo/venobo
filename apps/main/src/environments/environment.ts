// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const isElectron = () => typeof process === 'object' && process.versions['electron'];

export const environment = {
  production: false,
  devServerPort: 4200,
  port: 3000,
  isElectron,
};
