import { NgModule } from '@angular/core';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {HashLocationStrategy,LocationStrategy} from '@angular/common';//解决404错误

import { Router } from '@angular/router';//路由模块
import {HttpClientModule} from '@angular/common/http';//http模块
import {HttpService} from './service/http.service';//http服务
//weui模块
import {ActionSheetModule} from 'ngx-weui/actionsheet'//弹出菜单

import {AppRoutingModule} from './app-routing.module';
import {LoginRegistModule} from './loginRegist/login-regist.module'//登录注册模块

import {MarketModule} from './market/market.module';//市场模块

import { AppComponent } from './app.component';

import {AuthService} from './service/auth.service'

import {TipsService} from "./service/tips.service";
import {UtilService} from "./service/util.service";
import {UserInfoService} from "./service/user-info.service";
import {AuthGuard} from "./service/auth-guard.service";

//import {FeedButtonDirective} from './directive/feed-button.directive'

@NgModule({
  declarations: [//组件申明
    //FeedButtonDirective,
    AppComponent,
  ],
  imports: [//用到的模块
    CoreModule,
    SharedModule,
    HttpClientModule,
    LoginRegistModule,
    AppRoutingModule,
    MarketModule
  ],
  providers: [//服务
    {
      provide:LocationStrategy,
      useClass:HashLocationStrategy
    },
    HttpService,
    AuthGuard,
    AuthService,
    TipsService,
    UtilService,
    UserInfoService,//用户信息
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
