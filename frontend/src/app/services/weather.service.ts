import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FORECAST_RESULT, SEARCH_RESULT } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getForecast(searchTerm: string) {
    return this.http.get<any>(FORECAST_RESULT + '?city=' + searchTerm);
  }

  getSearch(searchTerm: string) {
    return this.http.get<any>(SEARCH_RESULT + searchTerm);
  }
}
