import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';
import {CoreDataService} from '../../core/_services/core-data.service';
import {MessagesService} from '../../core/_services/messages.service';
import {AuthenticationService} from '../../core/_services';
import {ActivatedRoute} from '@angular/router';


//emit value in sequence every 1 second
const source = interval(15000);
//output: 0,1,2,3,4,5....


const sourceInit = interval(5000);



@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  fragment = '';
  idUser: number;
  initAmmountofNewMessages: number;
  newMessages: number;
  constructor(public coreData: CoreDataService,
              public auth: AuthenticationService,
              public ms: MessagesService,
              private route: ActivatedRoute) { }



  ngOnInit() {

    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.auth.currentUser.subscribe(()=>{
      if(this.auth.currentUserSubject.value.enabled) {
        this.coreData.Auth();
      }
    })
    this.coreData.Authenticated().subscribe(()=> {this.coreData.SocketAuthStatus = true;});
    this.coreData.Unauthorized().subscribe(()=>{this.coreData.SocketAuthStatus = false;});
    // this.coreData.getOrdersCounter().subscribe(res => console.log(res))


  //   source.subscribe(val => {
  //     if (this.auth.currentUserSubject.value.enabled) {
  //       if (this.idUser) {
  //         this.ms.selectCountOpenedMessagesbyUser(this.idUser).subscribe(res1 => {
  //           if (res1[0]['result'] == 'success') {
  //             this.newMessages = res1[0]['data'][0]['Ammount'];
  //             if (this.newMessages > this.initAmmountofNewMessages) {
  //               this.ms.popupMessage('У Вас ' + (this.newMessages - this.initAmmountofNewMessages) + ' сообщений', 'Посмотреть');
  //               this.initAmmountofNewMessages = this.newMessages;
  //             }
  //           }
  //           else {
  //             this.ms.openSnackBar('Ошибка при получении количества сообщений в компоненте Body', '');
  //           }
  //         });
  //       }
  //     }
  //   });
  //
  //
  //
  //   var temp = sourceInit.subscribe(
  //     val => {
  //       if (this.auth.currentUserSubject.value.enabled) {
  //         if(!this.idUser) {
  //         this.coreData.SelectIdUser(this.auth.currentUserSubject.value).subscribe(res => {
  //           if (res[0]['result'] == 'success') {
  //             this.idUser = res[0]['data'][0]['idusers'];
  //             temp.unsubscribe();
  //           } else {
  //             this.ms.openSnackBar('Ошибка при получении user id в компоненте Body', '');
  //           }
  //         });
  //         }
  //       }
  //     });
   }

}
