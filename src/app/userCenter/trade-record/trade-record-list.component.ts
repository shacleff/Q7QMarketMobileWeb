import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/Router'
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';
import {TradeRecordService} from "./trade-record.service";

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
  back(arm:any){
    window.history.go(-1);
  }
  isShowDetail = false;//默认不显示详情
  isHasDatas = false;//默认没有数据
  //交易明细详情
  tradeDetail = {

  };
  //交易明细列表
  tradeList = [
    {
      proName:'2',//产品名
      enType:'3',//交易类型0->买
      trPrice:'4',//成交价
      trCnt:'5',//成交量
      trAmt:'6',//成交额
      trCharge:'7',//手续费
      trTime:'8',//成交时间
    }
  ];
  getList(options:any){
    this.trdRcdSer.getList(options)
    .then((res:any)=>{
      if(res){
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
    this.title.setTitle('交易明细');
  }
}
