import { Component, ViewEncapsulation, OnDestroy,OnInit } from '@angular/core';
import {LoginService} from "./loginRegist/login.service";
// import { Observable } from 'rxjs/Rx';
// import { SkinType } from 'ngx-weui';
// import { ActionSheetService, ActionSheetConfig, ActionSheetComponent } from "ngx-weui/actionsheet";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy,OnInit{

  // @ViewChild('ios') iosAS: ActionSheetComponent;
  // @ViewChild('android') androidAS: ActionSheetComponent;
  // @ViewChild('auto') autoAS: ActionSheetComponent;

  // menus: any[] = [
  //   { text: '菜单一', value: 'test', other: 1 },
  //   { text: '菜单三', value: 'test' }
  // ];
  // config: ActionSheetConfig = <ActionSheetConfig>{
  //   title: '这是一段标题'
  // };

  constructor(
    public updateTokenSer:LoginService
  ) { }

  ngOnInit(){
    this.isFromGame();
    // console.log('初始化app');
    //app初始化检查用户是否登录过 如果登录过定时更新token
    this.updateTokenSer.updateToken();
  }

  //是否来自游戏跳转
  isFromGame(){
    if(sessionStorage.getItem('game')){
      this.updateTokenSer.isComeGame = true;
    }else{
      this.updateTokenSer.isComeGame = false;
    }
  }

  // onShow(type: SkinType) {
  //   this.config.skin = type;
  //   this.config = Object.assign({}, this.config);
  //   setTimeout(() => {
  //     (<ActionSheetComponent>this[`${type}AS`]).show().subscribe((res: any) => {
  //       console.log('type', res);
  //     });
  //   }, 10);
  // }

  // onShowBySrv(type: SkinType, backdrop: boolean = true) {
  //   this.config.skin = type;
  //   this.config.backdrop = backdrop;
  //   this.srv.show(this.menus, this.config).subscribe((res: any) => {
  //     console.log(res);
  //   });
  // }

  ngOnDestroy() {
    //app销毁时停止定时更新token
    this.updateTokenSer.stopUpdateToken();
  }

}
