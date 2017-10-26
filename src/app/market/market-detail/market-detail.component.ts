import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import {Component,ViewChild,AfterViewInit,OnInit,OnDestroy} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Title} from "@angular/platform-browser";
import {UtilService} from "../../service/util.service";
import {EChartOption,ECharts} from 'echarts-ng2'
//import {KDatas} from '../../datas/k-line.datas';
//import {FDatas} from '../../datas/f-line.datas';
import {ChangeChartTypeService} from '../../service/change-chart-type.service'

import {MarketService} from "./market.service";
import {UserInfoService} from "../../service/user-info.service";
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';
import {QuotationService} from "../quotation/quotation.service";

@Component({
  selector:'market-detail',
  templateUrl:'market-detail.component.html'
})
export class MarketDetailtComponent implements OnInit,OnDestroy,AfterViewInit{
  @ViewChild('myEcharts')  echarts: ECharts;//得到图表组件
  constructor(
    private tips:TipsService,
    private mrkSer:MarketService,
    private route:ActivatedRoute,
    private router:Router,
    private uInfoSer:UserInfoService,
    private util:UtilService,
    private title:Title,
    private qotSer:QuotationService//行情服务
  ){}
  //图标的高度
  private chartHeight;
  //刷新数据执行动画参数
  isip = true;
  //定时刷新Interval
  interVal:any = null;
  //默认列表总页数为10
  allPages:any = 10;
  //切换商品后的重新加载
  onLoad(){
    this.changeToKLine();
    this.getProDetail();
    this.getUserItem();
    this.para.pageNum=1;
    this.etuOdrList.splice(0,this.etuOdrList.length);
    this.getEtuList(1);
  }
  public pro_id;
  //得到url参数 商品id值
  getUrlPar(){
    let val:any = this.route.paramMap;
    this.pro_id = val.destination.value.id;
    this.util.marketUrl = this.pro_id;
    return this.pro_id;
  }
  public isShowAlert = false;
  closeAlertBox(){
    this.tips.hideLayer();
    this.isShowAlert = false;
  }
  openAlertBox(){
    this.getProList();
    this.tips.showLayer();
    this.isShowAlert = true;
  }
  //获取商品行情列表
  public proList:any;
  getProList(){
    this.qotSer.getProList()
      .then((res:any)=>{
        if(res){
          this.proList = this.util.objToArray(res);
        }
      })
  };
  //切换商品
  toChange(id:string){
    this.pro_id = id;
    this.util.marketUrl = this.pro_id;
    this.closeAlertBox();
    this.onLoad();
  }
  public Ctype:ChangeChartTypeService = new ChangeChartTypeService();//图标配置
  public chartType:number = 1;//默认图表类型1->k线图
  //k线图模拟数据
  //kRawData = new KDatas().createDb();
  //分时图模拟数据
  //fRawData = new FDatas().createDb();

