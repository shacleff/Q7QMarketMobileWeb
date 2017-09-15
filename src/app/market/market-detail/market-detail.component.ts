import {Component,OnInit,OnDestroy} from '@angular/core';
import {TipsService} from "../../service/tips.service";


@Component({
  selector:'market-detail',
  templateUrl:'market-detail.component.html'
})
export class MarketDetailtComponent implements OnInit,OnDestroy{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '银杏木';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.tips.showLayer();
  }
  ngOnDestroy(){
    this.tips.hideLayer()
  }
}
