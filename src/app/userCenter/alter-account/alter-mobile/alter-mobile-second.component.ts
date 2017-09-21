import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";


@Component({
  selector:'alter-mobile-second',
  templateUrl:'alter-mobile-second.component.html'
})
export class AlterMobileSecondComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '修改手机号码';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
