import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from 'src/app/services/accountService/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.accountService.getCurrentUser();
    console.log(user)

    if (user) {
      if(user.role && route.data['roles']?.includes(user.role)) {
        console.log("role:" + user.role +"data: " + route.data['roles']?.includes(user.role));
        return true;
      }
      this.snackBar.open('Você não tem permissão para acessar esta página.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['']);
      return false;
    }

    this.router.navigate(['login']);
    return false;

  };
}
