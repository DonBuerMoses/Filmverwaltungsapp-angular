import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../../../services/data.service";
import {FilmTmdb} from "../../../types/film-tmdb";
import {Film} from "../../../types/film";
import {Chip} from "../../../detail/detail.component";
import {Speichermedium} from "../../../types/speichermedium";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
/**
 * Diese Komponente ist der Dialog zum  Hinzufügen neuer Filme in die liste eines Nutzers.
 */
export class AddDetailsComponent implements OnInit {
  fb: FormBuilder;
  //FormGroup für die Eingaben
  form = new FormGroup({
    favorit: new FormControl<boolean>(false),
    bewertung: new FormControl(''),
    speichermedium: new FormControl('')
  });
  private _filmObject: Film;
  private _filmTmdbObject: FilmTmdb;
  private _speichermedien: Speichermedium[];
  private _bewertungArray: number[] = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  genres: Chip[] = [];

  get filmObject(): Film {
    return this._filmObject;
  }

  set filmObject(value: Film) {
    this._filmObject = value;
  }

  get filmTmdbObject(): FilmTmdb {
    return this._filmTmdbObject;
  }

  set filmTmdbObject(value: FilmTmdb) {
    this._filmTmdbObject = value;
  }

  get speichermedien(): Speichermedium[] {
    return this._speichermedien;
  }

  set speichermedien(value: Speichermedium[]) {
    this._speichermedien = value;
  }

  get bewertungArray(): number[] {
    return this._bewertungArray;
  }

  set bewertungArray(value: number[]) {
    this._bewertungArray = value;
  }

  /**
   * Konstruktor
   * @param dataService
   * @param dialogRef
   * @param data
   * @param _snackBar
   */
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<AddDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Film,
    private _snackBar: MatSnackBar
  ) {}

  /**
   * Wird bei der Initialisierung der Komponente durchgeführt
   * filmObject wird mit den Daten des angeklickten Films befüllt und das filmTmdbObject und speichermedien werden über den data-service befüllt
   */
  ngOnInit(): void {
    //console.log(this.data);
    this.filmObject = this.data;
    console.log(this.filmObject);
    this.dataService.getTmdbFilm(this.data).subscribe(filmTmdb => {
      console.log(filmTmdb);
      this.filmTmdbObject = filmTmdb;
      console.log(this.filmTmdbObject);
      this.filmTmdbObject.genres.forEach(genre => this.genres.push({name: genre.name.trim()}))
    });
    this.dataService.getSpeichermedien().subscribe(speichermedien => {
      this.speichermedien = speichermedien;
    })
  }

  /**
   * schließt den Dialog
   */
  onSchliessenClick(): void {
    this.dialogRef.close();
  }

  /**
   * Führt ein inert auf die Filme-Tabelle der Azure DB durch und schließt den Dialog wieder.
   */
  onHinzufuegenClick(): void {
    if(this.form.valid){
      this.filmObject.favorit = this.form.value.favorit;
      if (this.form.value.bewertung) {
        this.filmObject.bewertung = Number.parseFloat(this.form.value.bewertung);
      } else {
        this.filmObject.bewertung = null;
      }

      this.filmObject.speichermedien_id = this.form.value.speichermedium['speichermedien_ID'];
      console.log("Form valide!")
      console.log(this.filmObject);
      this.dataService.insertFilm(this.filmObject).subscribe();
      this.dialogRef.close();
      this.reloadPage();
    } else {
      console.log("Form nicht valide.");
    }

  }

  /**
   * Seite wird neu geladen
   */
  reloadPage(): void {
    window.location.reload();
    this._snackBar.open("Film erflogreich zu Ihrer Liste hinzugefügt.", "OK");
  }

}
