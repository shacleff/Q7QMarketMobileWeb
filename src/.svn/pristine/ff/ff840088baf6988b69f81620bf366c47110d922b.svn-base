import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";

@Injectable()

export class RegistService{
  constructor(
    private xhr:HttpService
  ){}

  private registUrl = '/reg/register';
  private getMsgUrl = '/sms/sendRegSms';

  //得到验证码
  msgCode(options){
    return this.xhr.post(this.getMsgUrl,1,options);
  }
  //注册
  regist(options){
    return this.xhr.post(this.registUrl,1,options);
  }
}
