import {NgModule} from '@angular/core';

import {RouterModule,Routes} from '@angular/router';
import {AuthGuard} from "../service/auth-guard.service";
import {QuotationComponent} from './quotation/quotation.component'
import {MarketDetailtComponent} from './market-detail/market-detail.component'
import {GoldRechargeComponent} from './recharge/gold-recharge.component'
import {RechargeSuccessComponent} from './recharge/recharge-success.component'
import {RechargeRecordComponent} from "./recharge/recharge-record.component";
import {RechargeRecordDetailComponent} from "./recharge/recharge-record-detail.component";
import {PromoteAwardComponent} from "../promote/promote-award.component";
import {PromoteLinkComponent} from "../promote/promote-link.component";
import {PromoteListComponent} from "../promote/promote-list.component";
import {UserCenterComponent} from "../userCenter/user-center.component";
import {AlterMobileFirstComponent} from "../userCenter/alter-account/alter-mobile/alter-mobile-first.component";
import {AlterMobileSecondComponent} from "../userCenter/alter-account/alter-mobile/alter-mobile-second.component";
import {AlterLoginPasswordComponent} from "../userCenter/alter-account/alter-login-password/alter-login-password.component";
import {ResetPayPasswordComponent} from "../userCenter/alter-account/reset-pay-password/reset-pay-password.component";
import {ManageAccountComponent} from "../userCenter/alter-account/manage-account/manage-account.component";
import {AlterBankcardComponent} from "../userCenter/alter-account/manage-account/alter-bankcard.component";
import {GoldCashComponent} from "../cash/gold-cash.component";
import {CashRecordComponent} from "../cash/cash-record.component";
import {CashDetailComponent} from "../cash/cash-detail.component";
import {GoldDetailComponent} from "../userCenter/gold-detail/gold-detail.component";
import {AssignTradeComponent} from "./assign-trade/assign-trade.component";
import {AssignTradeOrderComponent} from "./assign-trade/assign-trade-order.component";
import {AssignTradeDetailComponent} from "./assign-trade/assign-trade-detail.component";
import {AssignTradeResolveComponent} from "./assign-trade/assign-trade-resolve.component";
import {TradeRecordListComponent} from "../userCenter/trade-record/trade-record-list.component";
import {TradeRecordDetailComponent} from "../userCenter/trade-record/trade-record-detail.component";
import {EntrustOrderComponent} from "../userCenter/entrust-order/entrust-order.component";
import {EntrustOrderDetailComponent} from "../userCenter/entrust-order/entrust-order-detail.component";
import {NameAuthComponent} from "../userCenter/name-auth/name-auth.component";

const marketRoutes:Routes=[
  {
    path:'',
    component:QuotationComponent,
    canActivate:[AuthGuard],
  },
  {
    path:'market/:id',
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
  },
  {
    path:'promoteAward',
    component:PromoteAwardComponent
  },
  {
    path:'promoteLink',
    component:PromoteLinkComponent
  },
  {
    path:'promoteList',
    component:PromoteListComponent
  },
  {
    path:'userCenter',
    component:UserCenterComponent,
    canActivate:[AuthGuard],
  },
  {
    path:'alterMobileFirst',
    component:AlterMobileFirstComponent
  },
  {
    path:'alterMobileSecond/:uuid',
    component:AlterMobileSecondComponent
  },
  {
    path:'alterLoginPassword',
    component:AlterLoginPasswordComponent
  },
  {
    path:'resetPayPassword',
    component:ResetPayPasswordComponent
  },
  {
    path:'manageAccount',
    component:ManageAccountComponent
  },
  {
    path:'alterBankcard',
    component:AlterBankcardComponent
  },
  {
    path:'goldCash',
    component:GoldCashComponent
  },
  {
    path:'cashRecord',
    component:CashRecordComponent
  },
  {
    path:'cashRecord/:id',
    component:CashDetailComponent
  },
  {
    path:'goldDetail',
    component:GoldDetailComponent
  },
  {
    path:'assignTrade',
    component:AssignTradeComponent
  },
  {
    path:'assignTradeOrder',
    component:AssignTradeOrderComponent
  },
  {
    path:'assignTradeOrder/:id',
    component:AssignTradeDetailComponent
  },
  {
    path:'assignTradeResolve/:id',
    component:AssignTradeResolveComponent
  },
  {
    path:'tradeRecord',
    component:TradeRecordListComponent
  },
  {
    path:'tradeRecord/:id',
    component:TradeRecordDetailComponent
  },
  {
    path:'entrustOrder',
    component:EntrustOrderComponent
  },
  {
    path:'nameAuth',
    component:NameAuthComponent
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
