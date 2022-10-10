import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmListComponent } from './film-list/film-list.component';
import { DetailComponent } from './detail/detail.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TableListComponent } from './shared/components/table-list/table-list.component';
import { PictureListComponent } from './shared/components/picture-list/picture-list.component';
import { SearchbarComponent } from './shared/components/searchbar/searchbar.component';
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Ng5SliderModule} from 'ng5-slider';
import {MatChipsModule} from "@angular/material/chips";
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder} from '@angular/forms';
import { NutzerComponent } from './nutzer/nutzer.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    DetailComponent,
    NavbarComponent,
    TableListComponent,
    PictureListComponent,
    SearchbarComponent,
    PageHeaderComponent,
    NutzerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    Ng5SliderModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    FormBuilder,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
