import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module'

import {HeaderComponent} from '../component/header/header.component'

//反馈按钮指令
import {FeedButtonDirective} from '../directive/feed-button.directive'

import {LoginRegistRoutingModule} from './login-regist-routing.module';

import { WeUiModule } from 'ngx-weui';

//管道
import {OnlyInputNumber} from '../pipe/only-input-number.pipe';//只能输入数字

import {LoginComponent} from './login.componnet';
import {RegistComponent} from './regist.component';

import {LoginService} from './login.service'

@NgModule({
  declarations:[//声明模块
    HeaderComponent,
    OnlyInputNumber,
    LoginComponent,
    RegistComponent,
    FeedButtonDirective,
  ],
  imports:[
    CommonModule,
    SharedModule,
    WeUiModule.forRoot(),
    LoginRegistRoutingModule
  ],
  providers:[
    LoginService
  ]
})

export class LoginRegistModule{
  constructor(

  ){}
}
