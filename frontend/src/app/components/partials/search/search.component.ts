import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm = '';

  constructor(private weatherService: WeatherService) {
    console.log(this.searchTerm);
  }
  search(term: string): void {
    this.searchTerm;
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
