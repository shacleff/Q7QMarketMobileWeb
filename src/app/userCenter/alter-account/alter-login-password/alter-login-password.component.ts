import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";


@Component({
  selector:'alter-login-password',
  templateUrl:'alter-login-password.component.html'
})
export class AlterLoginPasswordComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '修改登录密码';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
