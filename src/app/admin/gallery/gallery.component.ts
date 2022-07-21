import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  id: null | string = "";
  gallery: any;
  formdata: any;
  photo = "";

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.id = this.id == "0" ? "" : this.id;
    if (this.id != "") {
      var reply = this.api.post("admin/gallery", { data: { id: this.id } });
      reply.subscribe((result: any) => {
        this.gallery = result.data;
        console.log(this.gallery);
        this.load();
      });
    }
    this.load();
  }

  load() {
    this.formdata = new FormGroup(
      {
        id: new FormControl(this.id, Validators.required),
        name: new FormControl(this.gallery == null ? "" : this.gallery.name, Validators.required),
        photo: new FormControl("", Validators.required)
        
      });
  }

  filechanged(event: Event) {
    let element = event.target as HTMLInputElement;
    if (element.files != null) {
      let file = element.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result != null) {
          this.photo = reader.result.toString();
        }
      }
    }

  }

  onClickSumbit(data: any) {
    data.photo = this.photo;
    var reqdata = { "data": data };
    var reply = this.api.post("admin/savegallery", reqdata);
    reply.subscribe((result: any) => {
      var status = result.status;
      if (status == "success") {
        this.router.navigate(["./admin/galleries"]);
      }
      else {
        alert("Something went wrong.");
      }
    });
  }
}
