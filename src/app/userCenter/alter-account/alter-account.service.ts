import {Injectable} from '@angular/core';
import {HttpService} from "../../service/http.service";
@Injectable()

export class AlterAccountService{
  constructor(
    private xhr:HttpService
  ){}

  //重新绑定手机第一步获取短信验证码
  getUnbindMobileMsg(options){
    return this.xhr.post('/sms/su/sendUnbundleMobileSms',1,options);
  }
  //重新绑定手机第一步提交解绑数据
  unbindMobile(options){
    return this.xhr.post('/security/unbundleMobile',1,options);
  }

  //重新绑定手机第二步获取短信验证码
  getBindMobileMsg(options){
    return this.xhr.post('/sms/su/sendBoundMobileSms',1,options);
  }
  //重新绑定手机第二步提交解绑数据
  bindMobile(options){
    return this.xhr.post('/security/bundleMobile',1,options);
  }

  //修改登陆密码
  alterLoadPassword(options){
    return this.xhr.post('/security/updatePwd',1,options);
  }

  /*重置支付密码*/
  //获取充值支付密码短信验证码
  getResetPayPwdMsg(){
    return this.xhr.post('/sms/su/sendRestSms',1,null);
  }
  //提交重置支付密码
  toRestPayPwd(options){
    return this.xhr.post('/security/resetPayPwd',1,options);
  }

  /*账户管理*/
  //设置提现账户
  setCashAccount(options){
    return this.xhr.post('/security/updateBank',1,options);
  }
}
