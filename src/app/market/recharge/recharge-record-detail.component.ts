import 'rxjs/add/operator/switchMap';
import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {TipsService} from "../../service/tips.service";
import {RechargeService} from "./recharge.service";


@Component({
  selector:'recharge-record-detail',
  templateUrl:'recharge-record-detail.component.html'
})
export class RechargeRecordDetailComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private route:ActivatedRoute,
    private router:Router,
    private service:RechargeService
  ){}
  public headerTitle = '充值记录详情';
  back(){
    window.history.go(-1);
  }
  public recordDetail:any;
  ngOnInit(){
    //this.route.paramMap
    //.switchMap((params:ParamMap)=>
    //  this.service.getDetail(params.get('id'))
    //).subscribe((detail:any)=>{
    //  this.recordDetail=detail;
    //})
  }
}
