import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  baseurl = this.api.baseurl;
  teachers:any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.post("admin/teachers", {}).subscribe((result:any)=>{
      this.teachers = result.data;
      console.log(this.teachers);
    })
  }

}
