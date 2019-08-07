import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {
  @Input() labelChild: string;
  @Input() choosing: any;
  @Input() required: boolean;
  @Output() public valueChange = new EventEmitter<string>();
  onValueChange(model: any) {
    this.valueChange.emit(model);
  }
  constructor() { }
}
