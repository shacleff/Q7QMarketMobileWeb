import {Component,OnInit,Input,EventEmitter,Output} from '@angular/core';
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
  @Input() item:any;
  @Output() onClose = new EventEmitter<any>();
  hide(){//关闭
    this.onClose.emit();
  }
  public topTitle = '指定交易详情';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('指定交易');
  }
}
