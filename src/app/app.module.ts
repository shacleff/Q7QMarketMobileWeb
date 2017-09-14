import { NgModule } from '@angular/core';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {HashLocationStrategy,LocationStrategy} from '@angular/common';//解决404错误

import { Router } from '@angular/router';//路由模块
import {HttpClientModule} from '@angular/common/http';//http模块
//weui模块
import {ActionSheetModule} from 'ngx-weui/actionsheet'//弹出菜单

import {AppRoutingModule} from './app-routing.module';
import {LoginRegistModule} from './loginRegist/login-regist.module'


import { AppComponent } from './app.component';

import {AuthService} from './service/auth.service'

import {TipsService} from "./service/tips.service";
import {UtilService} from "./service/util.service";

@NgModule({
  declarations: [//组件申明
    AppComponent,
  ],
  imports: [//用到的模块
    CoreModule,
    SharedModule,
    HttpClientModule,
    LoginRegistModule,
    AppRoutingModule
  ],
  providers: [//服务
    {
      provide:LocationStrategy,
      useClass:HashLocationStrategy
    },
    AuthService,
    TipsService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
