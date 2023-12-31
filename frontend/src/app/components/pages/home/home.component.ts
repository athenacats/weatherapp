import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchTerm = '';
  weatherData$!: Observable<any>;
  searchWeatherData$!: Observable<any>;
  errorMessage!: string;
  showDailyForecast = false;
  isDaytime!: boolean;
  backgroundImage!: string;
  constructor(
    private weatherService: WeatherService,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.weatherData$ = this.weatherService.getForecast('nairobi').pipe(
        tap((weatherData) => {
          this.checkDaytime(weatherData.location.localtime);
          console.log(weatherData.location.localtime); // Display the weather data in the browser console for now
          console.log(weatherData.current.condition.text);
        }),
        catchError((error) => {
          this.errorMessage = 'An error occurred while fetching weather data.';
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
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
