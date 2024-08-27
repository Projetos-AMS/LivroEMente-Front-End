import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

  async login(user:any){
    const result = await this.http.post<any>('http://localhost:5170/api/User/Login',user).toPromise();
    if (result && result.token){
      window.localStorage.setItem('token',result.token);
      console.log('Token: ' + result.token );
      return true;
    }

    return false;
  }

  async createdAccount(account :any)
  {
    const result = await this.http.post<any>('http://localhost:5170/api/User/Register',account).toPromise();
    return result;
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }

  //expiração de token
  getTokenExpirationDate(token: string): Date | null{
    const decoded: any = jwtDecode(token);

    if(decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean{
    if(!token){
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if(date === null || date === undefined){
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  //verifica se usuario está logado
  isUserLoggedIn(){
    const token = this.getAuthorizationToken();
    if(!token){
      return false;
    }else if(this.isTokenExpired(token)){
      return false;
    }

    return true;
  }
}
