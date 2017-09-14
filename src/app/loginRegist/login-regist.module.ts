import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from '../component/header/header.component'

//反馈按钮指令
import {FeedButtonDirective} from '../directive/feed-button.directive'

import {LoginRegistRoutingModule} from './login-regist-routing.module';

import { WeUiModule } from 'ngx-weui';

import {LoginComponent} from './login.componnet';
import {RegistComponent} from './regist.component';

@NgModule({
  declarations:[//声明模块
    HeaderComponent,
    LoginComponent,
    RegistComponent,
    FeedButtonDirective,
  ],
  imports:[
    CommonModule,
    WeUiModule.forRoot(),
    LoginRegistRoutingModule
  ],
  providers:[

  ]
})

export class LoginRegistModule{
  constructor(

  ){}
}
