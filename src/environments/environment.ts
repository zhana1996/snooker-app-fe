// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://192.168.100.7:3000',
  API_URL_USER: 'http://192.168.100.7:3000/user',
  API_URL_TOURNAMENT: 'http://192.168.100.7:3000/tournament',
  API_URL_TOURNAMENT_PARTICIPANT: 'http://192.168.100.7:3000/torunament-participant',
  API_URL_NEWS: 'http://192.168.100.7:3000/news'
}; // 192.168.100.7

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
