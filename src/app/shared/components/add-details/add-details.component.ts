import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../../../services/data.service";
import {FilmTmdb} from "../../../types/film-tmdb";
import {Film} from "../../../types/film";
import {Chip} from "../../../detail/detail.component";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Speichermedium} from "../../../types/speichermedium";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})

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
  private _bewertungArray: number[] = [1, 2, 3, 4, 5];
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

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<AddDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Film,
    private _snackBar: MatSnackBar
  ) {}

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

  addGenre(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.genres.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  onSchliessenClick(): void {
    this.dialogRef.close();
  }

  /**
   *
   */
  onHinzufuegenClick(): void {
    if(this.form.valid){
      this.filmObject.favorit = this.form.value.favorit;
      this.filmObject.bewertung = Number.parseInt(this.form.value.bewertung);
      this.filmObject.speichermedien_id = this.speichermedien.find(speichermedien => speichermedien.bezeichnung === this.form.value.speichermedium.trim()).speichermedien_id;
      console.log(this.filmObject.favorit);
      console.log(this.filmObject.bewertung);
      console.log(this.filmObject.speichermedien_id);
      //this.dataService.insertFilm(this.filmObject);
      console.log("Form valide!")
      this._snackBar.open("Film erflogreich zu Ihrer Liste hinzugefügt.", "OK");
      this.dialogRef.close();
    } else {
      console.log("Form nicht valide.")
    }

  }

}
