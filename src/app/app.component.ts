import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEANStackdemoapplication';

  constructor(public ls: LoginService, private router: Router ){

  }

  ngOnInit(){
      var firebaseConfig = {
        apiKey: "AIzaSyDU0b3egsH1apvP7FAE78vgWiDFF61gH3A",
        authDomain: "fir-app-for-meanstack.firebaseapp.com",
        databaseURL: "https://fir-app-for-meanstack.firebaseio.com",
        projectId: "fir-app-for-meanstack",
        storageBucket: "fir-app-for-meanstack.appspot.com",
        messagingSenderId: "794422088175",
        appId: "1:794422088175:web:7d341c537470fd37e1261a"
      };
      
        firebase.initializeApp(firebaseConfig);
        

  }

  getemailfromlocalstorage(){
    return localStorage.getItem('email');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
    
  }
}
