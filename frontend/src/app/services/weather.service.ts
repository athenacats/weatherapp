import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SEARCH_RESULT } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(searchTerm: string) {
    return this.http.get<any>(SEARCH_RESULT + '?city=' + searchTerm);
  }

  getForecast(searchTerm: string) {
    return this.http.get<any>(SEARCH_RESULT + '?city=' + searchTerm);
  }
}
