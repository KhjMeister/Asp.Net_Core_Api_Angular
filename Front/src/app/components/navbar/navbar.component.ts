import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/_models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navInMobile:boolean= false;
  photoUrl:string="";

  registerForm = this.formBuilder.group({
    gender:['male'],
    username: ['', [Validators.required]],
    knownAs: ['', [Validators.required]],
    dateOfBirth: [null, [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(8)]],
    confirmPassword: ['', Validators.required]
    
},{ validator:this.PasswordMatchValidator('password','confirmPassword')
  }
  );
  get f() { return this.registerForm.controls; }

 
  openNav(){
    if(this.navInMobile===true){
      this.navInMobile = false;

    }else{
      this.navInMobile = true;
    }
  }
  model:any = {
    username:null,
    password:null
  }; 
  userRegister:User[] = []; 
  constructor(private formBuilder: FormBuilder,
    public auth:AuthService,
    private alertify:AlertifyService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.auth.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
 
  PasswordMatchValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ passwordMatchValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
  }

  login(){
    this.auth.login(this.model).subscribe(next =>{
      this.alertify.success('با موفقیت وارد شدید');
      },error =>{
        this.alertify.error(error);
      },() =>{
        this.router.navigate(['/profile']);
      });
  }

  loggedIn(){
    return this.auth.loggedIn();
    
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.auth.decodedToken =null;
    this.auth.currentUser = [];
    this.alertify.message('با موفقیت خارج شدید');
    this.router.navigate(['/home']);
  }

  register(){
    if (this.registerForm.valid) {
      this.userRegister = Object.assign({},this.registerForm.value);
      this.auth.register(this.userRegister).subscribe(()=>{
        this.alertify.success('با موفقیت ثبت نام شدید');
      },error =>{
        this.alertify.error(error);
      },()=>{
        this.auth.login(this.userRegister).subscribe(()=>{
          this.router.navigate(['/members']);
        });
      });
    }
}

}
