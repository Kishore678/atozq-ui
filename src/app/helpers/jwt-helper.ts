import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class JwtHelper implements HttpInterceptor {

  constructor(private authService:AuthService,private spinnerService:SpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();

    const isLoggedIn = this.authService.isLoggedIn();
    const isApiUrl = req.url.startsWith(environment.apiBaseUrl);
   if(isLoggedIn&&isApiUrl)
   {
    const token = this.authService.getToken();
    req = req.clone({
      setHeaders:{Authorization:`Bearer ${token}`}
    });
   }
   return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.spinnerService.hide();
                    }
                }, (error) => {
                    this.spinnerService.hide();
                }));;
  }
}
