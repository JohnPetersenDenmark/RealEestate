import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estate } from 'src/app/models/Estate.model';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  tokenString: string = "my emty token string";

  constructor() {}

  intercept(request: HttpRequest<Estate[]>, next: HttpHandler): Observable<HttpEvent<unknown>>
   {
     const token = sessionStorage.getItem("EestateToken");
     
     if(token != null)
     {
      this.tokenString = token;
     }

     const newRequest = request.clone(
     {
        headers: request.headers.set(
          
            "Authorization", "Bearer " + this.tokenString
          )
     })
    return next.handle(newRequest);
  }
}
