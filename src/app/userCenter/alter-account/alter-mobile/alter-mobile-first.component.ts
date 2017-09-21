import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";


@Component({
  selector:'alter-mobile-first',
  templateUrl:'alter-mobile-first.component.html'
})
export class AlterMobileFirstComponent implements OnInit{
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
