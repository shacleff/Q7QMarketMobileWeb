import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";

@Injectable()

export class CashService{
  constructor(
    private xhr:HttpService
  ){}

  //得到提现记录
  getCashList(options){
    return this.xhr.get('/acct/withdrawList',1,options);
  }
  //提现
  applyCash(options){
    return this.xhr.post('/acct/withdraw',1,options);
  }
  //得到金币明细列表
  getGoldDetial(options){
    return this.xhr.post('/acct/recordList',1,options);
  }
}
