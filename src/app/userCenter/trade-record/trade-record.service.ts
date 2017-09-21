import {Injectable} from '@angular/core';
import {HttpService} from "../../service/http.service";

@Injectable()

export class TradeRecordService{
  constructor(
    private xhr:HttpService
  ){}
  //得到交易订单列表
  getList(options){
    return this.xhr.post('/tran/entrustRecordQuery',1,options);
  }
}
