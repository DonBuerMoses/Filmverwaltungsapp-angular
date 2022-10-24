import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilmListComponent} from './film-list/film-list.component';
import {DetailComponent} from './detail/detail.component';
import {NutzerComponent} from "./nutzer/nutzer.component";
import {AddComponent} from "./add/add.component";

const routes: Routes = [
  {path: 'films', component: FilmListComponent},
  {path: 'add', component: AddComponent},
  {path: 'user', component: NutzerComponent},
  {path: 'detail/:email/:id', component: DetailComponent},
  {path: '**', component: FilmListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
