import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";
import {Title} from '@angular/platform-browser';
import {AlterAccountService} from "../alter-account.service";
import {UserInfoService} from "../../../service/user-info.service";

@Component({
  selector:'alter-bankcard',
  templateUrl:'alter-bankcard.component.html'
})
export class AlterBankcardComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title,
    private altActSer:AlterAccountService,
    private uInfoSer:UserInfoService
  ){}

  public isShowAlert:boolean = false;

  //银行列表
  public bankList = [
    {bankName:'中国银行'},
    {bankName:'工商银行'},
    {bankName:'建设银行'},
    {bankName:'农业银行'},
    {bankName:'交通银行'},
    {bankName:'招商银行'},
    {bankName:'中信银行'},
    {bankName:'光大银行'},
    {bankName:'浦发银行'},
    {bankName:'兴业银行'},
    {bankName:'民生银行'},
    {bankName:'平安银行'},
    {bankName:'广发银行'},
    {bankName:'恒丰银行'},
    {bankName:'渤海银行'},
    {bankName:'浙商银行'},
  ];
  selBank(bank:string){
    this.uInfo.bankName = bank;
    this.closeAlertBox();
  }
  public uInfo:any = {
    realName:'',
    cardNo:'',
    bankName:''
  };
  //得到账户信息
  getUserInof(){
    this.uInfoSer.getUserInfo()
      .then((res:any)=>{
        if(res){
          let info = res.userInfo;
          this.uInfo.realName = info.realName;
          this.uInfo.cardNo = info.cardNo;
          this.uInfo.bankName = info.bankName;
        }
      })
  }
  //设置提现账户
  setCashAccount(){
    if(!this.uInfo.realName){
      this.tips.msg('请填写真实姓名');
      return;
    }
    if(!this.uInfo.bankName){
      this.tips.msg('请选择银行');
      return;
    }
    if(!this.uInfo.cardNo){
      this.tips.msg('请填写银行卡号');
      return;
    }
    this.altActSer.setCashAccount(this.uInfo)
    .then((res:any)=>{
      if(res){
        this.getUserInof();
      }
    })
  }
  public headerTitle = '设置提现账户';
  back(){
    window.history.go(-1);
  }
  //关闭弹出层
  public closeAlertBox(){
    this.tips.hideLayer();
    this.isShowAlert = false;
  }
  //打开弹框
  public openAlertBox(){
    this.tips.showLayer();
    this.isShowAlert = true;
  }
  ngOnInit(){
    this.getUserInof();
    this.title.setTitle('设置提现账户');
    //this.openAlertBox()
  }
}
