import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Holding} from '../../core/_models/holding';
import {MessagesService} from '../../core/_services/messages.service';
import {map, startWith} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {ReadService} from '../../pages/directory/shared/read.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss']
})
export class SearchSelectComponent implements OnInit, OnChanges {
  SearchControl = new FormControl();
  data = [];
  filteredOptions: Observable<string[]>;
  @Input() input: boolean;
  @Output() public valueChange = new EventEmitter<any>();
  constructor(private load: ReadService, private message: MessagesService) { }

  uploadData() {
    this.load.AllHoldings().subscribe(res => {console.log(res);
      if (res[0].result == 'error'){
        this.message.openSnackBar(res[0].msg,'');
      }
      this.data = res[0].data;
    });

  }

  ngOnChanges(){
    if(!this.input){
      this.uploadData();
    }
  }
  ngOnInit() {
    this.filteredOptions = this.SearchControl.valueChanges
      .pipe(
        startWith<string | Holding>(''),
        map(value => typeof value === 'string' ? value : value.Name),
        map(Name => Name ? this._filter(Name) : this.data.slice())
      );

    this.SearchControl.valueChanges.subscribe(value => this.onValueChange(value))
  }
  displayFn(h?: Holding): string | undefined {
    return h ? h.Name : undefined;
  }

  private _filter(name: string): Holding [] {
    const filterValue = name.toLowerCase();

    return this.data.filter(option => option.Name.toLowerCase().indexOf(filterValue) === 0);
  }


  onValueChange(model: any) {
    if (typeof (model) != 'string') {
      this.valueChange.emit(model);
    }
  }


}
