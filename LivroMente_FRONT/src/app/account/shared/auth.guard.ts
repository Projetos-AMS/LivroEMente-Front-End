import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private accountService: AccountService) { }
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
  //const token = window.localStorage.getItem('token');
  if(this.accountService.isUserLoggedIn()){
    return true;
  } else {
    this.router.navigate(['login']);
    return false;
  }
}
 
};
