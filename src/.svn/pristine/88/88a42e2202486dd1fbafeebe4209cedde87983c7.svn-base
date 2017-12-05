import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";

@Injectable()

export class UserInfoService{
  constructor(
    private xhr:HttpService
  ){}

  //得到用户信息
  getUserInfo(){
    return this.xhr.get('/user/getUserInfo',1,null);
  }
}
