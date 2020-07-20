import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const backendurl = environment.backendurl;


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private http: HttpClient) { }

  isloading: boolean;

  ngOnInit() {
  }

  //for uploading file
  file:File;
  fileurl: string|ArrayBuffer="";
  filechanged:boolean = false;
  getfile(file: File)
  {
    let reader = new FileReader();
    this.file = file;
    this.filechanged = true;
    reader.readAsDataURL(this.file);
    reader.onload= ()=>{
      this.fileurl= reader.result;
    }
  }

  post(Form: NgForm){
    const description = Form.value.description;
    this.isloading = true;
    
    
    const reference = firebase.storage().ref();

    const timestamp = Date.now();

    let task = reference.child(timestamp.toString()).put(this.file);

    task.then((snapshot)=>{
      return snapshot.ref.getDownloadURL()
    }).then((url) => {
      

      const object = {
        'email': localStorage.getItem('email'),
        'description' : description,
        'url': url
      }

      
      
      this.http.post(backendurl + '/users/post',object).subscribe((responsefromserver)=>{
        this.isloading= false;
        if(responsefromserver["message"]=="Posted successfully"){
          alert("Posted successfully");
        }
        else{
          alert("Some problem in posting, please try after some time")
        }
      })


    })


  }

  

}
