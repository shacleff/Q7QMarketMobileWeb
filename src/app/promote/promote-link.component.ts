import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";


@Component({
  selector:'promote-link',
  templateUrl:'promote-link.component.html'
})
export class PromoteLinkComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '推广链接';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
