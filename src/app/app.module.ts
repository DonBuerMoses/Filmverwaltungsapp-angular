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
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NutzerComponent } from './nutzer/nutzer.component';
import { AddDetailsComponent } from './shared/components/add-details/add-details.component';
import { AddComponent } from './add/add.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { authInterceptorProviders } from './helpers/auth.interceptor';


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
    NutzerComponent,
    AddDetailsComponent,
    AddComponent
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    FormBuilder,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
