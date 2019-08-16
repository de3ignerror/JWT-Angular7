import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../../core/_services';
import { FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  profileForm = this.fb.group({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private fb: FormBuilder, private auth: AuthenticationService) { }



  login() {
    this.auth.login(this.profileForm.controls['login'].value, this.profileForm.controls['password'].value).subscribe();
  }


  ngOnInit() {
  }

}
