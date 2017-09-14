import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

const appRoutes:Routes = [
  {
    path:'auth',
    loadChildren: './loginRegist/login-regist.module#LoginRegistModule',
  },
  {
    path:'', //空
    redirectTo: '/login',
    pathMatch: 'full'
  },
];
@NgModule({
  imports:[
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports:[
    RouterModule
  ],
  providers:[]
})
export class AppRoutingModule{

}
