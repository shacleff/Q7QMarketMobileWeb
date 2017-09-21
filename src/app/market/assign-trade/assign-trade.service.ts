import {Injectable} from '@angular/core';
import {HttpService} from "../../service/http.service";

@Injectable()

export class AssignTradeService{
  constructor(
    private xhr:HttpService
  ){}
  //得到指定交易订单列表
  getList(options){
    return this.xhr.post('/tran/specifyTranList',1,options);
  }
}
