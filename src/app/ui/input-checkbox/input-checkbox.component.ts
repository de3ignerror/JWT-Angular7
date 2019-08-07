import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent {
  @Input() labelChild: string;
  @Input() initValue: boolean;
  @Output() public valueChange = new EventEmitter<boolean>();
  onValueChange(model: boolean) {
    this.initValue = model;
    this.valueChange.emit(model);
  }

  constructor() { }

}
