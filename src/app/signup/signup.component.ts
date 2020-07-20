import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

const backendurl = environment.backendurl;



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  constructor(private http: HttpClient , private router: Router) { }

  isloading: boolean;

  ngOnInit() {
  }

  signup(Form: NgForm){
    if(Form.valid)
    {
      if(Form.value.password == Form.value.cf_password){
        //backend call
        // Form -> object
        this.isloading = true;
        
        this.http.post(backendurl + "/users/signup" , Form.value).subscribe( (responsefromserver) =>{
          this.isloading = false;
          if(responsefromserver["message"]== "User signedup successfully"){
            Form.resetForm();
            this.router.navigate( ['/login'] );
            
            alert("Signed up successfully, Redirecting you to login page");


          }
          else if(responsefromserver["message"] == "User exists" ){
            alert("You have already created an account");
          }
          else{
            alert("Signup failed");
          }

        })
        

      }
      else
        alert("Passwords should be same");
    }
    else{
      alert("All fields are required");
    }
  }

}
