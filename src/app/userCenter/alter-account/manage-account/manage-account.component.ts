import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";


@Component({
  selector:'manage-account',
  templateUrl:'manage-account.component.html'
})
export class ManageAccountComponent implements OnInit{
  constructor(
    private tips:TipsService
  ){}
  public headerTitle = '账户管理';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){

  }
}
