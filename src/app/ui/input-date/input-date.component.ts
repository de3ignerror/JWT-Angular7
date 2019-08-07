import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {FormControl} from '@angular/forms';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'DD MMM YYYY',

    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
declare var require: any;
const moment = require('moment');

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class InputDateComponent implements OnInit, OnChanges {
  @Input() labelChild: string;
  @Input() required: boolean;
  @Output() public valueChange = new EventEmitter<string>();
  onValueChange(model: any) {
    this.valueChange.emit(model);
  }
  date = new FormControl();
  ngOnChanges(): void {
    this.date.valueChanges.subscribe(val => {
      this.onValueChange(moment(val).format('YYYY-MM-DD'));
    });
  }


  constructor() { }

  ngOnInit() {
  }

}
