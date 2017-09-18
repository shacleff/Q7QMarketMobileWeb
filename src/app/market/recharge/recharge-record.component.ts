import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TipsService} from "../../service/tips.service";


@Component({
  selector:'recharge-record',
  templateUrl:'recharge-record.component.html'
})
export class RechargeRecordComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private router:Router
  ){}
  public headerTitle = '充值记录';
  back(arm:any){
    window.history.go(-1);
  }
  toDetail(id:string){
    this.router.navigate(['rechargeRecord',id])
  }
  ngOnInit(){

  }
}
