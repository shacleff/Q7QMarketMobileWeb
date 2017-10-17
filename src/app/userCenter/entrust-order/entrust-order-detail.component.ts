import {Component,Input,EventEmitter,Output,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector:'entrust-order-detail',
  templateUrl:'entrust-order-detail.component.html',
  styles: [`
    html{
      overflow:hidden;
    }
  `]
})
export class EntrustOrderDetailComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title
  ){}
  @Input() orderDetail:any;
  @Output() onClose = new EventEmitter<any>();

  close(){//关闭
    this.onClose.emit();
  }

  public headerTitle = '委托订单详情';
  back(){
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('委托订单');
  }
}
