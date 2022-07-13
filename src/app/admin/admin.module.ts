import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ApiService } from '../api.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherComponent } from './teacher/teacher.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TeachersComponent,
    TeacherComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers:[ApiService]

})
export class AdminModule { }
