import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teachers: any;
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.post("admin/teachers", {}).subscribe((result: any) => {
      this.teachers = result.data;
      console.log(this.teachers);
    })
  }
}
