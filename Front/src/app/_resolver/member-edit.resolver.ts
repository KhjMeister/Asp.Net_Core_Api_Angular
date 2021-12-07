import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { User } from "../_models/user";

@Injectable()
export class MemberEditResolver implements Resolve<User[]> {
constructor(
    private userService:UserService,
    private router:Router,
    private alertify:AlertifyService,
    private authService:AuthService
    ){}

    resolve(route:ActivatedRouteSnapshot): Observable<User[]>
    {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe( 
            catchError(error =>{
                this.alertify.error('مشکل در گرفتن اطلاعات شما از سرور');
                this.router.navigate(['/home']);
                return of([]);
            })

        );    
    }
}