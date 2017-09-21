import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';

import {EchartsNg2Module} from 'echarts-ng2';//echarts模块
import {MarketRoutingModule} from './market.routing.module'


import {QuotationComponent} from './quotation/quotation.component'
import {MarketDetailtComponent} from './market-detail/market-detail.component'
import {GoldRechargeComponent} from './recharge/gold-recharge.component'
import {RechargeSuccessComponent} from './recharge/recharge-success.component'
import {RechargeRecordComponent} from "./recharge/recharge-record.component";
import {RechargeRecordDetailComponent} from "./recharge/recharge-record-detail.component";
import {RechargeService} from "./recharge/recharge.service";
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
import {QuotationService} from "./quotation/quotation.service";
import {MarketService} from "./market-detail/market.service";
import {UserCenterService} from "../userCenter/user-center.service";
import {EntrustOrderService} from "../userCenter/entrust-order/entrust-order.service";
import {TradeRecordService} from "../userCenter/trade-record/trade-record.service";
import {AssignTradeService} from "./assign-trade/assign-trade.service";

@NgModule({
  declarations:[
    QuotationComponent,
    MarketDetailtComponent,
    GoldRechargeComponent,
    RechargeSuccessComponent,
    RechargeRecordComponent,
    RechargeRecordDetailComponent,
    PromoteAwardComponent,
    PromoteLinkComponent,
    PromoteListComponent,
    UserCenterComponent,
    AlterMobileFirstComponent,
    AlterMobileSecondComponent,
    AlterLoginPasswordComponent,
    ResetPayPasswordComponent,
    ManageAccountComponent,
    AlterBankcardComponent,
    GoldCashComponent,
    CashRecordComponent,
    CashDetailComponent,
    GoldDetailComponent,
    AssignTradeComponent,
    AssignTradeOrderComponent,
    AssignTradeDetailComponent,
    AssignTradeResolveComponent,
    TradeRecordListComponent,
    TradeRecordDetailComponent,
    EntrustOrderComponent,
    EntrustOrderDetailComponent,
    NameAuthComponent,
  ],
  imports:[
    SharedModule,
    MarketRoutingModule,
    EchartsNg2Module,
  ],
  providers:[
    RechargeService,
    QuotationService,//行情服务
    MarketService,//市场服务
    UserCenterService,//个人中心
    EntrustOrderService,//委托订单
    TradeRecordService,//交易明细
    AssignTradeService,//指定交易
  ]
})
export class MarketModule{

}
