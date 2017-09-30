import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';
import {EntrustOrderService} from "./entrust-order.service";
import {UtilService} from "../../service/util.service";
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';

@Component({
  selector:'entrust-order',
  templateUrl:'entrust-order.component.html'
})
export class EntrustOrderComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title,
    private router:Router,
    private etuOdrSer:EntrustOrderService,
    private util:UtilService
  ){}
  public headerTitle = '委托订单';
  back(){
    window.history.go(-1);
  }
  toList(){
    this.isShowDetail = false;
  }
  //查询订单参数
  private para:any = {
    "endDate":null,
    "pageNum": 1,
    "proId": null,
    "startDate": null,
    "type": null
  };
  isHasOdrList = false;//默认没有委托订单、
  isLoaded = false;//是否加载完毕
  //订单列表
  isHasList = false;
  isShowDetail = false;//是否显示详情
  //当前选中订单详情
  public orderDetail = {
    proName:'银杏木',//商品名
    enType:'0',//交易类型 0->买
    enTime:'1505985683000',//交易时间
    enCnt:'100',//委托量
    trCnt:'50',//交易量
    trStatus:'进行中',//交易状态 3->已结束
    enPrice:'12.0214',//委托价格
  };
  orderList:any = [
    // {
    //   proName:'梧桐木',//商品名
    //   enType:'0',//交易类型 0->买
    //   enTime:'1505985683000',//交易时间
    //   enCnt:'100',//委托量
    //   trCnt:'50',//交易量
    //   trStatus:'进行中',//交易状态 3->已结束
    //   enPrice:'12.0214',//委托价格
    // }
  ];
  onLoadMore(comp:InfiniteLoaderComponent) {
    this.para.pageNum++;
    this.getEtuList(this.para);
    comp.resolveLoading();
  }
  //得到委托订单列表
  getEtuList(options:any){
    this.etuOdrSer.getEtuList(options)
    .then((res:any)=>{
      if(res){
        if(res.records.length>0){
          this.isHasOdrList = true;
        }
        if(res.records.length<=0){
          this.isLoaded = true;
        }
        var items = res.records;
        if(items.length>0){this.isHasList = true};
        for(let i = 0;i<items.length;i++){
          let temp:any = {};
          temp.proName = items.proName;
          temp.enType = items.enType;
          temp.enTime = items.enTime;
          temp.enCnt = items.enCnt;
          temp.trCnt = items.trCnt;
          temp.trStatus = this.util.toSts(items.trStatus);
          temp.enPrice = items.enPrice.toFixed(5);
          this.orderList.push(temp);
        }
      }
    })
  }
  //查看详情
  toDetail(orderDetail){
    this.isShowDetail = true;
    this.orderDetail = orderDetail;
  }

  ngOnInit(){
    this.getEtuList(this.para);
    this.title.setTitle('委托订单');
  }
}
