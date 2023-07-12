import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  weatherData$!: Observable<any>;
  errorMessage!: string;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherData$ = this.weatherService.getWeather('nairobi').pipe(
      catchError((error) => {
        this.errorMessage = 'An error occurred while fetching weather data.';
        console.error(error);
        return throwError(() => new Error(error));
      })
    );
    this.weatherData$.subscribe(
      (weatherData) => {
        console.log(weatherData); // Display the weather data in the browser console for now
        console.log(weatherData.current.condition.text);
      },
      (error) => {
        console.error(error); // Handle the error appropriately
      }
    );
  }
  search(term: string): void {
    this.searchTerm = term; // this line enables the search term be used in backend
    this.weatherData$ = this.weatherService.getWeather(this.searchTerm).pipe(
      catchError((error) => {
        this.errorMessage = 'An error occurred while fetching weather data.';
        console.error(error);
        return throwError(() => new Error(error));
      })
    );
    this.weatherData$.subscribe(
      (weatherData) => {
        console.log(weatherData); // Display the weather data in the browser console for now
        console.log(weatherData.current.condition.text);
      },
      (error) => {
        console.error(error); // Handle the error appropriately
      }
    );
  }
}
