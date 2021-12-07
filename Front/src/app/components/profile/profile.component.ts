import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  acc1:any = 1;
  chAcc1 (code:any){
    this.acc1 = code;
  }
  user:any;
  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user = data['user'];
    })
  }
  

}
