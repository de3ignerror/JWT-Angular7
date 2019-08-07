import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CoreDataService {

  constructor(private Http: HttpClient, private auth: AuthenticationService) {}

  SelectIdUser(obj): Observable<any> {
    return this.Http.post('/api/selectidUser', {User: obj}, {});
  }



}
