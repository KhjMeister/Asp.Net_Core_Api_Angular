import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertifyService } from "../services/alertify.service";
import { UserService } from "../services/user.service";
import { User } from "../_models/user";

@Injectable() 
export class ListsResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likesParams = 'Likers'; 

constructor(
    private userService:UserService,
    private router:Router,
    private alertify:AlertifyService
    ){}

    resolve(route:ActivatedRouteSnapshot): Observable<User[]>
    {
        return this.userService.getUsers(this.pageNumber,this.pageSize,this.likesParams).pipe( 
            catchError(error =>{
                this.alertify.error('مشکل در سرور');
                this.router.navigate(['/home']);
                return of(null);
            })

        );    
    }
}