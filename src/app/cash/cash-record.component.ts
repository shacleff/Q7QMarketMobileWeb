import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TipsService} from "../service/tips.service";


@Component({
  selector:'cash-record',
  templateUrl:'cash-record.component.html'
})
export class CashRecordComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private router:Router
  ){}
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
