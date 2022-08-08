import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isadmin = false;

  constructor(private spinner: NgxSpinnerService, public loader:LoaderService) {
    if(localStorage.getItem("usertype") == "admin")
      this.isadmin = true;
   }

  ngOnInit(): void {
    this.spinner.show();
  }

  logout(){
    localStorage.clear();
    window.location.replace("../");
  }

}
