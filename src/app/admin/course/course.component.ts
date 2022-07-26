import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  id: null | string = "";
  course: any;
  formdata: any;
  photo = "";
  message ="";

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.id = this.id == "0" ? "" : this.id;
    if (this.id != "") {
      var reply = this.api.post("admin/course", { data: { id: this.id } });
      reply.subscribe((result: any) => {
        this.course = result.data;
        console.log(this.course);
        this.load();
      });
    }
    this.load();

  }
  
  load() {
    this.formdata = new FormGroup(
      {
        id: new FormControl(this.id),
        name: new FormControl(this.course == null ? "" : this.course.name, Validators.required),
        description: new FormControl(this.course == null ? "" : this.course.description, Validators.required),
        photo: new FormControl(""),
        timing: new FormControl(this.course == null ? "" : this.course.timing, Validators.required),
        fees: new FormControl(this.course == null ? "" : this.course.fees, Validators.required)
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
    var reply = this.api.post("admin/savecourse", reqdata);
    reply.subscribe((result: any) => {
      var status = result.status;
      if (status == "success") {
        this.router.navigate(["./admin/courses"]);
      }
      else {
        alert("Something went wrong.");
      }
    });
  }
}
