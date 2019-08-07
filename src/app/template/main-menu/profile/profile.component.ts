import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/_services';
import { User } from '../../../core/_models';
import {CoreDataService} from '../../../core/_services/core-data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthenticationService, public authS: CoreDataService) { }
  user: any;


  ngOnInit() {
    this.user = <User> this.auth.currentUserSubject.value;
  }

}


