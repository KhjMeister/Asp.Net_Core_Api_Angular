import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { User } from 'src/app/_models/user';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users : User[];
  pagination:Pagination;
  likesParams:string;
  pageNumber = 1;

  pageSize = 3;

  selectedRow:any = 2;
  

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private route:ActivatedRoute,
    private alertify:AlertifyService
  ) { }

  ngOnInit(): void {
    // this.route.data.subscribe(data=>{
    //   this.users = data['users'].result;
    //   this.pagination = data['users'].pagination;
    // });
    this.likesParams = 'Likers';
    this.load();
  }

  displayActivePage(activePageNumber:number){  
    // this.activePage = activePageNumber  
    this.pagination.currentPage = activePageNumber;
    this.pageNumber = activePageNumber;
    this.loadUsers();  
  } 

  load(){
    this.userService.getUsers(this.pageNumber,this.pageSize,null,this.likesParams).subscribe(data=>{
     this.users = data.result;
     
     this.pagination = data.pagination;
   }, error =>{
     this.alertify.error(error);
   });
 }
  loadUsers( ){
    this.userService.getUsers(
      this.pagination.currentPage,this.pagination.itemsPerPage,null,this.likesParams
      ).subscribe((res:PaginatedResult<User[]>)=>{
      this.users = res.result;
    
      this.pagination = res.pagination;
    }, error =>{
      this.alertify.error(error);
    });
     
    }
    selectAccordian (code:any){
      this.selectedRow = code;
      if(this.selectedRow ==1)
        this.likesParams = 'Likees';
      if(this.selectedRow==2)
        this.likesParams = 'Likers';

      this.loadUsers();
    }

}
