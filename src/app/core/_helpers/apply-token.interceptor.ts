import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subscriber} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';
import {User} from '../_models/user';

type CallerRequest = {
  subscriber: Subscriber<any>;
  failedRequest: HttpRequest<any>;
};

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private refreshInProgress: boolean;
  private requests: CallerRequest[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //перехватываем только "наши" запросы
    if(!req.url.includes('api/')) {
      return next.handle(req);
    }

//оборачиваем Observable из вызывающего кода своим, внутренним Observable
// далее вернем вызывающему коду Observable, который под нашим контролем здесь
    let observable = new Observable<HttpEvent<any>>((subscriber) => {
      //как только вызывающий код сделает подписку мы попадаем сюда и подписываемся на наш HttpRequest
      //тобишь выполняем оригинальный запрос
      let originalRequestSubscription = next.handle(req)
        .subscribe((response) => {
            //оповещаем в инициатор (success) ответ от сервера
            subscriber.next(response);
          },
          (err) => {
            if (err.status === 401) {
              //если споймали 401ую - обрабатываем далее по нашему алгоритму
              this.handleUnauthorizedError(subscriber, req);
            } else {
              //оповещаем об ошибке
              subscriber.error(err);
            }
          },
          () => {
            //комплит запроса, отрабатывает finally() инициатора
            subscriber.complete();
          });

      return () => {
        // на случай если в вызывающем коде мы сделали отписку от запроса
        // если не сделать отписку и здесь, в dev tools браузера не увидим отмены запросов, т.к инициатор (например Controller) делает отписку от нашего враппера, а не от исходного запроса
        originalRequestSubscription.unsubscribe();
      };
    });

//вернем вызывающему коду Observable, пусть сам решает когда делать подписку.
    return observable;
  }

  private handleUnauthorizedError(subscriber: Subscriber < any >, request: HttpRequest<any>) {

    //запоминаем "401ый" запрос
    this.requests.push({ subscriber, failedRequest: request });
    if(!this.refreshInProgress) {
      //делаем запрос на восстанавливение токена, и установим флаг, дабы следующие "401ые"
      //просто запоминались но не инициировали refresh
      this.refreshInProgress = true;
      this.auth.renewAuth().subscribe((authHeader) =>
            //если токен рефрешнут успешно, повторим запросы которые накопились пока мы ждали ответ от рефреша
        {
          this.refreshInProgress = false;
            if (authHeader.token) {
              if (authHeader.token == 0){
                this.auth.logout();
                return;
              }
              let usr = this.auth.currentUserSubject.value;
              this.auth.currentUserSubject.next(new User(true, usr.username, usr.role,
                authHeader.token, usr.refreshToken,
                this.auth.helper.decodeToken(authHeader.token).exp));
              this.repeatFailedRequests(authHeader.token)
            }
           else {
            this.auth.logout();
          }

          },
          () => {
            this.refreshInProgress = false;
            //если по каким - то причинам запрос на рефреш не отработал, то делаем логаут
            this.auth.logout();
          });
    }
  }

  private repeatFailedRequests(authHeader) {

    this.requests.forEach((c) => {
      //клонируем наш "старый" запрос, с добавлением новенького токена
      const requestWithNewToken = c.failedRequest.clone({
        headers: c.failedRequest.headers.set('authorization', authHeader)
      });
      //и повторяем (помним с.subscriber - subscriber вызывающего кода)
      this.repeatRequest(requestWithNewToken, c.subscriber);
    });
    this.requests = [];
  }

  private repeatRequest(requestWithNewToken: HttpRequest < any >, subscriber: Subscriber<any>) {

    //и собственно сам процесс переотправки
    this.http.request(requestWithNewToken).subscribe((res) => {
        subscriber.next(res);
      },
      (err) => {
        if (err.status === 401) {
          // if just refreshed, but for unknown reasons we got 401 again - logout user
          this.auth.logout();
        }
        subscriber.error(err);
      },
      () => {
        subscriber.complete();
      });
  }
}
