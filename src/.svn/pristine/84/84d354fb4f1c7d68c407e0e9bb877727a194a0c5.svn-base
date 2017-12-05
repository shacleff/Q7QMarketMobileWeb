import {Component,OnInit,Input,EventEmitter,Output} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector:'trade-record-detail',
  templateUrl:'trade-record-detail.component.html',
  styles:[`
    html{
      display:none;
      overflow:hidden;
      background:red;
    }
  `]
})
export class TradeRecordDetailComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title
  ){}
  public topTitle = '交易明细详情';
  @Input() item:any;
  @Output() onHide = new EventEmitter<any>();
  hide(){
    this.onHide.emit();
  }

  ngOnInit(){
    this.title.setTitle('交易明细');
  }
}
