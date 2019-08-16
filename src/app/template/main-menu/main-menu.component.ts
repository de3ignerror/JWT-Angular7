import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass'],
})
export class MainMenuComponent implements OnInit {
  menu = [{'title': '1', 'child':
      [
        {'title': '1.1', 'link': '123'},
        {'title': '1.2', 'link': '123'}
        ]
        },
    {'title': '2', 'link': '123', 'child':
        {'menu':'menu_second', 'child':[
          {'title': '2.1', 'link': '123'},
          {'title': '2.2', 'link': '123'}
          ]}
        },
      ];
  constructor() { }



  ngOnInit() {
  }

}
