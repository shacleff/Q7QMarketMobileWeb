import {NgModule} from '@angular/core';

import {RouterModule,Routes} from '@angular/router';

import {QuotationComponent} from './quotation/quotation.component'
import {MarketDetailtComponent} from './market-detail/market-detail.component'
import {GoldRechargeComponent} from './recharge/gold-recharge.component'
import {RechargeSuccessComponent} from './recharge/recharge-success.component'
import {RechargeRecordComponent} from "./recharge/recharge-record.component";
import {RechargeRecordDetailComponent} from "./recharge/recharge-record-detail.component";

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
  },
  {
    path:'rechargeSuccess',
    component:RechargeSuccessComponent
  },
  {
    path:'rechargeRecord',
    component:RechargeRecordComponent
  },
  {
    path:'rechargeRecord/:id',
    component:RechargeRecordDetailComponent
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
