import 'rxjs/add/operator/switchMap';
import {Component,OnInit,OnDestroy} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MarketService} from "./market.service";
import {UserInfoService} from "../../service/user-info.service";

@Component({
  selector:'market-detail',
  templateUrl:'market-detail.component.html'
})
export class MarketDetailtComponent implements OnInit,OnDestroy{
  constructor(
    private tips:TipsService,
    private mrkSer:MarketService,
    private route:ActivatedRoute,
    private router:Router,
    private uInfoSer:UserInfoService
  ){}

  //得到url参数 商品id值
  getUrlPar(){
    let val:any = this.route.paramMap;
    return val.destination.value.id;
  }
  //商品详情信息
  public proDetail:any = {
    nowPrice:'',//现在价格
    changePrice:'',//涨额
    changeRate:'',//涨幅
    toOpenPrice:'',//今开
    tranVolume:'',//成交
    heightPrice:'',//最高
    lowPrice:'',//最低
  };
  //得到当前商品相亲
  getProDetail(){
    this.mrkSer.getProDetail({proId:this.getUrlPar()})
    .then((res:any)=>{
      if(res){
        this.headerTitle = res.proInfo.proName;
        this.proDetail.nowPrice = res.quotationInfo.nowPrice.toFixed(5);
        this.proDetail.changePrice = res.quotationInfo.changePrice.toFixed(5);
        this.proDetail.changeRate = res.quotationInfo.changeRate.toFixed(2)+'%';
        this.proDetail.toOpenPrice = res.quotationInfo.toOpenPrice.toFixed(5);
        this.proDetail.tranVolume = res.quotationInfo.tranVolume.toFixed(5);
        this.proDetail.heightPrice = res.quotationInfo.heightPrice.toFixed(5);
        this.proDetail.lowPrice = res.quotationInfo.lowPrice.toFixed(5);
        this.initBuySaleFive(res.eMap);
      }
    });
  }
  /*买五卖五*/
  //买五数据
  numArr = ['一','二','三','四','五'];
  buyFive = [
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
  ];
  //卖五数据
  saleFive = [
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
  ];
  isShowBuySale = true;//默认显示

  /*限价买入卖出*/
  //限价买入数据
  buyPara:any = {
    price:'',
    cnt:'',
    proId:'',
    'type': '0'//委托类型 0:买 1:卖
  };
  buyAllPrice:any = (this.buyPara.price*this.buyPara.cnt).toFixed(5);//买入总计价格
  myGold:any = '';//可用金币
  buyChr:any = (this.buyAllPrice*0.03).toFixed(5);//买入手续费

  //获取玩家信息（给玩家可用金币赋值）
  getUserMoney(){
    this.mrkSer.getUserMoney()
    .then((res:any)=>{
      if(res){
        this.myGold = (res.usableBalance).toFixed(5);
      }
    })
  }

  //现价卖出数据
  salePara:any = {
    price:'',
    cnt:'',
    proId:'',
    'type': '1'//委托类型 0:买 1:卖
  };
  saleAllPrice:any = (this.salePara.price*this.salePara.cnt).toFixed(5);//卖出总计价格
  myWood:any = '';
  saleChr:any = (this.saleAllPrice*0.05).toFixed(5);//买入手续费
  //买入卖出
  /**
  * @type type->0买入 1卖出
  * */
  buySale(type:string){
    if(type=='0'){
      this.mrkSer.buySale(this.buyPara)
      .then((res:any)=>{
        if(res){

        }
      });
    }else if(type=='1'){
      this.mrkSer.buySale(this.salePara)
      .then((res:any)=>{
        if(res){

        }
      })
    }
  }

  //打开关闭买五卖五
  showBuySaleBox(){
    this.isShowBuySale = !this.isShowBuySale;
  }
  //初始化买五卖五
  initBuySaleFive(eMap:any){
    if(!eMap) return;
    //卖五
    if(eMap['sell0']){
      this.salePara.price = (eMap['sell0'].price).toFixed(5)||0;
    }
    for(let i = 0;i<5;i++){
      let item:any = eMap['sell' + i];
      if(item){
        let price:any = item.price == null ? '--' : item.price;
        this.saleFive[i].price = price.toFixed(5);
        let cnt:any = item.cnt == null ? '--' : item.cnt;
        this.saleFive[i].cnt = cnt;
      }
    }
    //买五
    if(eMap['buy0']){
      this.buyPara.price = (eMap['buy0'].price).toFixed(5)||0;
    }
    for(let i = 0;i<5;i++){
      let item:any = eMap['buy' + i];
      if(item){
        let price:any = item.price == null ? '--' : item.price;
        this.buyFive[i].price = price.toFixed(5);
        let cnt:any = item.cnt == null ? '--' : item.cnt;
        this.buyFive[i].cnt = cnt;
      }
    }
  }
  /*限价买入卖出*/
  isShowBuyBox = false;
  isShowSaleBox = false;
  //打开关闭限价买入
  showBuyBox(bool){
    if(bool){
      this.tips.showLayer();
      this.isShowBuyBox = true;
    }else{
      this.tips.hideLayer();
      this.isShowBuyBox = false;
    }
  }
  //打开关闭限价卖出
  showSaleBox(bool){
    if(bool){
      this.tips.showLayer();
      this.isShowSaleBox = true;
    }else{
      this.tips.hideLayer();
      this.isShowSaleBox = false;
    }
  }

  /*委托订单*/
  //委托订单查询参数
  private para = {
    'proId': this.getUrlPar(),
    'pageNum': 1,
    'type': 'CUR'
  };
  isHasOdrList = false;//默认没有委托订单、
  //委托订单列表
  etuOdrList = [
    //{
    //  proName:'',//商品名
    //  enType:'',//买卖类型 0是买
    //  enPrice:'',//价格
    //  trCnt:'',//委托量
    //  enCnt:'',//成交量
    //  id:'',//id
    //  trStatus:''//订单状态1 未成交  其它已成交
    //}
  ];
  //得到当前委托订单列表
  getEtuList(options){
    this.mrkSer.getEtuList(options)
    .then((res:any)=>{
      if(res){
        if(res.records.length>0){
          this.isHasOdrList = true;
        }
        let records = res.records;
        for(let i = 0;i<records.length;i++){
          let item:any = records[i];
          let temp:any = {};
          temp.proName = item.proName;
          temp.enType = item.enType;
          temp.enPrice = item.enPrice;
          temp.trCnt = item.trCnt;
          temp.enCnt = item.enCnt;
          temp.id = item.id;
          temp.trStatus = item.trStatus;
          this.etuOdrList.push(temp);
        }
      }
    });
  }
  //撤销订单
  cancelEtuOrder(id:string){

  }
  isShowOdrBox = false;//隐藏委托订单
  showOdrBox(bool){//关闭显示委托订单
    if(bool){
      this.tips.showLayer();
      this.isShowOdrBox = true;
    }else{
      this.tips.hideLayer();
      this.isShowOdrBox = false;
    }

  }

  public headerTitle = '';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.getProDetail();
    this.getEtuList(this.para);
    this.getUserMoney();
    //this.tips.showLayer();
  }
  ngOnDestroy(){
    //this.tips.hideLayer()
  }
}
