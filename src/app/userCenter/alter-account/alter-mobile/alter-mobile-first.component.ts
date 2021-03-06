import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {TipsService} from "../../../service/tips.service";
import {UserInfoService} from "../../../service/user-info.service";
import {UtilService} from "../../../service/util.service";
import {AlterAccountService} from "../alter-account.service";
import {Title} from '@angular/platform-browser';


@Component({
  selector:'alter-mobile-first',
  templateUrl:'alter-mobile-first.component.html'
})
export class AlterMobileFirstComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private uInfoSer:UserInfoService,
    private util:UtilService,
    private altActSer:AlterAccountService,
    private router:Router,
    private title:Title
  ){}
  ngOnInit(){
    this.getCaptcha();
    this.getUserInfo();
    this.title.setTitle('重新绑定手机号码');
  }
  private timer = 60;//60s后重新获取
  canGetVcode = true;//是否可以的到验证码
  private interVal = null;//定时器
  public getCodeText = '获取验证码';

  //图形验证码图形链接
  public codeUrl='';
  private nextUUID = '';//下一步需要提交的uuid
  //获取图形验证码
  public getCaptcha() {
    let captchaCode = this.util.createUUID();
    this.para.captchaCode = captchaCode;
    this.codeUrl = '/market/captcha-image' + '?ck=' + captchaCode + '&' + new Date().getTime();
    //$(obj).attr('src', url);
    //$(obj).data("key", captchaCode);
  }

  //解绑手机参数
  para = {
    "captchaCode": "",//uuid
    "captchaValue": "",//图形验证码
    "code": "",//短信验证码
    "mobile": "",//原手机号
    "uuid": ""//uuid
  };
  getUserInfo(){
    this.uInfoSer.getUserInfo()
    .then((res:any)=>{
      if(res){
        this.para.mobile = res.userInfo.mobile;
      };
    })
  }
  //获取短信验证码
  getUnbindMobileMsg(){
    if(!this.canGetVcode){
      this.tips.msg('请稍后再试');
      return;
    }
    if(!this.para.captchaValue){
      this.tips.msg('请输入图形验证码');
      return;
    }
    this.altActSer.getUnbindMobileMsg(null)
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
  //提交
  subMit(){
    if(!this.para.captchaValue){
      this.tips.msg('请输入图形验证码');
      return;
    }
    if(!this.para.code){
      this.tips.msg('请输入短信验证码');
      return;
    }
    this.altActSer.unbindMobile(this.para)
    .then((res:any)=>{
      if(res){
        this.nextUUID = res;
        this.router.navigate(['alterMobileSecond',this.nextUUID]);
      }
    });
  }
  public headerTitle = '修改手机号码';
  back(){
    window.history.go(-1);
  }
}
