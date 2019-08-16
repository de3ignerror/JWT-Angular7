import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import {TestMaterialModule} from '../../material-module';




@NgModule({
  declarations: [
    DashboardComponent,
    ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    TestMaterialModule,
  ],
  providers: []
})
export class DashboardsModule { }
