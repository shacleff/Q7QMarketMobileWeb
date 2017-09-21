import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector:'assign-trade-resolve',
  templateUrl:'assign-trade-resolve.component.html'
})
export class AssignTradeResolveComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title
  ){}
  public headerTitle = '指定交易订单处理';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('指定交易订单处理');
  }
}
