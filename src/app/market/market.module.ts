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

@NgModule({
  declarations:[
    HeaderComponent,
    FeedBtnDirective,
    VerticalCenterDirective,
    QuotationComponent,
    MarketDetailtComponent,
    GoldRechargeComponent
  ],
  imports:[
    SharedModule,
    MarketRoutingModule,
    EchartsNg2Module
  ],
  providers:[

  ]
})
export class MarketModule{

}
