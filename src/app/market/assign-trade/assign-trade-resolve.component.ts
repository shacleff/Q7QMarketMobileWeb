import {Component,OnInit,Input,EventEmitter,Output} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector:'assign-trade-resolve',
  templateUrl:'assign-trade-resolve.component.html'
})
export class AssignTradeResolveComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title
  ){}
  public topTitle = '指定交易订单处理';
  @Input() item:any;
  @Output() onClose = new EventEmitter<any>();
  hide(){//关闭
    this.onClose.emit();
  }
  confirmOrder(id:string){
    console.log(id)
  }
  cancelOrder(id:string){
    console.log(id)
  }
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('指定交易');
  }
}
