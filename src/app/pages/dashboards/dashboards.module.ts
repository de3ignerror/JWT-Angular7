import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';

import {RightColComponent} from './components/right-col/right-col.component';
import {LeftColComponent} from './components/left-col/left-col.component';
import {MiddleColComponent} from './components/middle-col/middle-col.component';


import { CoreDataService } from '../../core/_services/core-data.service'
import {UIModule} from '../../ui/ui.module';
import {TestMaterialModule} from '../../material-module';



@NgModule({
  declarations: [
    DashboardComponent,
    LeftColComponent,
    RightColComponent,
    MiddleColComponent
    ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    UIModule,
    TestMaterialModule,
  ],
  providers: [CoreDataService]
})
export class DashboardsModule { }
