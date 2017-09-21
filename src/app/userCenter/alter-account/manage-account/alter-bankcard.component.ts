import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";


@Component({
  selector:'alter-bankcard',
  templateUrl:'alter-bankcard.component.html'
})
export class AlterBankcardComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}

  public isShowAlert:boolean = false;

  public headerTitle = '更改提现账户';
  back(arm:any){
    window.history.go(-1);
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
    this.openAlertBox()
  }
}
