import {Component,OnInit,AfterViewInit} from '@angular/core'
import {RegistService} from "./regist.service";
import {TipsService} from "../service/tips.service";
import {UtilService} from "../service/util.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector:'regist-el',
  templateUrl:'./regist.component.html'
})

export class RegistComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private util:UtilService,
    private regSer:RegistService,
    private title:Title,
    private router:Router
  ){}
  ngOnInit(){
    this.getUrlCheckOrigin();
    this.hideClause();
    this.getCaptcha();
    this.title.setTitle('注册');
    this.autoInput();
    //this.tips.showLayer();
  }
  //图形验证码
  codeUrl:any;
  //是否是从web平台的游戏端跳转过来的-默认false
  isFormWebGame = false;
  isFormNativeGame = false;
  //通过url判断是否是从web平台游戏端跳转过来的
  private getUrlCheckOrigin(){
    let origin = this.router.url.split("=")[1];
    // console.log(origin);
    this.isFormWebGame = origin=="web"?true:false;
    this.isFormNativeGame = origin=="native"?true:false;
  }
  //自动填充推荐码
  public sidCanInput = true;
  private autoInput(){
    let sid = this.util.getQueryString('sid');
    if(sid){
      this.reg.superiorId = sid;
      this.sidCanInput = false;
    }

  }
  public getCaptcha() {
    let captchaCode = this.util.createUUID();
    this.reg.captchaCode = captchaCode;
    this.codeUrl = '/market/captcha-image' + '?ck=' + captchaCode + '&' + new Date().getTime();
  }

  private timer = 60;//60s后重新获取
  canGetVcode = true;//是否可以的到验证码
  private interVal = null;//定时器

  //是否同意条款
  public isAgreenClause = false;
  //是否显示条款
  public isShowClause = false;

  public registSuccess = false;//未注册成功

  public getCodeText = '获取验证码';

  showClasue(){
    this.tips.showLayer();
    this.isShowClause = true;
  }
  hideClause(){
    this.tips.hideLayer();
    this.isShowClause = false;
  }
  public reg = {
    "captchaCode": "",//图形验证码后缀uuid
    "captchaValue": "",//图形验证码
    // "cardId": "",//身份证号码
    "channel": "",//渠道
    "code": "",//验证码
    "field1": "",//预留
    "field2": "",//预留
    "field3": "",//预留
    "field4": "",//预留
    "field5": "",//预留
    "mobile": "",//手机号码
    // "name": "",//真实姓名
    "password": "",//密码
    "superiorId": 0//推荐码
  };
  public passwordAgain = "";//再次输入密码

  getMsgCode(){
    if(!this.canGetVcode){
      this.tips.msg('请稍后再试');
      return;
    }
    if(!this.reg.mobile){
      this.tips.msg('请输入手机号');
      return;
    }else if(!this.util.regExp().mobileNum.test(this.reg.mobile)){
      this.tips.msg('手机号码格式有误');
      return;
    }
    if(!this.reg.captchaValue){this.tips.msg('请输入图形验证码');return;};
    this.regSer.msgCode({mobile:this.reg.mobile})
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
        this.tips.msg('验证码发送成功');
        console.log(res);
      }
    })
  }
  //注册
  regist(){
    if(!this.reg.mobile){this.tips.msg('请输入手机号'); return};
    if(!this.util.regExp().mobileNum.test(this.reg.mobile)){this.tips.msg('手机号码有误'); return};

    // if(!this.reg.name){this.tips.msg('请输入姓名'); return};
    // if(!this.util.regExp().name.test(this.reg.name)){this.tips.msg('姓名格式有误'); return};
    //
    // if(!this.reg.cardId){this.tips.msg('请输入身份证号'); return};
    // if(!this.util.regExp().name.test(this.reg.cardId)){this.tips.msg('请输入正确身份证号'); return};

    if(!this.reg.captchaValue){this.tips.msg('请输入图形验证码');return;};
    if(!this.reg.code){this.tips.msg('请输入短信验证码'); return};

    if(!this.reg.password){this.tips.msg('请输入密码'); return};
    if(this.reg.password.length>18||this.reg.password.length<6){this.tips.msg('请输入6-18位密码'); return};

    if(!(this.reg.password==this.passwordAgain)){this.tips.msg('两次密码不一致'); return};
    if(!this.isAgreenClause){
      this.tips.msg('请同意绿色家园服务条款'); return
    }
    this.regSer.regist(this.reg)
    .then((res:any)=>{
      if(res){
        console.log(res);
        this.tips.msg('注册成功');
        //如果是从web游戏跳转过来返回游戏
        if(this.isFormWebGame){
          setTimeout(()=>{
            window.history.back();
          },1000);
        }else if(this.isFormNativeGame){
          this.tips.msg('注册成功,请返回游戏登录');
        }else{
          this.registSuccess = true;//注册成功
        }
      }
    });
  }

  public headerTitile = '用户注册';
  back() {
    window.history.go(-1);
  }
  ngAfterViewInit(){
    $(".registBox").height($(window).height()-40).css('background','#f7f7f7');
  }
}
