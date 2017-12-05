import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TipsService} from "../../service/tips.service";
import {RechargeService} from "./recharge.service";
import {Title} from "@angular/platform-browser";
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';


@Component({
  selector:'recharge-record',
  templateUrl:'recharge-record.component.html'
})
export class RechargeRecordComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private router:Router,
    private rchSer:RechargeService,
    private title:Title
  ){}
  public headerTitle = '充值记录';
  back(){
    window.history.go(-1);
  }
  isHasList = false;//默认没有列表、
  isLoaded = false;//是否加载完毕
  isShowDetail = false;//是否显示详情
  //单个充值详情
  listDetail = {
    rchType:"1",//充值类型 1微信 2支付宝 3银联
    rchNum:"2000",//充值金额
    status:"1",//状态 1成功
    proDesc:"游戏道具充值",//商品说明
    time:"2017-9-11 16:43:12",//时间
    orderNum:"2017025861515",//订单号
  };
  para = {
    pageNum:1,
  };
  onLoadMore(comp:InfiniteLoaderComponent) {
    this.para.pageNum++;
    //this.getList();
    comp.resolveLoading();
  }
  //得到充值记录
  //getList(){
  //  this.rchSer.getRchList(this.para)
  //  .then((res:any)=>{
  //    if(res){
  //
  //    }
  //  })
  //}
  //toDetail(id:string){
  //  this.router.navigate(['rechargeRecord',id])
  //}
  toDetail(listDetail){
    this.title.setTitle("充值记录详情");
    this.isShowDetail = true;
    this.listDetail = listDetail;
  }
  toList(){
    this.title.setTitle("充值记录");
    this.isShowDetail = false;
  }
  ngOnInit(){
    this.title.setTitle("充值记录");
    //this.getList();
  }
}
