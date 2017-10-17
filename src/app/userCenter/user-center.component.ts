import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";
import {UserCenterService} from "./user-center.service";
import {Router} from '@angular/router';
import {UtilService} from "../service/util.service";


@Component({
  selector:'user-center',
  templateUrl:'user-center.component.html'
})
export class UserCenterComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private uctSer:UserCenterService,
    private router:Router,
    private util:UtilService
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
        this.userInfo.blockedBalance = (info.blockedBalance).toFixed(5);//冻结金
        this.userInfo.usableBalance = (info.usableBalance).toFixed(5);//可用金
        this.userInfo.totalBalance = (info.blockedBalance+info.usableBalance).toFixed(5);//总额
      }
    })
  }
  //退出登录
  exit(){
    this.tips.showConDia('确定退出登录吗？',()=>{
      this.router.navigate(['login']);
      localStorage.setItem('token','');
    },()=>{})
  }
  //打开关闭推广中心下拉
  isClose = true;
  openProDrop(){
    this.isClose = !this.isClose;
  }
  //底部切换去市场
  toMarket(){
    this.router.navigate(['market',this.util.marketUrl]);
  }
  ngOnInit(){
    this.getUserInfo();
  }
}
