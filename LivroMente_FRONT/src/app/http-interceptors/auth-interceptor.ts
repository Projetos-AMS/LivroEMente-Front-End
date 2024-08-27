import { Injectable } from '@angular/core';
import { AccountService } from './../account/shared/account.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private accountService: AccountService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const token = this.accountService.getAuthorizationToken();
        let request: HttpRequest<any> = req;

        if (token && !this.accountService.isTokenExpired(token) ){
            //request é imutavel,ou seja, não é possível mudar nada
            //o req.clone clona ele para mudar as propriedades
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        //retorna o request com o erro tratado
        return next.handle(request)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent){
            //erro de client-side ou de rede
            console.error('Ocorreu um erro:', error.error.message);
        } else {
            //erro retornado pelo backend
            console.error(
                `Código do erro ${error.status}` +
                `Erro: ${JSON.stringify(error.error)}`
            );
        }
        //retorna um observable com uma mensagem amigavel
        return throwError('Ocorreu um erro, tente novamente');
    }
}