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
import {AuthenticationService} from './core/_services';
import {TestMaterialModule} from './material-module';
import { PageComponent } from './template/page.component';

import {environment} from '../environments/environment';
import { SidebarMenuComponent } from './template/sidebar-menu/sidebar-menu.component';


@NgModule({
  entryComponents: [],
  declarations: [
    AuthComponent,
    MainMenuComponent,
    PageComponent,
    SidebarMenuComponent
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

