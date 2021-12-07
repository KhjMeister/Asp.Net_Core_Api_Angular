import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  currentUser:any;
  photoUrl = new BehaviorSubject<string>('../../assets/w3images/avatar2.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  decodedToken:any;
  constructor(private http:HttpClient) {   }

  changeMemberPhoto(photoUrl: string){
    this.photoUrl.next(photoUrl);
  }

  login(model:any){
    return this.http.post(this.baseUrl+"auth/login",model)
    .pipe(
      map((response:any)=>{
        const user = response;
        
        if(user){
          localStorage.setItem('token', user.token);
          localStorage.setItem('user',JSON.stringify(user.user));
          this.decodedToken= this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user:User[]){
    return this.http.post(this.baseUrl+"auth/register",user);
    
  }
  loggedIn(){
     const token:any = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  
}
