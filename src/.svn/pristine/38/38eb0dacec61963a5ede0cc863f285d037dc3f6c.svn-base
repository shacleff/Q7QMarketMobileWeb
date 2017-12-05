import {Component,OnInit,ViewEncapsulation,AfterViewInit} from '@angular/core';
import {Router} from '@angular/router'

import {Title} from "@angular/platform-browser";
import {TipsService} from "../service/tips.service";
import {UtilService} from "../service/util.service";
import {ForgetPasswordService} from "./forget-password.service";
@Component({
  selector:'forget-password',
  templateUrl:'./forget-password.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ForgetPasswordComponent implements OnInit,AfterViewInit{
  constructor(
    public router:Router,
    private tips:TipsService,
    private util:UtilService,
    private restSer:ForgetPasswordService,
    private title:Title
  ){

  };
  private timer = 60;//60s后重新获取
  //可以获取短信验证码
  canGetVcode = true;
  private interVal = null;//定时器
  //获取验证码按钮中的文字
  public getCodeText = "获取验证码";
  //提交数据
  public subDatas = {
    "captchaCode": "",//图形验证码后缀uuid
    "captchaValue": "",//图形验证码
    "mobile":"",//手机号
    "code":"",//短信验证码
    "newLoginPwd":"",//新密码
    "passwordAgain":"",//再次新密码
  };
  //图形验证码路径
  public codeUrl;
  //获取图形验证码
  public getCaptcha(){
    let captchaCode = this.util.createUUID();
    this.subDatas.captchaCode = captchaCode;
    this.codeUrl = '/market/captcha-image' + '?ck=' + captchaCode + '&' + new Date().getTime();
  }
  //获取短信验证码
  public getMsgCode(){
    if(!this.subDatas.mobile){
      this.showTips('请输入手机号');
      return;
    }else if(!(this.util.regExp().mobileNum).test(this.subDatas.mobile)){
      this.showTips('手机号格式有误');
      return;
    }else if(!this.subDatas.captchaValue){
      this.showTips('请输入图形验证码');
      return;
    }else{
      this.restSer.getRestLoginSms({mobile:this.subDatas.mobile})
        .then((res:any)=>{
          if(res){
            this.interVal = setInterval(()=>{
              this.timer--;
              this.canGetVcode = false;
              this.getCodeText = '重新获取'+this.timer;
              if(this.timer<0){
                clearInterval(this.interVal);
                this.timer=60;
                this.canGetVcode = true;
                this.getCodeText = '获取验证码';
              }
            },1000);
            this.showTips('短信验证码发送成功');
          }
        });
    }
  }
  //提交重置密码资料
  public submitDatas(){
    if(!this.subDatas.mobile){
      this.showTips('请输入手机号');
      return;
    }else if(!this.subDatas.captchaValue){
      this.showTips('请输入图形验证码');
      return;
    }else if(!this.subDatas.code){
      this.showTips('请输入短信验证码');
      return;
    }else if(!this.subDatas.newLoginPwd){
      this.showTips('请输入新密码');
      return;
    }else if(!this.subDatas.passwordAgain){
      this.showTips('请再次输入密码');
      return;
    }else if(!(this.util.regExp().mobileNum).test(this.subDatas.mobile)){
      this.showTips('手机号格式有误');
      return;
    }else if(this.subDatas.newLoginPwd!==this.subDatas.passwordAgain){
      this.showTips('两次密码不一样');
      return;
    }else{
      this.restSer.subRestPwd(this.subDatas)
        .then((res:any)=>{
          if(res){
            this.showTips('重置密码成功');
            this.subDatas.captchaCode = "";
            this.subDatas.captchaValue = "";
            this.subDatas.mobile = "";
            this.subDatas.code = "";
            this.subDatas.newLoginPwd = "";
            this.subDatas.passwordAgain = "";
          }
        });
    }
  }
  showTips(msg:string){
    this.tips.msg(msg);
  }
  public headerTitile = '重置密码';
  back() {
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('重置密码');
    this.getCaptcha();
  }
  ngAfterViewInit(){
    $(".forgetPassword").height($(window).height()-40).css('background','#f7f7f7');
  }
}
