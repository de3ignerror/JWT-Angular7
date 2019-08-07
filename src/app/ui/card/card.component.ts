import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  valParent = true;
  valParent2 = true;
  array = [{value: 'rub-0', viewValue: 'RUB'},
    {value: 'eur-1', viewValue: 'EUR'},
    {value: 'usd-2', viewValue: 'USD'}]
  array1 =    ['One', 'Test2', 'Test3', 'Test2', 'Test3', 'Test2', 'Test3'];
  txt = '123'
  constructor() { }



  test1() {
    console.log(1, this.valParent)
    console.log(2, this.valParent2)
  }


  public Output(e) {
    console.log(e)
  }

  ngOnInit() {
     }

}
