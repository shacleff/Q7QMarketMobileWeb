import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector:'gold-detail',
  templateUrl:'gold-detail.component.html'
})
export class GoldDetailComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title
  ){}
  public headerTitle = '金币明细';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('金币明细')
  }
}
