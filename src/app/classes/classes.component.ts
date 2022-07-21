import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  baseurl = this.api.baseurl;
  classes:any;

  constructor(private api:ApiService) {}

  ngOnInit(): void {
    this.api.post("admin/courses", {}).subscribe((result:any)=>{
      this.classes = result.data;
      console.log(this.classes);
    })
  }

}