  //图标配置
  public option:any = null;
  public changeToKLine(){//切换到k线图

    this.mrkSer.getKlineDatas({proId:this.pro_id})
    .then((res:any)=>{
      if(res){
        let kDatas = this.util.splitData(res);
        this.option = this.Ctype.kOption(kDatas.categoryData,kDatas.values);
        this.option.grid[0].height = this.chartHeight;
        this.chartType = 1;
        this.initChart();
      }
    });
  }
  public changeToFLine(){//切换到分时图

    this.mrkSer.getFlineDatas({proId:this.pro_id})
    .then((res:any)=>{
      if(res){
        let fRawData = this.util.buildFLineDatas(res);
        this.option = this.Ctype.fOption(fRawData.date,fRawData.data,this.echarts);
        this.option.grid[0].height = this.chartHeight;
        this.chartType = 2;
        this.initChart();
      }
    });
  }
  //绘制图表
  public initChart(){
    this.echarts.showLoading();
    this.echarts.setOption(this.option,true);
    this.echarts.hideLoading();
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
  //得到当前商品详情
  getProDetail(){
    this.isip = false;
    this.mrkSer.getProDetail({proId:this.pro_id})
    .then((res:any)=>{
      this.isip = true;
      if(res){
        this.headerTitle = res.proInfo.proName+"▼";
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
  numArr = ['一','二','三'];
  buyFive = [
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    //{ price:'--',cnt:'--'},
    //{ price:'--',cnt:'--'},
  ];
  //卖五数据
  saleFive = [
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    { price:'--',cnt:'--'},
    //{ price:'--',cnt:'--'},
    //{ price:'--',cnt:'--'},
  ];
  isShowBuySale = true;//默认显示

  /*限价买入卖出*/
  //限价买入数据
  buyPara:any = {
    price:null,
    cnt:null,
    proId:this.pro_id,
    'type': '0'//委托类型 0:买 1:卖
  };
  buyAllPrice:any = (this.buyPara.price*this.buyPara.cnt).toFixed(5);//买入总计价格
  myGold:any = '';//可用金币
  buyChr:any = (this.buyAllPrice*0.03).toFixed(5);//买入手续费
  //计算买入总价和手续费
  calcBuyPrice(){
    this.buyAllPrice = (this.buyPara.price*this.buyPara.cnt).toFixed(5);
    //if(this.buyAllPrice>this.myGold){
    //
    //}
    this.buyChr = (this.buyAllPrice*0.03).toFixed(5);//买入手续费;
  }
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
    price:null,
    cnt:null,
    proId:this.pro_id,
    'type': '1'//委托类型 0:买 1:卖
  };
  saleAllPrice:any = (this.salePara.price*this.salePara.cnt).toFixed(5);//卖出总计价格
  myWood:any = '';
  saleChr:any = (this.saleAllPrice*0.05).toFixed(5);//买入手续费
  //计算卖出总价和手续费
  calcSalePrice(){
    let cnt = this.salePara.cnt>this.myWood?this.myWood:this.salePara.cnt;
    console.log(cnt,this.salePara.cnt,this.myWood);
    if(cnt>this.myWood){
      cnt=this.myWood;
    }
    this.salePara.cnt = cnt;
    this.saleAllPrice = (this.salePara.price*this.salePara.cnt).toFixed(5);
    //console.log(price);
    this.saleChr = (this.saleAllPrice*0.03).toFixed(5);//买入手续费;
  }
  //得到玩家木材数量
  getUserItem(){
    this.mrkSer.getUserItem({proId:this.pro_id})
    .then((res:any)=>{
      if(res){
        this.myWood = res.cnt|0;
      }
    })
  }
  //买入卖出
  /**
  * @type type->0买入 1卖出
  * */
  buySale(type:string){
    //限价买入
    if(type=='0'){
      if(!this.buyPara.price){
        this.tips.msg('请填写价格');
        return;
      }else if(!this.buyPara.cnt){
        this.tips.msg('请填写数量');
        return;
      }else if(parseFloat(this.buyAllPrice)>parseFloat(this.myGold)){
        this.tips.msg('可用金额不足！');
        return;
      }
      this.tips.showConDia('确认委托此订单吗？</br>价格:'+this.buyPara.price+'</br>数量:'+this.buyPara.cnt+'</br>金币：'+this.buyAllPrice,()=>{
        this.buyPara.proId = this.pro_id;
        this.mrkSer.buySale(this.buyPara)
          .then((res:any)=>{
            if(res){
              this.tips.msg('委托成功');
              this.getEtuList(1);
              this.showBuyBox(!1);
              this.showSaleBox(!1);
            }
          });
      },()=>{

      });
      //限价卖出
    }else if(type=='1'){
      if(!this.salePara.price){
        this.tips.msg('请填写价格');
        return;
      }else if(!this.salePara.cnt){
        this.tips.msg('请填写数量');
        return;
      }
      this.tips.showConDia('确认委托此订单吗？</br>价格:'+this.salePara.price+'</br>数量:'+this.salePara.cnt+'</br>金币:'+this.saleAllPrice,()=>{
        this.salePara.proId = this.pro_id;
        this.mrkSer.buySale(this.salePara)
          .then((res:any)=>{
            if(res){
              this.tips.msg('委托成功');
              this.getEtuList(1);
              this.showBuyBox(!1);
              this.showSaleBox(!1);
            }
          })
      },()=>{

      });
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
  //清空输入框数据->初始化购买卖出框数据
  clearInput(){
    this.buyPara.price = '';
    this.buyPara.cnt = '';
    this.buyAllPrice = '';
    this.buyChr = '';
    this.salePara.price = '';
    this.salePara.cnt = '';
    this.saleAllPrice = '';
    this.saleChr = '';
    this.getUserItem();
    this.getUserMoney();
  }
  //打开关闭限价买入
  showBuyBox(bool){
    //this.tips.showConDia('确认购买吃上牌吗?',()=>{},()=>{})
    if(bool){
      this.clearInput();
      this.buyPara.price = this.buyPara.price||this.proDetail.nowPrice;
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
      this.clearInput();
      this.salePara.price = this.salePara.price||this.proDetail.nowPrice;
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
    'proId': this.pro_id,
    'pageNum': 1,
    'type': 'CUR'
  };
  isHasOdrList = false;//默认没有委托订单、
  isLoaded = false;//是否加载完毕
  //委托订单列表
  etuOdrList = [
    //{
    //  proName:'1',//商品名
    //  enType:'1',//买卖类型 0是买
    //  enPrice:'1',//价格
    //  trCnt:'1',//委托量
    //  enCnt:'1',//成交量
    //  id:'1',//id
    //  trStatus:'1'//订单状态1 未成交  其它已成交
    //}
  ];
  onLoadMore(comp:InfiniteLoaderComponent) {
    this.para.pageNum++;
    if(this.para.pageNum>this.allPages+1){
      comp.resolveLoading();
      return;
    }
    this.getEtuList();
    comp.resolveLoading();
  }
  //得到当前委托订单列表
  getEtuList(pageNum?){
    this.para.proId = this.pro_id;
    //console.log(this.pro_id,'-----------------------');
    if(pageNum){
      this.etuOdrList.splice(0,this.etuOdrList.length);
      this.para.pageNum = 1;
    }
    //for(var i = 0;i<10;i++){
    //  this.etuOdrList.push(this.etuOdrList[0]);
    //}
    this.mrkSer.getEtuList(this.para)
    .then((res:any)=>{
      if(res){
        this.allPages = res.pages;
        if(res.records.length>0){
          this.isHasOdrList = true;
        }
        let records = res.records;
        if(records.length<=0){
          this.isLoaded = true;
        }
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
    this.tips.showConDia('确定撤销此委托订单吗?',()=>{
      this.mrkSer.cancelCurOrder({'orderId':id})
        .then((res:any)=>{
          if(res){
            this.tips.msg('撤销成功');
            this.getEtuList(1);
          }
        })
    },()=>{});
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
  back(){
    window.history.go(-1);
  }
  //定时刷新数据
  freshDatas(){
    this.interVal = setInterval(()=>{
      this.getProDetail();
      if(this.chartType==1){
        // this.changeToKLine();//不定时更新图标
      }else{
        // this.changeToFLine();//不定时更新图标
      }
    },10*1000)
  }
  ngOnInit(){
    this.getUrlPar();
    this.getProDetail();
    this.getEtuList();
    this.getUserMoney();
    this.getUserItem();
    this.title.setTitle('市场');
    this.freshDatas();
  }
  ngOnDestroy(){
    this.showOdrBox(false);
    this.showOdrBox(false);
    this.showSaleBox(false);
    clearInterval(this.interVal);
  }
  //设置图表容器高度
  setChartHeight(){
    let winH = $(window).height();
    let baseH = $(".marketBaseInfo").height();
    let headH = $(".header").height();
    let open3H = $(".dgtTableWrap").height();
    let chartTH = $(".chartChange").height();
    let oprBtnWrapH = $(".oprBtnWrap").height();
    let footerH = $(".footer").height();
    let cH = winH-(baseH+headH+open3H+chartTH+oprBtnWrapH+footerH)-60;
    this.chartHeight = cH;
    $(".chart").height(cH);
  }
  ngAfterViewInit(){
    this.setChartHeight();
    this.changeToKLine();
  }
}
