import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {
  @Input() labelChild: string;
  @Input() choosing: string[];
  @Output() public valueChange = new EventEmitter<string>();
  onValueChange(model: any) {
    this.valueChange.emit(model);
  }
  myControl = new FormControl('');

  filteredOptions: Observable<string[]>;
  showAutocomplete: boolean = false;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.choosing.filter(option => option.toLowerCase().includes(filterValue));
  }

  updatedVal(e) {
    if(e && e.length >= 2) {
      this.showAutocomplete = true;
    } else {
      this.showAutocomplete = false;
    }
  }

}
