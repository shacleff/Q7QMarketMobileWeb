import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';
import {TradeRecordService} from "./trade-record.service";
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';
@Component({
  selector:'trade-record-list',
  templateUrl:'trade-record-list.component.html'
})
export class TradeRecordListComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title,
    private router:Router,
    private trdRcdSer:TradeRecordService
  ){}
  public headerTitle = '交易明细';
  back(){
    window.history.go(-1);
  }
  isShowDetail = false;//默认不显示详情
  isHasDatas = false;//默认没有数据
  allPages = 10;
  //交易明细详情
  tradeDetail = {

  };
  //查询参数
  para = {
    pageNum: 1,
    proId: null,
    type: null,
    startDate: null,
    endDate: null
  };
  //交易明细列表
  tradeList = [
    // {
    //   proName:'2',//产品名
    //   enType:'3',//交易类型0->买
    //   trPrice:'4',//成交价
    //   trCnt:'5',//成交量
    //   trAmt:'6',//成交额
    //   trCharge:'7',//手续费
    //   trTime:'8',//成交时间
    // }
  ];
  getList(options:any){
    this.trdRcdSer.getList(options)
    .then((res:any)=>{
      if(res){
        this.allPages = res.pages;
        if(res.record.length>0){
          this.isHasOdrList = true;
        }
        if(res.record.length<=0){
          this.isLoaded = true;
        }

        let item = res.record;
        if(item.length){
          this.isHasDatas = true;
        }
        for(let i = 0;i<item.length;i++){
          var temp:any = {};
          temp.proName = item.proName;
          temp.enType = item.enType;
          temp.trPrice = item.trPrice.toFixed(5);
          temp.trCnt = item.trCnt;
          temp.trAmt = item.trAmt;
          temp.trCharge = item.trCharge;
          temp.trTime = item.trTime;
          this.tradeList.push(temp);
        }
      }
    })
  };
  isHasOdrList = false;//默认没有委托订单、
  isLoaded = false;//是否加载完毕
  onLoadMore(comp:InfiniteLoaderComponent) {
    this.para.pageNum++;
    if(this.para.pageNum>this.allPages+1){
      comp.resolveLoading();
      return;
    }
    this.getList(this.para);
    comp.resolveLoading();
  }
  //显示详情
  toDetail(tradeDetail){
    this.tradeDetail = tradeDetail;
    this.isShowDetail = true;
  }
  //关闭详情
  hideDetail(){
    this.isShowDetail = false;
  }
  ngOnInit(){
    this.getList(this.para);
    this.title.setTitle('交易明细');
  }
}
