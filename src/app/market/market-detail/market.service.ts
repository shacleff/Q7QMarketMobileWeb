import {Injectable} from '@angular/core';
import {HttpService} from "../../service/http.service";

@Injectable()

export class MarketService{
  constructor(
    private xhr:HttpService
  ){}

  //获取单个商品信息
  private proDetailUrl = '/getTranInfo';
  getProDetail(options){
    return this.xhr.get(this.proDetailUrl,1,options);
  }
  //得到当前委托订单列表
  private etuListUrl = '/tran/listEntrustOrder';
  getEtuList(options){
    return this.xhr.get(this.etuListUrl,1,options);
  }
}

