import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';

import { Router } from '@angular/router';//路由模块
import { FormsModule }    from '@angular/forms';//表单模块
import {HttpClientModule} from '@angular/common/http';//http模块
import { HttpModule }    from '@angular/http';

//weui模块
import {WeUiModule} from 'ngx-weui';//weui
import {ActionSheetModule} from 'ngx-weui/actionsheet'//弹出菜单

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//动画

import {AppRoutingModule} from './app-routing.module';
import {LoginRegistModule} from './loginRegist/login-regist.module'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [//组件申明
    AppComponent
  ],
  imports: [//用到的模块
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    WeUiModule.forRoot(),
    ActionSheetModule.forRoot(),
    LoginRegistModule,
    AppRoutingModule
  ],
  providers: [//服务
    {
      provide:LocationStrategy,
      useClass:HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
