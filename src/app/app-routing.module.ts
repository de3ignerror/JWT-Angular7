import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './core/_guards/auth.guard';
import {AfterLoginGuard} from './core/_guards/after-login.guard';
import {AuthComponent} from './template/auth/auth.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AfterLoginGuard]

  },
  {
    path: '',
    loadChildren: "./pages/dashboards/dashboards.module#DashboardsModule",
    canActivate: [AuthGuard]

  },
  {path: '**', redirectTo: '', canActivate:[ AfterLoginGuard, AuthGuard ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // <-- debugging purposes only
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
