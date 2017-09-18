import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";


@Component({
  selector:'recharge-success',
  templateUrl:'recharge-success.component.html'
})
export class RechargeSuccessComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '充值结果';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
