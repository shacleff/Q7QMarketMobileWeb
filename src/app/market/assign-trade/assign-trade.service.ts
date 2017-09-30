import {Injectable} from '@angular/core';
import {HttpService} from "../../service/http.service";

@Injectable()

export class AssignTradeService{
  constructor(
    private xhr:HttpService
  ){}
  //得到指定交易订单列表
  getList(options){
    return this.xhr.get('/tran/specifyTranList',1,options);
  }

  //得到玩家拥有木材数量
  getItemList(){
    return this.xhr.get('/user/getItemList',1,null);
  }
  //提交指定交易
  specifyTran(options){
    return this.xhr.post('/tran/specifyTran',1,options);
  }
  //确定指定交易订单
  confirmAssignTrade(options){
    return this.xhr.post('/tran/confirmSpecifyTran',1,options);
  }
  //拒绝指定交易订单
  refuseAssignTrade(options){
    return this.xhr.get('/tran/refuseSpecifyTran',1,options);
  }
  //取消指定交易订单
  cancelAssignTrade(options){
    return this.xhr.get('/tran/cancelSpecifyTran',1,options);
  }

}
