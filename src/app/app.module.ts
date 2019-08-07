import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { JwtInterceptor } from './core/_helpers/jwt.interceptor';
import {RefreshTokenInterceptor} from './core/_helpers/apply-token.interceptor';

import {AuthComponent} from './template/auth/auth.component';
import { MainMenuComponent } from './template/main-menu/main-menu.component';
import { SearchComponent } from './template/main-menu/search/search.component';
import { MenuComponent } from './template/main-menu/menu/menu.component';
import {ProfileComponent} from './template/main-menu/profile/profile.component';
import {FeedbackDialogComponent, FeedbackComponent} from './template/main-menu/profile/feedback/feedback.component';
import { BodyComponent } from './template/body/body.component';
import {AuthenticationService} from './core/_services';
import {TestMaterialModule} from './material-module';
import { PageComponent } from './template/page.component';

import {environment} from '../environments/environment';


@NgModule({
  entryComponents: [FeedbackDialogComponent, FeedbackComponent],
  declarations: [
    AuthComponent,
    MainMenuComponent,
    SearchComponent,
    MenuComponent,
    ProfileComponent,
    FeedbackComponent,
    FeedbackDialogComponent,
    BodyComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TestMaterialModule,

  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
  ],
  bootstrap: [
    PageComponent,
  ]
})
export class AppModule { }

