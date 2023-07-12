import { Component } from '@angular/core';

import { Observable, catchError, tap, throwError } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm = '';
  searchWeatherData$!: Observable<any>;
  errorMessage!: string;

  constructor(private weatherService: WeatherService) {
    console.log(this.searchTerm);
  }

  search(term: string): void {
    this.searchTerm = term; // this line enables the search term be used in backend
    this.searchWeatherData$ = this.weatherService
      .getForecast(this.searchTerm)
      .pipe(
        tap((weatherData) => {
          console.log(weatherData); // Display the weather data in the browser console for now
        }),
        catchError((error) => {
          this.errorMessage = 'An error occurred while fetching weather data.';
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }
}
