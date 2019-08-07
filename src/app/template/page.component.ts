import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/_services';
import {CoreDataService} from '../core/_services/core-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(public coreData: CoreDataService,public auth: AuthenticationService) { }

  ngOnInit() {
    // this.coreData.getOrdersCounter().subscribe(res=>console.log(res))
  }

}
