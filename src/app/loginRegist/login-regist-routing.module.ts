import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {LoginComponent} from './login.componnet'
import {RegistComponent} from './regist.component'
import {ForgetPasswordComponent} from "./forget-password.component";


const loginRegistRoutes:Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'regist',
    component:RegistComponent
  },
  {
    path:'forgetPassword',
    component:ForgetPasswordComponent
  }
];

@NgModule({
  imports:[
    RouterModule.forChild(loginRegistRoutes)
  ],
  exports:[
    RouterModule
  ],
  providers:[

  ]
})

export class LoginRegistRoutingModule{

}
