import 'rxjs/add/operator/switchMap';
import {Component,OnInit,EventEmitter,Output,Input} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {TipsService} from "../../service/tips.service";
import {RechargeService} from "./recharge.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector:'recharge-record-detail',
  templateUrl:'recharge-record-detail.component.html'
})
export class RechargeRecordDetailComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private route:ActivatedRoute,
    private router:Router,
    private service:RechargeService,
    private title:Title
  ){}

  @Input() listDetail:any;
  @Output() onClose = new EventEmitter<any>();

  public headerTitle = '充值记录详情';
  close(){
    this.onClose.emit();
  }

  back(){
    window.history.go(-1);
  }

  //public recordDetail:any;
  ngOnInit(){
    this.title.setTitle('充值记录详情');
    //this.route.paramMap
    //.switchMap((params:ParamMap)=>
    //  this.service.getDetail(params.get('id'))
    //).subscribe((detail:any)=>{
    //  this.recordDetail=detail;
    //})
  }
}
