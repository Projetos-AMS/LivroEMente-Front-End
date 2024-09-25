import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { EndpointsUrls } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }
  async login(user: any) {
    const result = await this.http.post<any>(EndpointsUrls.apiEndpoints['login'], user).toPromise();
    if (result && result.token) {
      const token = result.token.replace('Bearer ', '');
      window.localStorage.setItem('token', token);
      console.log('Token: ' + token);
      return true;
    }
    return false;
  }

  async createdAccount(account :any)
  {
    const result = await this.http.post<any>(EndpointsUrls.apiEndpoints['register'],account).toPromise();
    if (result && result.token) {
      const token = result.token.replace('Bearer ', '');
      window.localStorage.setItem('token', token);
      console.log('Token: ' + token);
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    return window.localStorage.getItem('token') || '';
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

  isUserLoggedIn(): boolean {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired(token);
  }

  logout() {
    window.localStorage.removeItem('token');
  }

}
