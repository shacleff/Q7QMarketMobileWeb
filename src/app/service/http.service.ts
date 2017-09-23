//网络请求封装
import { Injectable } from '@angular/core';
import { Headers,Http ,RequestOptions,URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {TipsService} from "./tips.service";
@Injectable()
export class HttpService {
  constructor(
    private http:Http,
    private tip:TipsService
  ){}
  private host = '/market';
  private headers = new Headers({
    'Content-type':'application/json'
  });
  //get请求
  public get(url:string,isAuth:any,datas:any){
    let token = isAuth?localStorage.getItem('token'):null;
    let _header = new Headers({
      'Authorization':token
    });
    return this.http.get(
      this.host+url+(datas?this.toUrlPar(datas):''),
      {headers:_header}
    ).toPromise().then((res:any)=>{
      let result = JSON.parse(res._body);
      if(!result.success){
        this.tip.msg(result.msg);
        console.log(result);
        return false;
      }else{
        return result.obj||true;
      }
    });
  }
  //post请求
  public post(url:string,isAuth:any,datas:any){
    let token = isAuth?localStorage.getItem('token'):null;
    let header = new Headers({
      'Authorization':token
    });
    return this.http.post(this.host+url,datas,{headers:header})
    .toPromise()
    .then((res:any)=> {
      let result = JSON.parse(res._body);
      if(!result.success){
        this.tip.msg(result.msg);
        console.log(result);
        return false;
      }else{
        return result.obj||true;
      }
    });
  }
  //js对象字面量转化为url请求参数
  private toUrlPar(obj) {
    var s = ""
    for (var itm in obj) {
      if (obj[itm] instanceof Array == true) {
        //是数组
        s += "&" + itm + "_count=" + obj[itm].length
        for (var i = 0; i < obj[itm].length; i++) {
          if (obj[itm][i] instanceof Array == true) {
            s += ergodicJson2(obj[itm][i]);
          } else if (obj[itm][i] instanceof Object == true) {
            s += ergodicJson2(obj[itm][i]);
          } else {
            s += "&" + encodeURI(obj[itm][i]) + "=" + encodeURI(obj[itm][i]);
          }
        }
      } else if (obj[itm] instanceof Object == true) {
        //是json对象。
        s += ergodicJson2(obj[itm]);
      }
      else {
        //是简单数值
        s += "&" + encodeURI(itm) + "=" + encodeURI(obj[itm]);
      }
    }
    if(s){
      s = "?"+s.substring(1,s.length);
      return s;
    }else{
      return '';
    }
  }
}
