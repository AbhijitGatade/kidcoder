import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  baseurl = this.api.baseurl;
  galleries:any;
  page : number = 1;
  itemsPerPage = 6;
  totalItems : any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.post("admin/galleries", {}).subscribe((result:any)=>{
      this.galleries = result.data;
      this.page =  0;
      this.totalItems = result.totalCourses;
      console.log(this.galleries);
    })
  }

}
