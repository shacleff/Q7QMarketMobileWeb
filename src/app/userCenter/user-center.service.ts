import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";

@Injectable()

export class UserCenterService{
  constructor(
    private xhr:HttpService
  ){}

  //得到用户信息
  getUserInfo(){
    return this.xhr.get('/user/getUserInfo',1,null);
  }
  //上传用户身份证图片
  commitCert(options){
    return this.xhr.post('/security/commitCert',1,options);
  }
}
