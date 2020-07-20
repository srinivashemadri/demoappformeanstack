import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

const backendurl = environment.backendurl;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  isloading: boolean ;



  ngOnInit() {
  }

  login(Form:NgForm){
    if(Form.valid){

      this.isloading = true;
      this.http.post(backendurl + '/users/login', Form.value).subscribe((responsefromserver)=>{
        this.isloading = false;
        if(responsefromserver["message"]=="Login Success"){
          
          localStorage.setItem('token', responsefromserver["signedToken"]);
          localStorage.setItem('email', responsefromserver["email"]);
          this.router.navigate(['/home']);
        }
        else if(responsefromserver["message"]=="Invalid password"){
          alert("Invalid credentials");
        }
        else{
          alert("User not found")
        }
      })
    }
    else{
      alert("All fields are required")
    }
  }

}
