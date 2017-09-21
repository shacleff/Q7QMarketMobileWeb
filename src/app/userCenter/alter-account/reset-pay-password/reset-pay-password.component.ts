import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";


@Component({
  selector:'reset-pay-password',
  templateUrl:'reset-pay-password.component.html'
})
export class ResetPayPasswordComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '重置支付密码';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
