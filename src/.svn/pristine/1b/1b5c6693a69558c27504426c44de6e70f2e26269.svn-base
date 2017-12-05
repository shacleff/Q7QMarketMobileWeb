import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";
import {CashService} from "./cash.service";
import {UserCenterService} from "../userCenter/user-center.service";


@Component({
  selector:'gold-cash',
  templateUrl:'gold-cash.component.html'
})
export class GoldCashComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private cashSer:CashService,
    private uInfoSer:UserCenterService
  ){}
  //可用金币
  useableGold:any;
  //提现账户
  cashAccount:any;
  //提现参数
  para = {
    amt: '',//提现金币数量
    payPwd: ''//支付密码
  };
  //得到用户信息
  private getUserInfo(){
    this.uInfoSer.getUserInfo()
      .then((res:any)=>{
        if(res){
          let userInfo = res.userInfo;
          this.useableGold = userInfo.usableBalance;
          this.cashAccount = userInfo.bankName + '-' + userInfo.realName + '-' + userInfo.cardNo;
        }
      })
  }
  //申请提现
  applyCash(){
    if(!this.para.amt){
      this.tips.msg('请填写提现金币');
      return
    }
    if(this.para.amt>this.useableGold){
      this.tips.msg('提现金币大于可用金币');
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
        this.getUserInfo();
        this.para.amt = '';
        this.para.payPwd = '';
      }
    })
  }

  public headerTitle = '金币提现';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.getUserInfo();
  }
}
