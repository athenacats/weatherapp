import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) this.searchTerm = params['searchTerm'];
    });
  }

  search(term: string): void {
    this.searchTerm = term; // this line enables the search term be used in backend
    if (term) this.router.navigateByUrl('/weather?city=' + term);
  }
}
