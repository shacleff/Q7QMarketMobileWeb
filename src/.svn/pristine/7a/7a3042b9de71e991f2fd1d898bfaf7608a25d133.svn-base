import {Component,OnInit,OnDestroy,} from '@angular/core';
//import {EChartOption,ECharts} from 'echarts-ng2'

import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
//import {KDatas} from '../../datas/k-line.datas';
//import {FDatas} from '../../datas/f-line.datas';
//import {ChangeChartTypeService} from '../../service/change-chart-type.service'
import {TipsService} from "../../service/tips.service";
import {UtilService} from "../../service/util.service";
import {QuotationService} from "./quotation.service";
//import {MarketService} from "../market-detail/market.service";

@Component({
  selector:'quotation',
  templateUrl:'./quotation.component.html',
  styles: ['.alertLoading .loading { display: none !important; }']
})

export class QuotationComponent implements OnInit,OnDestroy{
  //@ViewChild('myEcharts')  echarts: ECharts;//得到图表组件
  constructor(
    private tips:TipsService,
    private util:UtilService,
    private qotSer:QuotationService,
    private router:Router,
    private title:Title
    //private mrkSer:MarketService
  ){};
  //获取商品行情列表
  public proList:any;
  interVal;
  getProList(){
    this.qotSer.getProList()
    .then((res:any)=>{
      if(res){
        this.proList = this.util.objToArray(res);
      }
    })
  };
  //定时刷新行情
  freshQoutation(){
    this.interVal = setInterval(()=>{
      this.getProList();
    },10*1000)
  }
  //去商品详情（市场）
  toDetail(id:string){
    this.router.navigate(['market',id]);
  }
  //底部切换去市场
  toMarket(){
    this.router.navigate(['market',this.util.marketUrl]);
  }
  //public Ctype:ChangeChartTypeService = new ChangeChartTypeService();//图标配置
  //public chartType:number = 1;//默认图表类型1->k线图
  //k线图模拟数据
  //kRawData = new KDatas().createDb();
  //分时图模拟数据
  //fRawData = new FDatas().createDb();

  //图标配置
  //public option:any = null;
  /*public changeToKLine(){//切换到k线图
    this.mrkSer.getKlineDatas({proId:'1001'})
      .then((res:any)=>{
        if(res){
          let kDatas = this.util.splitData(res);
          this.option = this.Ctype.kOption(kDatas.categoryData,kDatas.values);
          this.chartType = 1;
          this.initChart();
        }
      });
  }*/

  /*public changeToFLine(){//切换到分时图
    this.mrkSer.getFlineDatas({proId:'1001'})
      .then((res:any)=>{
        if(res){
          let fRawData = this.util.buildFLineDatas(res);
          this.option = this.Ctype.fOption(fRawData.date,fRawData.data,this.echarts);
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
  }*/

  ngOnInit(){
    this.title.setTitle('行情');
    this.getProList();
    this.freshQoutation();
  }
  ngOnDestroy(){
    clearInterval(this.interVal);
  }
}
