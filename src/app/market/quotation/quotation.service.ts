import {Injectable} from '@angular/core';
import {HttpService} from "../../service/http.service";
@Injectable()
export class QuotationService{
  constructor(
    private xhr:HttpService
  ){}
  //获取商品行情列表
  private proListUrl = '/showOverallMarket';
  getProList(){
    return this.xhr.post(this.proListUrl,1,null);
  }
}

