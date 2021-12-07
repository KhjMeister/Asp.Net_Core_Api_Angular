import { Component, Input, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user:any;
  constructor(private authService :AuthService,private userService:UserService,private alertify:AlertifyService ) { }

  ngOnInit() {
  }

  sendLike(id:number)
  {
    this.userService.sendLike(this.authService.decodedToken.nameid,id).subscribe(data =>{
      this.alertify.success('شما '+this.user.knownAs+' را پسندید !');
    },error =>{
      this.alertify.error(error);
    })
  }

}
