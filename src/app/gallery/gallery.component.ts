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

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.post("admin/galleries", {}).subscribe((result:any)=>{
      this.galleries = result.data;
      console.log(this.galleries);
    })
  }

}
