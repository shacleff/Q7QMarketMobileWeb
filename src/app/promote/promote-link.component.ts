import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";
import {UserInfoService} from "../service/user-info.service";
import { Title } from '@angular/platform-browser';


@Component({
  selector:'promote-link',
  templateUrl:'promote-link.component.html'
})
export class PromoteLinkComponent implements OnInit{
  constructor(
    private title:Title,
    private tips:TipsService,
    private uInfoSer:UserInfoService
  ){}

  promoteCode = '';
  promoteLink = '';
  promoteCodeImg = '';
  //得到用户信息
  getUserInfo(){
    this.uInfoSer.getUserInfo()
    .then((res:any)=>{
      if(res){
        let info = res.userInfo;
        this.promoteCode = info.id;
        this.promoteLink ='http://www.0001wan.com?id='+info.id;
        this.promoteCodeImg = '';
      }
    })
  }


  public headerTitle = '推广链接';
  back(arm:any){
    window.history.go(-1);
  }
  ngOnInit(){
    this.title.setTitle('推广链接');
  }
}
