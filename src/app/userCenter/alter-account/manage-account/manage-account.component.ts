import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../../service/tips.service";
import {Title} from '@angular/platform-browser';
import {AlterAccountService} from "../alter-account.service";
import {UserInfoService} from "../../../service/user-info.service";

@Component({
  selector:'manage-account',
  templateUrl:'manage-account.component.html'
})
export class ManageAccountComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title,
    private altActSer:AlterAccountService,
    private uInfoSer:UserInfoService
  ){}
  public uInfo:any = {
    realName:'',
    cardNo:'',
    bankName:''
  };
  //得到账户信息
  getUserInof(){
    this.uInfoSer.getUserInfo()
    .then((res:any)=>{
      if(res){
        let info = res.userInfo;
        this.uInfo.realName = info.realName;
        this.uInfo.cardNo = info.cardNo;
        this.uInfo.bankName = info.bankName;
      }
    })
  }

  public headerTitle = '账户管理';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.getUserInof();
    this.title.setTitle('管理账户');
  }
}
