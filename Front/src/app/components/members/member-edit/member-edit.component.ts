import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  photoUrl:string="";
  @ViewChild('editForm',{ read: NgForm }) editForm:any ;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  selectedRow:any = 1;
  selectAccordian (code:any){
    this.selectedRow = code;
  }
  user:any;
  constructor(
    private route:ActivatedRoute,
     private alertify: AlertifyService,
     private userService:UserService,private authService:AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl=photoUrl);
  }
  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe(next=>{
      this.alertify.success('اطالاعات کاربر به روز شد.');
      this.editForm.reset(this.user);
    },error=>{
      this.alertify.error(error);
    });
    
  }
  updateMainPhoto(photoUrl:any){
    this.user.photoUrl = photoUrl;
  }

}
