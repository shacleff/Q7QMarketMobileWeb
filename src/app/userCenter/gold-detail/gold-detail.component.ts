import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';
import {CashService} from "../../cash/cash.service";
import {UserInfoService} from "../../service/user-info.service";
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';

@Component({
  selector:'gold-detail',
  templateUrl:'gold-detail.component.html'
})
export class GoldDetailComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title,
    private ser:CashService,
    private uInfoSer:UserInfoService
  ){}
  //得到用户信息-金币汇总数据
  public goldInfo:any = {

  };
  getUserInfo(){
    this.uInfoSer.getUserInfo()
    .then((res:any)=>{
      if(res){
        let info =  res.userInfo;
        this.goldInfo.totalRecharge = info.totalRecharge||0;
        this.goldInfo.totalWithdraw = info.totalWithdraw||0;
        this.goldInfo.totalBonus = info.totalBonus||0;
      }
    })
  }
  //查询参数
  para = {
    "endDate": null,
    "pageNum": 1,
    "startDate": null,
    "type": null
  };
  list = [
    //{
    //  tranType:'',//类型
    //  tranAmt:'',//金额
    //  tranTime:'',//时间
    //}
  ];
  isHasOdrList = false;//默认没有委托订单、
  isLoaded = false;//是否加载完毕
  onLoadMore(comp:InfiniteLoaderComponent) {
    this.para.pageNum++;
    this.getGoldDetail();
    comp.resolveLoading();
  }
  //得到金币明细
  getGoldDetail(){
    this.ser.getGoldDetial(this.para)
    .then((res:any)=>{
      if(res){
        if(res.record.length>0){
          this.isHasOdrList = true;
        }
        if(res.record.length<=0){
          this.isLoaded = true;
        }
        let item = res.record;
        for(let i = 0;i<item.length;i++){
          let temp:any = {};
          temp.tranType = this.showTyep(item[i].tranType);
          temp.tranAmt = item[i].tranAmt;
          temp.tranTime = item[i].tranTime;
          this.list.push(temp);
        }
      }
    })
  }
  private showTyep(type:any) {
    if (type == '1') {
      return '充值';
    } else if (type == '2') {
      return '提现';
    } else if (type == '3') {
      return '购买';
    } else if (type == '4') {
      return '出售';
    } else if (type == '5') {
      return '推广奖励(注册)';
    } else if (type == '6') {
      return '推广奖励(首充)';
    } else if (type == '7') {
      return '推广奖励(交易)';
    } else if (type == '8') {
      return '推广奖励(消费)';
    } else if (type == '9') {
      return '系统奖励';
    } else if (type == '10') {
      return '活动奖励';
    } else if (type == '11') {
      return '消费';
    } else if (type == '12') {
      return '退费';
    } else if (type == '13') {
      return '指定购买';
    } else if (type == '14') {
      return '指定出售';
    }
  }
  public headerTitle = '金币明细';
  back(){
    window.history.go(-1);
  }
  ngOnInit(){
    this.getUserInfo();
    this.getGoldDetail();
    this.title.setTitle('金币明细')
  }
}
