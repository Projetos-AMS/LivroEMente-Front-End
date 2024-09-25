import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/accountService/account.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private accountService: AccountService,
        private router: Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.accountService.getAuthorizationToken();
      let request: HttpRequest<any> = req;

      if (token && !this.accountService.isTokenExpired(token)) {
        request = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      }

      return next.handle(request).pipe(
        catchError((error) => this.handleError(error))
      );
    }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message);
    } else {

      console.error(`Código do erro ${error.status}, ` + `Erro: ${JSON.stringify(error.error)}`);

      if (error.status === 401) {
        this.accountService.logout();
        this.router.navigate(['/login']);
      }
    }

    return throwError(() => new Error('Ocorreu um erro, tente novamente mais tarde.'));
  }
}
