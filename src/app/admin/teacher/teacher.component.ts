import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadService } from 'ngx-owl-carousel-o/lib/services/lazyload.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  id: null | string = "";
  teacher: any;
  formdata: any;
  photo = "";
  message = "";

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.id = this.id == "0" ? "" : this.id;
    if (this.id != "") {
      var reply = this.api.post("admin/teacher", { data: { id: this.id } });
      reply.subscribe((result: any) => {
        this.teacher = result.data;
        console.log(this.teacher);
        this.load();
      });
    }
    this.load();
  }

  load() {
    this.formdata = new FormGroup(
      {
        id: new FormControl(this.id),
        name: new FormControl(this.teacher == null ? "" : this.teacher.name, Validators.required),
        profession: new FormControl(this.teacher == null ? "" : this.teacher.profession, Validators.required),
        photo: new FormControl(""),
        twitterlink: new FormControl(this.teacher == null ? "" : this.teacher.twitterlink, Validators.required),
        facebooklink: new FormControl(this.teacher == null ? "" : this.teacher.facebooklink, Validators.required),
        LinkedInlink: new FormControl(this.teacher == null ? "" : this.teacher.LinkedInlink, Validators.required)
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
    if(data.photo == "" && this.id == "")
    {
      this.message = "Please select image.";
      return;
    }
    var reqdata = { "data": data };
    var reply = this.api.post("admin/saveteacher", reqdata);
    reply.subscribe((result: any) => {
      var status = result.status;
      if (status == "success") {
        this.router.navigate(["./admin/teachers"]);
      }
      else {
        alert("Something went wrong.");
      }
    });
  }
}
