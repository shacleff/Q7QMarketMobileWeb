import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector:'name-auth',
  templateUrl:'name-auth.component.html'
})
export class NameAuthComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title
  ){}
  public headerTitle = '完善实名认证';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('完善实名认证');
  }
}
