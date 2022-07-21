import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleriesComponent } from './galleries/galleries.component';


const routes: Routes = [
  {path:"", component:DashboardComponent},
  {path:"teacher/:id", component:TeacherComponent},
  {path:"teachers", component:TeachersComponent},
  {path:"course/:id", component:CourseComponent},
  {path:"courses", component:CoursesComponent},
  {path:"gallery/:id", component:GalleryComponent},
  {path:"galleries", component:GalleriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
