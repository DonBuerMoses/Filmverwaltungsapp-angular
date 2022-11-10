import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit {
  private _bewertung: number;


  get bewertung(): number {
    return this._bewertung;
  }

  @Input()
  set bewertung(value: number) {
    this._bewertung = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
