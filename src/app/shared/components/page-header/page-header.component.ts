import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
/**
 * Die Pageheader-Komponente zeigt an, auf welcher Seite sich der Nutzer gerade befindet.
 */
export class PageHeaderComponent implements OnInit {

  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
