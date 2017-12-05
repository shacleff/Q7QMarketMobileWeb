import {Component,OnInit,Input,Output,EventEmitter} from '@angular/core';
import {TipsService} from "../service/tips.service";

@Component({
  selector:'cash-detail',
  templateUrl:'cash-detail.component.html'
})
export class CashDetailComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public topTitle = '提现记录详情';
  @Input() item;
  @Output() onHide = new EventEmitter<any>();
  hide(){
    this.onHide.emit();
  }
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
