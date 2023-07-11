import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather('nairobi').subscribe(
      (weatherData) => {
        console.log(weatherData); // Display the weather data in the browser console for now
      },
      (error) => {
        console.error(error); // Handle the error appropriately
      }
    );
  }
  search(term: string): void {
    this.searchTerm = term; // this line enables the search term be used in backend
    this.weatherService.getWeather(this.searchTerm).subscribe(
      (weatherData) => {
        console.log(weatherData); // Display the weather data in the browser console for now
      },
      (error) => {
        console.error(error); // Handle the error appropriately
      }
    );
  }
}
