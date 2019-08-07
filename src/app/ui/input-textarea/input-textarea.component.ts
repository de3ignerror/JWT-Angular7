import { Component,  EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent {
  @Input() labelChild: string;
  @Input() required: boolean;
  @Input() initValue: string;
  @Output() public valueChange = new EventEmitter<string>();
  onValueChange(model: any) {
    this.valueChange.emit(model);
  }

  constructor() { }

}
