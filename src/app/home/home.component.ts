import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const backendurl = environment.backendurl;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  posts:[] = [];
  isloading:boolean;
  

  allposts:boolean = true;

  constructor( private http: HttpClient ) { }

  ngOnInit() {
    

    this.isloading = true;
    this.http.get(backendurl + "/users/getposts").subscribe((response)=>{

      this.isloading = false;
      this.posts = response["allposts"];
      
    })
  }

  returnmyemail(){
    return localStorage.getItem('email');
  }

  fetchmyposts(){

    this.allposts = false;
    
  }

  fetchallposts(){
    this.allposts = true;
  }

  deletepost(id:String){
    
    this.isloading = true;
    this.http.delete(backendurl+ "/users/deletepost/"+ id).subscribe((response)=>{
      
      this.isloading =false;
      
      if(response["message"]=="Post deleted successfully"){
        alert("Post deleted successfully");

        let dummyarray:[] =[];
        
        for(let i=0;i<this.posts.length;i++){
          if(this.posts[i]["_id"] != id){
            dummyarray.push(this.posts[i]);
          }
        }
        this.posts = dummyarray;
        
      }
      else{
        alert("Post deletion failed");
      }

      
    })
  }

}
