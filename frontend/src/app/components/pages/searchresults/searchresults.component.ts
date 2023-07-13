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
  isDaytime!: boolean;
  backgroundImage!: string;

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
              this.checkDaytime(weatherData.location.localtime);
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

  checkDaytime(localtime: string) {
    const currentHour = new Date(localtime).getHours();
    console.log(currentHour);
    this.isDaytime = currentHour >= 6 && currentHour < 18;
    this.backgroundImage = this.isDaytime ? 'daytimeImage' : 'nighttimeImage';
  }
}
