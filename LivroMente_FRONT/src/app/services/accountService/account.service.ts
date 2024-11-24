import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { EndpointsUrls } from '../endpoints';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http : HttpClient) {this.initializeUser(); }

  private initializeUser(): void {
    const token = this.getAuthorizationToken();
    if (token && !this.isTokenExpired(token)) {
      const decodedToken: any = jwtDecode(token);
      const userInfo: User = {
        id: decodedToken.nameid,
        completeName: decodedToken.unique_name,
        email: decodedToken.email,
        role: decodedToken.role
      };
      this.userSubject.next(userInfo);
    }
  }
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  keepUser(userToken: string){
    const token = userToken.replace('Bearer ', '');
      window.localStorage.setItem('token', token);
      this.initializeUser();
  }

  async login(user: any) {
    const result = await this.http.post<any>(EndpointsUrls.apiEndpoints['login'], user).toPromise();
    if (result && result.token) {
      this.keepUser(result.token);
      return true;
    }
    return false;
  }

  async createdAccount(account :any)
  {
    const result = await this.http.post<any>(EndpointsUrls.apiEndpoints['register'],account).toPromise();
    if (result && result.token) {
      this.keepUser(result.token);
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    return window.localStorage.getItem('token') || '';
  }

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
    this.userSubject.next(null);
  }
}
