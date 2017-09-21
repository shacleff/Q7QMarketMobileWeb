import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module'

import {LoginRegistRoutingModule} from './login-regist-routing.module';

import { WeUiModule } from 'ngx-weui';

//管道
//import {OnlyInputNumber} from '../pipe/only-input-number.pipe';//只能输入数字

import {LoginComponent} from './login.componnet';
import {RegistComponent} from './regist.component';

import {LoginService} from './login.service'
import {RegistService} from "./regist.service";

@NgModule({
  declarations:[//声明模块
    //OnlyInputNumber,
    LoginComponent,
    RegistComponent,
  ],
  imports:[
    CommonModule,
    SharedModule,
    WeUiModule.forRoot(),
    LoginRegistRoutingModule
  ],
  providers:[
    LoginService,
    RegistService
  ]
})

export class LoginRegistModule{
  constructor(

  ){}
}
