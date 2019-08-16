import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUserSubject: BehaviorSubject<User>; //было private
    public currentUser: Observable<User>;
    public helper = new JwtHelperService();

    constructor(private http: HttpClient,  private router: Router ) {
        this.currentUserSubject = new BehaviorSubject<User>(new User(false));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`/api/login`, { username: username,password: password })
            .pipe(map(res => {
                // login successful if there's a jwt token in the response
                if (res && res.res['token'] && !res.res['error']) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    const decodedToken = this.helper.decodeToken(res.res['token']);
                    this.currentUserSubject.next(new User(true, decodedToken.user, decodedToken.role, res.res['token'], res.res['refreshToken'], decodedToken.exp, decodedToken.id));
                    this.router.navigate(['']);
                   return true;
                } else if (res && res.res['error'] && res.res['message']){
                  return false; //В случае ошибки авторизации
                } else {
                  return false; //В случае ошибки соединения
                }
            }));
    }

    logout() {
        this.rejectRefreshToken().subscribe(res => {this.currentUserSubject.next(new User(false));});
        this.logoutServer().subscribe( res => {this.router.navigate(['/login']);});
    }


  public renewAuth(): Observable < any > {
    if(!this.isNeedRefreshToken()) {
      return this.http.post<any>(`/fake-token`,
        {
          token: this.currentUserSubject.value.token
        });

    }
    return this.http.post<any>(`/api/token`,
      {
        refreshToken: this.currentUserSubject.value.refreshToken
      });

  }

  public isNeedRefreshToken(): boolean {
    //expires_at - время когда токен должен истечь, записано при логине или после очередного рефреша
    let expiresAtString = <string> this.currentUserSubject.value.exp;
    if (!expiresAtString) {
      return false;
    }

    const expiresAt = parseInt(expiresAtString, 10);
    //считаем, что токен нужно рефрешить не когда он уже истек, а за минуту до его невалидности
    let isExpireInMinute  = new Date().getTime() > (expiresAt - 60000);
    return isExpireInMinute;
  }

  private rejectRefreshToken(): Observable < any > {
    return this.http.post<any>(`/api/token/reject`,
      {
        refreshToken: this.currentUserSubject.value.refreshToken
      });

  }

  private logoutServer(): Observable < any > {
    return this.http.post<any>(`/api/logout`,
      {
      });
  }

   registration(usr, pwd): Observable < any > {
    return this.http.post<any>(`/api/signup`,
      {
        username: usr, password: pwd
      });

  }
}
