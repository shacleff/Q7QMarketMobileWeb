import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";


@Component({
  selector:'cash-detail',
  templateUrl:'cash-detail.component.html'
})
export class CashDetailComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '提现记录详情';
  back(arm:any){
    window.history.go(-1);

  }
  ngOnInit(){

  }
}
