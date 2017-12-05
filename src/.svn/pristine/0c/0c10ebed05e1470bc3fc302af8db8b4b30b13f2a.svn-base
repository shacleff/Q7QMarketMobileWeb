import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";

@Injectable()

export class ForgetPasswordService{
  constructor(
    private xhr:HttpService
  ){}

  //获取重置密码
  private loginUrl = '/sms/sendRestLoginSms';
  getRestLoginSms(options){
    return this.xhr.post(this.loginUrl,1,options);
  }

  //提交重置密码数据
  private restPwdUrl = '/reg/resetLoginPwd';
  subRestPwd(options){
    return this.xhr.post(this.restPwdUrl,1,options);
  }
}
