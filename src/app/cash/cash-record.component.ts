import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TipsService} from "../service/tips.service";
import {CashService} from "./cash.service";


@Component({
  selector:'cash-record',
  templateUrl:'cash-record.component.html'
})
export class CashRecordComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private router:Router,
    private cashSer:CashService
  ){}
  //得到提现列表
  private para:any = {
    pageNum: 1
  };
  private showStatus(status:any) {
    if (status == '0') {
      return '待审核';
    } else if (status == '1') {
      return '已审核';
    } else if (status == '2') {
      return '转账中';
    } else if (status == '3') {
      return '已到账';
    } else if (status == '4') {
      return '已撤消';
    } else if (status == '4') {
      return '失败';
    } else {
      return '';
    }
  }
  //详情
  detail:any={
    amt:'',//提现金币数量
    charge:'',//手续费
    withdrawTime:'',//时间
    cardNo:'',//收款账户
    orderNum:'222',//订单号
    status:'',//状态
    statusText:'',//状态文字
  };
  //列表
  list:any = [
    this.detail
  ];
  getCashList(){
    this.cashSer.getCashList(this.para)
    .then((res:any)=>{
      if(res){
        let item = res.records;
        for(let i = 0;i<item.length;i++){
          var temp:any = {};
          temp.amt = temp[i].amt;
          temp.charge = temp[i].charge;
          temp.withdrawTime = temp[i].withdrawTime;
          temp.cardNo = temp[i].cardNo;
          temp.orderNum = '7875';
          temp.status = temp[i].status;
          temp.statusText = this.showStatus(temp[i].status);
          this.list.push(temp);
        }
      }
    });
  }
  //显示详情
  isShowDetail = false;
  showDetail(detail:any){
    this.detail = detail;
    this.isShowDetail = true;
  }
  //关闭详情
  hideDetail(){
    this.isShowDetail = false;
  }
  public headerTitle = '提现记录';
  back(arm:any){
    window.history.go(-1);
  }
  toDetail(id:string){
    this.router.navigate(['cashRecord',id])
  }
  ngOnInit(){

  }
}
