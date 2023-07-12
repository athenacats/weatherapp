import { Component, OnInit } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  weatherData$!: Observable<any>;
  searchWeatherData$!: Observable<any>;
  errorMessage!: string;
  showDailyForecast = false;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherData$ = this.weatherService.getForecast('nairobi').pipe(
      tap((weatherData) => {
        console.log(weatherData); // Display the weather data in the browser console for now
        console.log(weatherData.current.condition.text);
      }),
      catchError((error) => {
        this.errorMessage = 'An error occurred while fetching weather data.';
        console.error(error);
        return throwError(() => new Error(error));
      })
    );
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

  hourlyForecast() {
    this.showDailyForecast = true;
  }

  dailyForecast() {
    this.showDailyForecast = false;
  }

  /*hourlyForecast() {
    const elements = document.getElementsByClassName('dailyForecast');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'flex';
    }
    const elements1 = document.getElementsByClassName('forecast');
    for (let i = 0; i < elements1.length; i++) {
      const element = elements1[i] as HTMLElement;
      element.style.display = 'none';
    }
    const title1 = document.getElementsByClassName('daily');
    for (let i = 0; i < title1.length; i++) {
      const element = title1[i] as HTMLElement;
      element.style.fontSize = '1.2rem';
      element.style.fontWeight = '400';
    }
    const title2 = document.getElementsByClassName('hourly');
    for (let i = 0; i < title1.length; i++) {
      const element = title2[i] as HTMLElement;
      element.style.fontSize = '1.5rem';
      element.style.fontWeight = '500';
    }
  }

  dailyForecast() {
    const elements = document.getElementsByClassName('dailyForecast');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }
    const elements1 = document.getElementsByClassName('forecast');
    for (let i = 0; i < elements1.length; i++) {
      const element = elements1[i] as HTMLElement;
      element.style.display = 'flex';
    }
    const title1 = document.getElementsByClassName('daily');
    for (let i = 0; i < title1.length; i++) {
      const element = title1[i] as HTMLElement;
      element.style.fontSize = '1.5rem';
      element.style.fontWeight = '500';
    }
    const title2 = document.getElementsByClassName('hourly');
    for (let i = 0; i < title1.length; i++) {
      const element = title2[i] as HTMLElement;
      element.style.fontSize = '1.2rem';
      element.style.fontWeight = '400';
    }
  }*/
}
