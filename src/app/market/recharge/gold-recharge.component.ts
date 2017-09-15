import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";


@Component({
  selector:'gold-recharge',
  templateUrl:'gold-recharge.component.html'
})
export class GoldRechargeComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '金币充值';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
