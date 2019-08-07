import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() type: string = 'text';
  @Input() labelChild: string;
  @Input() initValue: string;
  @Input() required: boolean;
  @Output() public valueChange = new EventEmitter<string>();
  onValueChange(model: string) {
    this.initValue = model;
    this.valueChange.emit(model);
  }
  constructor() { }
}
