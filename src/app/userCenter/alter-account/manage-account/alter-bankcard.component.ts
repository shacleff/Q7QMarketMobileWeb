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
  //数据是否可以提交
  public isCanSub = false;
  //银行列表
  public bankList = [
    {bankName:'中国工商银行',logo:'../../../../assets/images/bank_type_logo_1.png'},
    {bankName:'中国农业银行',logo:'../../../../assets/images/bank_type_logo_2.png'},
    {bankName:'中国银行',logo:'../../../../assets/images/bank_type_logo_3.png'},
    {bankName:'中国建设银行',logo:'../../../../assets/images/bank_type_logo_4.png'},
    {bankName:'交通银行',logo:'../../../../assets/images/bank_type_logo_5.png'},
    {bankName:'招商银行',logo:'../../../../assets/images/bank_type_logo_6.png'},
    {bankName:'广发银行',logo:'../../../../assets/images/bank_type_logo_7.png'},
    {bankName:'光大银行',logo:'../../../../assets/images/bank_type_logo_8.png'},
    {bankName:'中国邮政储蓄银行',logo:'../../../../assets/images/bank_type_logo_9.png'},
    {bankName:'上海浦东发展银行',logo:'../../../../assets/images/bank_type_logo_10.png'},
    {bankName:'华夏银行',logo:'../../../../assets/images/bank_type_logo_11.png'},
    {bankName:'中国民生银行',logo:'../../../../assets/images/bank_type_logo_12.png'},
    {bankName:'平安银行',logo:'../../../../assets/images/bank_type_logo_13.png'},
    {bankName:'中信银行',logo:'../../../../assets/images/bank_type_logo_14.png'},
    {bankName:'兴业银行',logo:'../../../../assets/images/bank_type_logo_15.png'},
  ];
  selBank(bank:string){
    this.uInfo.bankName = bank;
    this.closeAlertBox();
    this.checkFormDirty();
  }
  public uInfo:any = {
    realName:'',
    cardNo:'',
    bankName:''
  };
  //从后台得到的初始信息 用来对比是否更改了信息
  public oriUInfo:any = {
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

          this.oriUInfo.realName = info.realName;
          this.oriUInfo.cardNo = info.cardNo;
          this.oriUInfo.bankName = info.bankName;
        }
      })
  }
  //验证是否修改了表单
  checkFormDirty(){
    if(this.oriUInfo.realName==this.uInfo.realName&&this.oriUInfo.cardNo==this.uInfo.cardNo&&this.oriUInfo.bankName==this.uInfo.bankName){
      this.isCanSub = false;
    }else{
      this.isCanSub = true;
    }
  }
  //设置提现账户
  setCashAccount(){
    this.checkFormDirty();
    if(!this.isCanSub){
      this.tips.msg('你未进行任何更改');
      return;
    }
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
        this.tips.msg('绑定成功');
        this.isCanSub = false;
        this.getUserInof();
      }else{
        this.isCanSub = false;
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
