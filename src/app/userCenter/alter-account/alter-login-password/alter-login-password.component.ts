import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AlterAccountService} from "../alter-account.service";

@Component({
  selector:'alter-login-password',
  templateUrl:'alter-login-password.component.html'
})
export class AlterLoginPasswordComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private router:Router,
    private title:Title,
    private altActSer:AlterAccountService
  ){}
  para:any = {
    oldPwd:'',//老密码
    newPwd:'',//新密码
    rePwd:''//重复密码
  };
  alterLoadPassword(){
    if(!this.para.oldPwd){
      this.tips.msg('请输入原密码');
      return;
    }
    if(!this.para.newPwd){
      this.tips.msg('请输入新密码');
      return;
    }
    if(this.para.newPwd!==this.para.rePwd){
      this.tips.msg('两次新密码不一样');
      return;
    }
    this.altActSer.alterLoadPassword(this.para)
    .then((res:any)=>{
      if(res){
        this.tips.msg('修改登陆密码成功,请重新登陆');
        this.router.navigate(['login']);
      }
    });
  }
  public headerTitle = '修改登录密码';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('修改登陆密码');
  }
}
