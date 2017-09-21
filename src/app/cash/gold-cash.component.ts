import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";


@Component({
  selector:'gold-cash',
  templateUrl:'gold-cash.component.html'
})
export class GoldCashComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '金币提现';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
