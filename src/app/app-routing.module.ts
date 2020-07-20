import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouteGuard } from './route.guard';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { PathnotfoundComponent } from './pathnotfound/pathnotfound.component';
import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';


const routes: Routes = [
  {path: '', redirectTo: 'root', pathMatch: 'full'},
  {path: 'root', component: RootComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "home", component: HomeComponent, canActivate: [RouteGuard]},
  {path: "post", component: PostComponent, canActivate: [RouteGuard]},
  {path: "profile/:email", component: ProfileComponent, canActivate: [RouteGuard]},
  {path : "**", component: PathnotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
