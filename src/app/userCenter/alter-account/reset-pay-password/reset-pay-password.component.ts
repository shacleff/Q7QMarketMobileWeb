import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AlterAccountService} from "../alter-account.service";
import {UtilService} from "../../../service/util.service";

@Component({
  selector:'reset-pay-password',
  templateUrl:'reset-pay-password.component.html'
})
export class ResetPayPasswordComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private altActSer:AlterAccountService,
    private title:Title,
    private router:Router,
    private util:UtilService
  ){}

  //获取验证码相关参数
  private timer = 60;//60s后重新获取
  canGetVcode = true;//是否可以的到验证码
  private interVal = null;//定时器
  public getCodeText = '获取验证码';
  //获取短信验证码
  getResetPayPwdMsg(){
    if(!this.canGetVcode){
      this.tips.msg('请稍后再试');
      return;
    }
    this.altActSer.getResetPayPwdMsg()
    .then((res:any)=>{
      if(res){
        this.interVal = setInterval(()=>{
          this.timer--;
          this.canGetVcode = false;
          this.getCodeText = '重新获取'+this.timer;
          if(this.timer<=0){
            clearInterval(this.interVal);
            this.canGetVcode = true;
            this.getCodeText = '获取验证码';
            this.timer=60;
          }
        },1000);
        this.tips.msg('短信验证码发送成功');
      }
    })
  }
  //提交参数
  para:any = {
    captchaCode:'',//图形验证码后缀uuid
    captchaValue:'',//图形验证码
    code:'',//短信验证码
    newPayPwd:'',//新支付密码
  };
  newPayPwdAgn='';
  //提交重置支付密码
  toRestPayPwd(){
    if(!this.para.captchaValue){
      this.tips.msg('请输入图形验证码');
      return;
    }
    if(!this.para.code){
      this.tips.msg('请输入短信验证码');
      return;
    }
    if(!this.para.newPayPwd){
      this.tips.msg('请输入新支付密码');
      return;
    }
    if(this.para.newPayPwd!==this.newPayPwdAgn){
      this.tips.msg('两次密码不一样');
      return;
    }
    this.altActSer.toRestPayPwd(this.para)
    .then((res:any)=>{
      if(res){
        this.tips.msg('设置成功');
        this.router.navigate(['userCenter']);
      }
    })
  };
  //获取图形验证码
  //图形验证码图形链接
  public codeUrl='';
  //获取图形验证码
  public getCaptcha() {
    let captchaCode = this.util.createUUID();
    this.para.captchaCode = captchaCode;
    this.codeUrl = '/market/captcha-image' + '?ck=' + captchaCode + '&' + new Date().getTime();
  }

  public headerTitle = '重置支付密码';
  back(){
    window.history.go(-1);
  }
  ngOnInit(){
    this.getCaptcha();
    this.title.setTitle('重置支付密码');
  }
}
