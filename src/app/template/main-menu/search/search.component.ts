import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/**
 * ИЗМЕНИТЬ ФОРМАТ ВЫДАЧИ
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  myControl = new FormControl('Поиск');
  options: string[] = ['One', 'Test2', 'Test3', 'Test2', 'Test3', 'Test2', 'Test3']; // Тут прикручивается БД
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
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  updatedVal(e) {
    if(e && e.length >= 2) {
      this.showAutocomplete = true;
    } else {
      this.showAutocomplete = false;
    }
  }

}
