import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  baseurl = this.api.baseurl;
  teachers:any;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
   this.load();
  }

  load(){
    this.api.post("admin/teachers", {}).subscribe((result:any)=>{
      this.teachers = result.data;
      console.log(this.teachers);
    });
  }

  deleteTeacher(id:string){
    if(confirm("Sure to delete?")){
      this.api.post("admin/deleteteacher", {data:{id:id}}).subscribe((result:any)=>{
        this.load();
      });
    }
  }

}
