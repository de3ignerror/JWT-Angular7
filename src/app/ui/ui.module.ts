import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputFieldComponent } from './input-field/input-field.component';
import { CardComponent } from './card/card.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { LoadingComponent } from './loading/loading.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestMaterialModule} from '../material-module';
import { SearchSelectComponent } from './search-select/search-select.component';
@NgModule({
  declarations: [

    InputFieldComponent,
    CardComponent,
    InputSearchComponent,
    InputTextareaComponent,
    InputSelectComponent,
    InputDateComponent,
    InputCheckboxComponent,
    PaginatorComponent,
    LoadingComponent,
    SearchSelectComponent,
     ],
  imports: [
    CommonModule,
    TestMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    InputFieldComponent,
    CardComponent,
    InputSearchComponent,
    InputTextareaComponent,
    InputSelectComponent,
    InputDateComponent,
    InputCheckboxComponent,
    PaginatorComponent,
    LoadingComponent,

  ]
})
export class UIModule { }
