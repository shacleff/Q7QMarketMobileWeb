import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';
import {AssignTradeService} from "./assign-trade.service";
import {UtilService} from "../../service/util.service";
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';

@Component({
  selector:'assign-trade-order',
  templateUrl:'assign-trade-order.component.html'
})
export class AssignTradeOrderComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title,
    private asgTrdSer:AssignTradeService,
    private util:UtilService
  ){}
  hasunResolve = true;//是否有未处理订单
  showAllOrder = true;//默认显示全部订单
  showHisDetail  = false;//历史订单详情
  showUresDetail  = false;//待处理详情
  allPages = 10;//全部订单默认总页数
  unResPages = 10;//待处理订单默认总页数
  showList = true;//显示列表
  detail:any = {
    proName:'1',//名称
    cnt:'25',//数量
    suName:'5',//卖方
    tuName:'5',//买方
    charge:'5',//手续费
    amt:'5',//索取金币
    createTime:'5',//交易时间
    status:'0',//状态 0->待处理
    statusText:'5',//状态文字
    id:'5',//id
  };
  //所有订单列表
  allList:any = [
    //this.detail
  ];
  //待处理订单列表
  uresList:any = [
    //this.detail
  ];
  //指定交易查询参数
  /*
  * 查询类型(1:历史 0:未完成 -1:全部)
  * */
  private allPageNum = 1;
  private unresPageNum = 1;
  para = {
    'pageNum': 1,
    'type': '-1'
  };

  isHasOdrList = false;//默认没有所有订单、
  isLoaded = false;//是否加载完毕

  isHasOdrListRes = false;//默认没有未处理订单、
  isLoadedRes = false;//是否加载完毕

  onLoadMore(comp:InfiniteLoaderComponent) {
    this.allPageNum++;
    if(this.showAllOrder&&this.allPageNum>this.allPages+1){
      comp.resolveLoading();
      return;
    }
    this.getList('-1');
    comp.resolveLoading();
  }

  onLoadMoreRes(comp:InfiniteLoaderComponent) {
    this.unresPageNum++;
    if(!this.showAllOrder&&this.unresPageNum>this.unResPages+1){
      comp.resolveLoading();
      return;
    }
    this.getList('0');
    comp.resolveLoading();
  }

  //得到指定交易订单列表'-1'->全部 0->待处理 resolveOrder->在子组件处理完订单
  getList(type:any,resolveOrder?){
    if(resolveOrder){
      this.allPageNum = 1;
      this.unresPageNum = 1;
      this.allList.splice(0,this.allList.length);
      this.uresList.splice(0,this.uresList.length);
    }
    //得到全部订单
    if(type=='-1'){
      this.para.pageNum = this.allPageNum;
      this.para.type = '-1';
      this.asgTrdSer.getList(this.para)
      .then((res:any)=>{
        if(res){
          this.allPages = res.pages;
          if(res.records.length>0){
            this.isHasOdrList = true;
          }
          if(res.records.length<=0){
            this.isLoaded = true;
          }
          let item = res.records;
          for(let i = 0;i<item.length;i++){
            let temp:any = {};
            temp.proName = item[i].proName;
            temp.cnt = item[i].cnt;
            temp.suName = item[i].suName;
            temp.tuName = item[i].tuName;
            temp.charge = item[i].charge;
            temp.amt = item[i].amt;
            temp.createTime = item[i].createTime;
            temp.status = item[i].status;
            temp.statusText = this.util.showStatus(item[i].status);
            temp.id = item[i].id;
            this.allList.push(temp);
          }
        }
      });
    }
    //得到未处理订单
    if(type=='0'){
      this.para.pageNum = this.unresPageNum;
      this.para.type = '0';
      this.asgTrdSer.getList(this.para)
        .then((res:any)=>{
          this.unResPages = res.pages;
          if(res){
            if(res.records.length>0){
              this.isHasOdrListRes = true;
            }
            if(res.records.length<=0){
              this.isLoadedRes = true;
            }
            let item = res.records;
            for(let i = 0;i<item.length;i++){
              let temp:any = {};
              temp.proName = item[i].proName;
              temp.cnt = item[i].cnt;
              temp.suName = item[i].suName;
              temp.tuName = item[i].tuName;
              temp.charge = item[i].charge;
              temp.amt = item[i].amt;
              temp.createTime = item[i].createTime;
              temp.status = item[i].status;
              temp.statusText = this.util.showStatus(item[i].status);
              temp.id = item[i].id;
              this.uresList.push(temp);
            }
          }
        });
    }
  }
  //订单处理完刷新订单列表
  public resolved(){
    this.getList(-1,1);
    this.getList(0,1);
  };
  //显示详情
  showDetail(item:any){
    this.showList = false;
    this.detail = item;
    if(this.detail.status=='0'){//待处理订单
      this.showUresDetail = true;
    }else{//全部订单
      this.showHisDetail = true;
    }
  }
  closeDetail(){//关闭详情
    this.showList = true;
    this.showHisDetail = false;
    this.showUresDetail = false;
  }
  //切换显示订单类型
  changeOrder(bool){
    this.showList = true;
    if(bool){
      this.showAllOrder = true;
    }else{
      this.showAllOrder = false;
    }
  }

  public headerTitle = '赠送详情';
  back(){
    window.history.go(-1);
  }
  ngOnInit(){
    this.getList(-1);
    this.getList(0);
    this.title.setTitle('赠送详情');
  }
}
