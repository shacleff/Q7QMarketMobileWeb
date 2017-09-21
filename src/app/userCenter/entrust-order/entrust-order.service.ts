import {Injectable} from '@angular/core';
import {HttpService} from "../../service/http.service";

@Injectable()

export class EntrustOrderService{
  constructor(
    private xhr:HttpService
  ){}
  //得到委托订单列表
  getEtuList(options){
    return this.xhr.post('/tran/entrustOrderQuery',1,options);
  }
}
