import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../../core/_services';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import {MessagesService} from '../../core/_services/messages.service';
import {Message} from '../../core/_models/message';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  profileForm = this.fb.group({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private ms: MessagesService) { }



  login() {
    this.auth.login(this.profileForm.controls['login'].value, this.profileForm.controls['password'].value).subscribe();
  }

  forgotPassword(){
    if (this.profileForm.controls['login'].value) {
    this.ms.sendMessage(new Message(undefined,'Забыт пароль от ' + this.profileForm.controls['login'].value,
      'Требуется связаться с '+ this.profileForm.controls['login'].value + 'для выяснения обстоятельств.',
      undefined, 1)).subscribe(res => {
      this.ms.openSnackBar('В ближайшее время с Вами свяжутся для восстановления учетных данных.', '');
    });
    } else {
      this.ms.openSnackBar('Введите имя пользователя в поле Логин и нажмите еще раз', '');
    }

  }


  ngOnInit() {
  }

}
