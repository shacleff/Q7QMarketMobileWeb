import {Injectable} from '@angular/core';

@Injectable()

export class RechargeService{
  public getDetail(id:string){
    return Promise.resolve('444');
  }
}
