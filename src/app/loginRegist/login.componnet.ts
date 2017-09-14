import {Component,OnInit,ViewEncapsulation,AfterViewChecked} from '@angular/core';
import {Router} from '@angular/router'

import {LoginService} from './login.service'
import {AuthService} from '../service/auth.service'

import {TipsService} from "../service/tips.service";
import {UtilService} from "../service/util.service";
@Component({
  selector:'log-in',
  templateUrl:'./login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit,AfterViewChecked{
  constructor(
      public router:Router,
      private toLogin:LoginService,
      private tips:TipsService,
      private util:UtilService,
      public authService:AuthService
  ){

  };
  showTips(msg:string){
    this.tips.msg(msg);
  }
  public loginData = {
    account:"",
    password:""
  };
  public filter(){
    setTimeout(()=>{
      var val = this.loginData.account;
      this.loginData.account = val.replace(/[^\d]/g, "");
    },100);
  }
  public logIn(){
    if(!this.util.regExp().mobileNum.test(this.loginData.account)){
      this.showTips('请输入正确手机号');
      return;
    }else if(!this.loginData.password){
      this.showTips('请输入密码');
      return;
    }else if(this.loginData.password.length<6||this.loginData.password.length>18){
      this.showTips('密码长度为6-18位');
      return;
    }else{
      this.showTips('登录成功');

      //发布时打开
      //this.toLogIn.logIn().then((data) => {
      //    console.log(data)
      //});

      //以下为模拟登陆
      this.authService.login().subscribe(() => {
        if (this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/main';
          this.router.navigate([redirect]);
        }
      });
    }
  }
  ngOnInit(){
  }
  ngAfterViewChecked(){
    //$("#ff").hide();
  }
}
