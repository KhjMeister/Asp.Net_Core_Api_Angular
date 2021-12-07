import { HttpInterceptor ,HttpRequest,HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()


export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(catchError((error: HttpErrorResponse) => {
            const serverError = error.error;
            let modelStateErrors = '';
            let errorMsg = '';
            if (serverError instanceof HttpErrorResponse) 
            {
                
              errorMsg = `Error: ${serverError.message}`;
              return throwError(errorMsg);
            }
            else 
            
            if(error.error.status === 401)
                {
                    return throwError('نام کاربری یا رمز اشتباه است');
                }
            if(serverError && typeof serverError=== 'object')
            {
                for (const key in serverError.errors) {
                    if(serverError.errors[key])
                    {
                       modelStateErrors += serverError.errors[key] +'\n';
                    }     
                }
            }
            return throwError(modelStateErrors || serverError || 'مشکل سرور');
        })
        )
    }
  }

// export class HttpErrorInterceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//       return next.handle(req)
//         .pipe(
//           catchError((error:HttpErrorResponse) => {
            
//               const serverError = error.error;
//               let modelStateErrors = '';
//             if (error instanceof HttpErrorResponse) {
//               const applicationError = error.headers.get('Application-Error');
//               if(applicationError){
//                   console.error(applicationError);
//                   return throwError(applicationError);
//               }
//               if(serverError && typeof serverError=== 'object'){
//                   for (const key in serverError) {
//                       if(serverError[key]){
//                          modelStateErrors += serverError[key] +'\n';
//                       }     
//                   }
//               }
//             }
//             return throwError(modelStateErrors||serverError || 'Server Error');
     
//           })
//         );
//     }
//   }

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
}



