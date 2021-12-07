import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  usert:User[]=[];
  user:any;

  selectedRow:any = 4;
  selectAccordian (code:any){
    this.selectedRow = code;
  }


  
 constructor(
    private alertify:AlertifyService,
    private userService:UserService,
    private route:ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user = data['user']
    });
   
  }
// loadUser(){
//   var id=+this.route.snapshot.params['id'];
//   this.userService.getUser(id).subscribe( res => {
//     this.user = res;
    
//   },error=>{
//     this.alertify.error(error);
//   })
// }

}
