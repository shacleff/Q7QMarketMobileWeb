import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector:'assign-trade',
  templateUrl:'assign-trade.component.html'
})
export class AssignTradeComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title
  ){}
  public isShowAlert:boolean = false;
  public isShowDetail:boolean = false;
  public headerTitle = '指定交易';
  back(arm:any){
    window.history.go(-1);
  }
  //关闭详情
  public closeDetailBox(){
    this.tips.hideLayer();
    this.isShowDetail = false;
  }
  //关闭弹出层
  public closeAlertBox(){
    this.tips.hideLayer();
    this.isShowAlert = false;
  }
  //打开弹框
  public openAlertBox(){
    this.tips.showLayer();
    this.isShowAlert = true;
  }
  ngOnInit(){
    this.title.setTitle('指定交易');
    //this.openAlertBox()
    //this.tips.showLayer();
  }
}
