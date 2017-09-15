import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, JsonpModule } from '@angular/http';
import { WeUiModule } from 'ngx-weui';//weui框架模块

//指令
//import {VerticalCenterDirective} from '../directive/vertical-align.directive'
//import {FeedButtonDirective} from '../directive/feed-button.directive'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, JsonpModule,
    WeUiModule.forRoot(),
  ],
  providers: [
    // { provide: ButtonConfig, useFactory: ()=> { return Object.assign(new ButtonConfig(), { type: 'warn' }); } }
  ],
  declarations: [
    //VerticalCenterDirective,
    //FeedButtonDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, JsonpModule,
    RouterModule,
    WeUiModule,
  ],
  entryComponents: [
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
