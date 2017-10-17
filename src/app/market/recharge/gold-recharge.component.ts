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
  back(){
    window.history.go(-1);
  }
  public datas = {
    number:50,//充值金额默认50元
    type:"1",//充值类型默认微信 1->微信 2->支付宝 3->银联
  };
  public payType = 1;//1快捷支付方式 2手动输入支付
  public iptNum:any;//输入框中金额
  public selNum:any=50;//快捷支付选择的金额默认50元
  //支付金额选择
  selRchNum(num:number){
    this.datas.number = num;
    this.selNum = num;
    this.iptNum='';
    this.payType = 1;
  }
  //输入金额框得到焦点事件
  iptFocus(){
    this.payType=2;
  }
  //输入框失去焦点事件
  iptBlur(){
    if(this.iptNum>=10&&this.iptNum<=20000){
      this.payType=2;
    }else if(!this.iptNum){
      this.payType=1;
      this.datas.number = this.selNum;
      this.iptNum='';
      return;
    }else{
      this.tips.msg('充值金额需要在10-20000之间');
      this.datas.number = this.selNum;
      this.iptNum='';
      this.payType=1;
    }
  }
  //提交充值
  subRch(){
    //如果手动输入的金额合法
    if(this.payType==2){
      this.datas.number = this.iptNum;
    }
    console.log(this.datas);
  }
  //选择支付方式
  selPayType(type:string){
    this.datas.type=type;
  }
  ngOnInit(){

  }
}
