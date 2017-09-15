import {NgModule} from '@angular/core';

import {RouterModule,Routes} from '@angular/router';

import {QuotationComponent} from './quotation/quotation.component'
import {MarketDetailtComponent} from './market-detail/market-detail.component'
import {GoldRechargeComponent} from './recharge/gold-recharge.component'


//import {AuthGuard} from '../service/auth-guard.service'

const marketRoutes:Routes=[
  {
    path:'',
    component:QuotationComponent,
    //canActive:[AuthGuard]
    //children:[
    //  {
    //    path:'marketDetail',
    //    component:MarketDetailtComponent
    //  }
    //]
  },
  {
    path:'marketDetail',
    component:MarketDetailtComponent
  },
  {
    path:'goldRecharge',
    component:GoldRechargeComponent
  }
];

@NgModule({
  imports:[
    RouterModule.forChild(marketRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class MarketRoutingModule{

}
