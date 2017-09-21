import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";


@Component({
  selector:'promote-list',
  templateUrl:'promote-list.component.html'
})
export class PromoteListComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '推广列表';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
