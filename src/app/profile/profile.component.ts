import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

const backendurl = environment.backendurl;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, private ar : ActivatedRoute ) { }

  name: String; 
  email: String;
  paramvalue: String;
  isloading:boolean = false;
  buttonenabled:boolean;

  ngOnInit() {

    this.ar.paramMap.subscribe((param)=>{
      this.paramvalue = (param.get('email'));
      if(localStorage.getItem('email') == this.paramvalue){
        this.buttonenabled = true;
      }
      else{
        this.buttonenabled = false;
      }
      this.isloading = true;
      this.http.get(backendurl + "/users/profile/"+this.paramvalue).subscribe((response)=>{
        this.isloading = false;
        if(response["message"] == "User found"){
          
          this.name = response["data"]["name"];
          this.email = response["data"]["email"];
        }
        else if(response["message"]=="User not found"){
          alert("No user found!");
        }
    })  
    })
  }

  update(Form: NgForm){
    if(Form.valid && this.buttonenabled){
      this.http.put(backendurl +'/users/editprofile/'+this.paramvalue , Form.value).subscribe((response)=>{
        if(response["message"]=="Profile updation success"){
          alert("Profile updation success");
        }
        else{
          alert("Profile updation failed");
        }
      })
    }
    else{
      alert("All fields are required");
    }
  }
}
