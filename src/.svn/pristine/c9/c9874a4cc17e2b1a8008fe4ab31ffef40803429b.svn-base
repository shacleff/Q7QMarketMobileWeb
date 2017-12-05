import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";

@Injectable()

export class PromoteService{
  constructor(
    private xhr:HttpService
  ){}

  //得到推广列表
  getPromoteList(options){
    return this.xhr.get('/promote/promoteList',1,options);
  }
}
