import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector:'assign-trade-detail',
  templateUrl:'assign-trade-detail.component.html'
})
export class AssignTradeDetailComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title
  ){}
  public headerTitle = '指定交易详情';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('指定交易详情');
  }
}
