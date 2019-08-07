import { Injectable } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private snackBar: MatSnackBar, private Http: HttpClient) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }


  sendMessage(obj): Observable<any> {
    return this.Http.post('/api/createMessage', {Message: obj}, {});
  }



}
