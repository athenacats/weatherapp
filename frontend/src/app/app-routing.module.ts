import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchresultsComponent } from './components/pages/searchresults/searchresults.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather', component: SearchresultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
