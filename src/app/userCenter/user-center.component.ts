import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";
import {UserCenterService} from "./user-center.service";


@Component({
  selector:'user-center',
  templateUrl:'user-center.component.html'
})
export class UserCenterComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private uctSer:UserCenterService
  ){}

  //玩家信息
  userInfo:any = {};
  getUserInfo(){
    this.uctSer.getUserInfo()
    .then((res:any)=>{
      if(res){
        console.log(res);
        let info = res.userInfo;
        this.userInfo.realName = info.realName;
        this.userInfo.id = info.id;
        this.userInfo.headerUrl = info.headerUrl;
        this.userInfo.blockedBalance = info.blockedBalance;//冻结金
        this.userInfo.usableBalance = info.usableBalance;//可用金
        this.userInfo.totalBalance = info.blockedBalance+info.usableBalance;//总额
      }
    })
  }
  //打开关闭推广中心下拉
  isClose = true;
  openProDrop(){
    this.isClose = !this.isClose;
  }
  ngOnInit(){
    this.getUserInfo();
  }
}
