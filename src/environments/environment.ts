const apiRemote = 'http://termin-api.chickenkiller.com:8080/api';
const apiLocal = 'http://localhost:8080/api';
const apiLAN = 'http://192.168.0.31:8080/api';

const url = apiRemote;

export const environment = {
  production: false,
  apiUrl: url
};

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
