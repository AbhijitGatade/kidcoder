import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})
export class GalleriesComponent implements OnInit {
  baseurl = this.api.baseurl;
  galleries:any=[];
  page : number = 1;
  itemsPerPage = 3;
  totalItems : any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.api.post("admin/galleries", {}).subscribe((result:any)=>{
      this.galleries = result.data;
      this.page =  0;
      this.totalItems = result.totalCourses;
      console.log(this.galleries);
    });
  }

  deletegallery(id:string){
    if(confirm("Sure to delete?")){
      this.api.post("admin/deletegallery", {data:{id:id}}).subscribe((result:any)=>{
        this.load();
      });
    }
  }
}
