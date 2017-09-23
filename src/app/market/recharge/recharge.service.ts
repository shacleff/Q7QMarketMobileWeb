import {Injectable} from '@angular/core';
import {HttpService} from "../../service/http.service";

@Injectable()

export class RechargeService{
  constructor(
    xhr:HttpService
  ){}

  //得到充值记录
  getRchList(options){
    //return this.xhr.
  }
}
