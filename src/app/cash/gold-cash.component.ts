import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";
import {CashService} from "./cash.service";


@Component({
  selector:'gold-cash',
  templateUrl:'gold-cash.component.html'
})
export class GoldCashComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private cashSer:CashService
  ){}

  //提现参数
  para = {
    amt: '',//提现金币数量
    payPwd: ''//支付密码
  };
  //申请提现
  applyCash(){
    if(!this.para.amt){
      this.tips.msg('请填写提现金币');
      return
    }
    if(!this.para.payPwd){
      this.tips.msg('请填写支付密码');
      return
    }

    this.cashSer.applyCash(this.para)
    .then((res:any)=>{
      if(res){
        this.tips.msg('申请提现成功');
      }
    })
  }

  public headerTitle = '金币提现';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
