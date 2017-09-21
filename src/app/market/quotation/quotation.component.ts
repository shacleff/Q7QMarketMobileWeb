import {Component,ViewChild,OnInit,AfterViewInit} from '@angular/core';
import {EChartOption,ECharts} from 'echarts-ng2'

import {Router} from '@angular/router'

import {KDatas} from '../../datas/k-line.datas';
import {FDatas} from '../../datas/f-line.datas';
import {ChangeChartTypeService} from '../../service/change-chart-type.service'
import {TipsService} from "../../service/tips.service";
import {UtilService} from "../../service/util.service";
import {QuotationService} from "./quotation.service";

@Component({
  selector:'quotation',
  templateUrl:'./quotation.component.html'
})

export class QuotationComponent implements OnInit,AfterViewInit{
  @ViewChild('myEcharts')  echarts: ECharts;//得到图表组件
  constructor(
    private tips:TipsService,
    private util:UtilService,
    private qotSer:QuotationService,
    private router:Router
  ){};


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
  //去商品详情（市场）
  toDetail(id:string){
    this.router.navigate(['market',id]);
  }

  public Ctype:ChangeChartTypeService = new ChangeChartTypeService();//图标配置
  public chartType:number = 1;//默认图表类型1->k线图
  //k线图模拟数据
  kRawData = new KDatas().createDb();
  //分时图模拟数据
  fRawData = new FDatas().createDb();

  //图标配置
  public option:any = null;
  public changeToKLine(){//切换到k线图
    this.option = this.Ctype.kOption(this.kRawData.dates,this.kRawData.data);
    this.chartType = 1;
    this.initChart();
  }

  public changeToFLine(){//切换到分时图
    this.option = this.Ctype.fOption(this.fRawData.date,this.fRawData.data,this.echarts);
    this.chartType = 2;
    this.initChart();
  }
  //绘制图表
  public initChart(){
    this.echarts.showLoading();
    this.echarts.setOption(this.option,true);
    this.echarts.hideLoading();
  }

  ngOnInit(){
    this.getProList()
  }
  ngAfterViewInit(){
    this.changeToKLine();
  }
}
