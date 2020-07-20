import { BrowserModule } from '@angular/platform-browser';
import { NgModule   } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule, MatButtonModule , MatProgressSpinnerModule} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth-interceptor';
import { PathnotfoundComponent } from './pathnotfound/pathnotfound.component';
import { RootComponent } from './root/root.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PostComponent,
    HomeComponent,
    PathnotfoundComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor, multi:true, }],
  bootstrap: [AppComponent]
})
export class AppModule { }
