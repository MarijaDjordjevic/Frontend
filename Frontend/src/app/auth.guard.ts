import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
    res: boolean;
    constructor(private router: Router, private authService: AuthService) {
    }

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    //     const res = this.authService.authenticate();
    //     res.subscribe(data => {
    //         if (!data) {
    //             this.router.navigate(['/login']);
    //         }
    //     }, error => {
    //         console.log(error);
    //     });
    //     return res;
    return null;
    }

}
