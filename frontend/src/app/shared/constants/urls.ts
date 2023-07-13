import { environment } from 'src/environments/environment';

const BASE_URL = environment.production ? '' : 'http://localhost:4000';

export const HOME_URL = BASE_URL + '/api';
export const SEARCH_RESULT = HOME_URL + '/weather?city=';
export const FORECAST_RESULT = HOME_URL + '/forecast';
export const AUTOCOMPLETE = HOME_URL + '/search/';
