import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
 pagination:Pagination;
 pageNumber = 1;
pageSize = 3;

  // activePage:number = 1;  
  
  displayActivePage(activePageNumber:number){  
    // this.activePage = activePageNumber  
    this.pagination.currentPage = activePageNumber;
    this.pageNumber = activePageNumber;
    this.loadUsers();  
  }  
 
 
  users :User[] ;
  user:User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value:'male',display:'مرد'},{value:'female',display:'زن'}];
  userParams:any= {
    minAge:18,
    maxAge:99
  };

  constructor(
    private userService:UserService,
    private alertify:AlertifyService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.route.data.subscribe(data =>{
    //   this.users = data['users'].result;
    // });
    this.load();

    this.userParams.gender = this.user.gender === 'female' ? 'male': 'female';
    this.userParams.orderBy = 'lastActive';
    

  }

  resetFilters(){
    this.userParams.gender = this.user.gender === 'female' ? 'male': 'female';
    this.userParams.minAge =18;
    this.userParams.maxAge =99;
    this.load();
  }

  loadUsers( ){
   
    this.userService.getUsers(this.pagination.currentPage,this.pagination.itemsPerPage,this.userParams).subscribe((res:PaginatedResult<User[]>)=>{
      this.users = res.result;
    
      this.pagination = res.pagination;
    }, error =>{
      this.alertify.error(error);
    });
     
    }

    load(){
       this.userService.getUsers(this.pageNumber,this.pageSize,this.userParams).subscribe(data=>{
        this.users = data.result;
        
        this.pagination = data.pagination;
      }, error =>{
        this.alertify.error(error);
      });
    }
    lastAONM(type:any){
      this.userParams.orderBy = type;
      this.loadUsers();

    }

}
