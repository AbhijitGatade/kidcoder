import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers:any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.post("admin/teachers", {}).subscribe((result:any)=>{
      this.teachers = result.data;
      console.log(this.teachers);
    })
  }

}
