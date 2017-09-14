import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRegistRoutingModule} from './login-regist-routing.module';

import { WeUiModule } from 'ngx-weui';

import {LoginComponent} from './login.componnet';
import {RegistComponent} from './regist.component';


@NgModule({
  declarations:[//声明模块
    LoginComponent,
    RegistComponent
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
