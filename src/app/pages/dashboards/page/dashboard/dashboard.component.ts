import { Component, OnInit } from '@angular/core';
import {CoreDataService} from '../../../../core/_services/core-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private coreData: CoreDataService) { }

  NewCompanyCounter: any;
  ErrorMessage: string;

  ngOnInit() {
    this.coreData.getNewCompanyCounter().subscribe(res => {
      if (res) {
        this.NewCompanyCounter = res[0]['data'][0]['newCompany'];
        this.ErrorMessage = "У " + this.NewCompanyCounter + " компаний отсутствует связь с холдингом."
      }
    })
  }

}
