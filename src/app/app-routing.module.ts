import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilmListComponent} from './film-list/film-list.component';
import {DetailComponent} from './detail/detail.component';
import {NutzerComponent} from "./nutzer/nutzer.component";

const routes: Routes = [
  {path: 'films', component: FilmListComponent},
  {path: 'add', component: DetailComponent},
  {path: 'user', component: NutzerComponent},
  {path: '**', component: FilmListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
