import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options} from 'ng5-slider';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ColumnMetaData} from "../../../types/column-meta-data";



@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  public formGroup: FormGroup;
  public availableColumns: ColumnMetaData[];
  private searchTextSubscription: Subscription;
  filterOpen = false;
  value: number = 1930;
  highValue: number = 2022;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 1930},
      {value: 1940},
      {value: 1950},
      {value: 1960},
      {value: 1970},
      {value: 1980},
      {value: 1990},
      {value: 2000},
      {value: 2010},
      {value: 2022}
    ]
  };
  speichermedien = new FormControl('');
  speichermedienList: string[] = ['Blu-ray', 'DVD', 'VHS', 'Festplatte'];



  @Output()
  public searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  private _searchText: string = "";
  public showFilterbarSelectList = false;

  get searchText(): string {
    return this._searchText;
  }

  @Input()
  set searchText(value: string) {
    this._searchText = value;
    console.log(`searchbar component ${this.searchText}`);
    this.reset();
  }


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
    this.searchTextSubscription = this.formGroup.controls.searchText.valueChanges.subscribe((value) => {

      if (value !== null && value !== undefined) {
        const valueTrimmed = value.trim();
        //this.availableColumns = this.getAvailableColumns(valueTrimmed);
        this.searchTextChanged.emit(valueTrimmed);
        if (valueTrimmed.length > 0) {
          this.showFilterbarSelectList = true;
          return;
        }
      }
      this.showFilterbarSelectList = false;
    });

    this.reset();
  }

  public onFilterClick(): void {
    if (this.filterOpen) {
      this.filterOpen = false;
    } else {
      this.filterOpen = true;
    }
  }

  /*private getAvailableColumns(searchText: string): ColumnMetaData[] {
    const searchTextDataTypes = this.DataUtils.getDataType(searchText);
    return this.genericObject?.columnsMetaData?.filter(columnMetaData => {
      return searchTextDataTypes.filter(dataType => dataType === columnMetaData.type).length > 0;
    });
  }*/

  private createFormGroup(): FormGroup {
    return this._formBuilder.group({searchText: ''});
  }

  private reset() {
    if (this.formGroup) {
      this.formGroup.reset({searchText: this.searchText});
    }
  }


}
