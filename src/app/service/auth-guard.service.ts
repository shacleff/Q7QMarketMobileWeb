import {Injectable} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from './auth.service'
import {TipsService} from "./tips.service";

@Injectable()

export class AuthGuard implements  CanActivate{
  constructor(
    private authService:AuthService,
    private router:Router,
    private tips:TipsService
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    let url:string = state.url;

    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    this.tips.msg('请先登录');
    return false;
  }
}
