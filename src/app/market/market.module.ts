import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';

//反馈按钮指令
import {FeedBtnDirective} from '../directive/feed-btn.directive'
import {VerticalCenterDirective} from '../directive/vertical-align.directive'

import {EchartsNg2Module} from 'echarts-ng2';//echarts模块
import {MarketRoutingModule} from './market.routing.module'

import {HeaderComponent} from '../component/header/header.component'


import {QuotationComponent} from './quotation/quotation.component'
import {MarketDetailtComponent} from './market-detail/market-detail.component'
import {GoldRechargeComponent} from './recharge/gold-recharge.component'
import {RechargeSuccessComponent} from './recharge/recharge-success.component'
import {RechargeRecordComponent} from "./recharge/recharge-record.component";
import {RechargeRecordDetailComponent} from "./recharge/recharge-record-detail.component";
import {RechargeService} from "./recharge/recharge.service";

@NgModule({
  declarations:[
    HeaderComponent,
    FeedBtnDirective,
    VerticalCenterDirective,
    QuotationComponent,
    MarketDetailtComponent,
    GoldRechargeComponent,
    RechargeSuccessComponent,
    RechargeRecordComponent,
    RechargeRecordDetailComponent
  ],
  imports:[
    SharedModule,
    MarketRoutingModule,
    EchartsNg2Module
  ],
  providers:[
    RechargeService
  ]
})
export class MarketModule{

}
