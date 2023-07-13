import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss'],
})
export class SearchresultsComponent {
  searchTerm = '';
  searchWeatherData$!: Observable<any>;
  errorMessage!: string;
  showDailyForecast = false;

  constructor(
    private weatherService: WeatherService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['city']) {
        this.searchTerm = params['city'];
        this.searchWeatherData$ = this.weatherService
          .getSearch(this.searchTerm)
          .pipe(
            tap((weatherData) => {
              console.log(weatherData); // Display the weather data in the browser console for now
            }),
            catchError((error) => {
              this.errorMessage =
                'An error occurred while fetching weather data.';
              console.error(error);
              return throwError(() => new Error(error));
            })
          );
      }
    });
  }

  hourlyForecast() {
    this.showDailyForecast = true;
  }

  dailyForecast() {
    this.showDailyForecast = false;
  }
}
